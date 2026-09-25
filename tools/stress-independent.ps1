param(
    [ValidateRange(1, 16)]
    [int]$Count = 4,

    [ValidatePattern('^[A-Za-z0-9-]{1,16}$')]
    [string]$RunId = (Get-Date).ToUniversalTime().ToString('MMddHHmmss'),

    [switch]$Execute,
    [string]$Network = 'betanet',
    [string]$FeePayers = 'default',
    [string]$ProgramAddress = 'taqUdv93329-ZLvalbNYKhby6cDAa0v3dbT0IHbihXV3rw'
)

$ErrorActionPreference = 'Stop'

$projectDir = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$abiFile = Join-Path $projectDir 'cambrian.abi.yaml'
$birthBuilder = Join-Path $PSScriptRoot 'build-birth.mjs'
$pulseFixture = Join-Path $projectDir 'fixtures\instruction-pulse.bin'
$decoder = Join-Path $PSScriptRoot 'decode-live-event.ps1'
$thruCommand = Get-Command thru.cmd -ErrorAction SilentlyContinue
if ($null -eq $thruCommand) {
    $thruCommand = Get-Command thru -ErrorAction Stop
}
$nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
if ($null -eq $nodeCommand) {
    $nodeCommand = Get-Command node -ErrorAction Stop
}
$thru = $thruCommand.Source
$node = $nodeCommand.Source
$payerNames = @($FeePayers.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })
if ($payerNames.Count -eq 0) {
    throw 'At least one fee payer is required'
}

function Invoke-ThruJson {
    param([Parameter(Mandatory = $true)][string[]]$Arguments)

    $raw = (& $thru @Arguments 2>&1 | Out-String)
    if ($LASTEXITCODE -ne 0) {
        throw "thru command failed with exit code $LASTEXITCODE`: $raw"
    }
    return ($raw | ConvertFrom-Json)
}

function Get-HexFile {
    param([Parameter(Mandatory = $true)][string]$Path)

    $bytes = [IO.File]::ReadAllBytes((Resolve-Path $Path).Path)
    return (($bytes | ForEach-Object { $_.ToString('x2') }) -join '')
}

function Get-OrganismPulseSnapshot {
    param([Parameter(Mandatory = $true)][string]$Address)

    $envelope = Invoke-ThruJson @(
        '--network', $Network, '--json', '--quiet',
        'getaccountinfo', $Address
    )
    $account = $envelope.account_info
    $tempPath = Join-Path ([IO.Path]::GetTempPath()) ("cambrian-stress-$([Guid]::NewGuid().ToString('N')).bin")
    try {
        [IO.File]::WriteAllBytes($tempPath, [Convert]::FromBase64String($account.data))
        $raw = (& $thru --json --quiet abi reflect `
            --abi-file $abiFile `
            --type-name CambrianOrganism `
            --data-file $tempPath `
            --values-only | Out-String)
        if ($LASTEXITCODE -ne 0) {
            throw "failed to reflect stress organism $Address"
        }
        $state = $raw | ConvertFrom-Json
        return [PSCustomObject]@{
            address = $Address
            sequence = $account.seq
            slot = $account.slot
            status = $state.status.value
            energy = $state.energy.value
            vitality = $state.vitality.value
            pulse_count = $state.pulse_count.value
        }
    }
    finally {
        if (Test-Path -LiteralPath $tempPath) {
            Remove-Item -LiteralPath $tempPath -Force
        }
    }
}

Set-Location $projectDir

$plan = @()
for ($index = 0; $index -lt $Count; $index++) {
    $seed = "cb-$RunId-$($index.ToString('00'))"
    if ([Text.Encoding]::UTF8.GetByteCount($seed) -gt 32) {
        throw "generated seed exceeds 32 bytes: $seed"
    }
    $derived = Invoke-ThruJson @(
        '--network', $Network, '--json', '--quiet',
        'program', 'derive-address', $ProgramAddress, $seed
    )
    $plan += [PSCustomObject]@{
        index = $index
        seed = $seed
        address = $derived.derive_address.derived_address
        fee_payer = if ($index -lt $payerNames.Count) { $payerNames[$index] } else { $null }
    }
}

if (-not $Execute) {
    [PSCustomObject]@{
        mode = 'plan-only'
        warning = 'Pass -Execute to create the accounts and submit parallel pulses; network fees apply.'
        network = $Network
        run_id = $RunId
        count = $Count
        fee_payers = $payerNames
        organisms = $plan
    } | ConvertTo-Json -Depth 10
    exit 0
}

if ($payerNames.Count -lt $Count) {
    throw "Parallel execution needs one distinct fee payer/controller per organism; received $($payerNames.Count) for $Count organisms."
}
if (@($payerNames | Select-Object -Unique).Count -ne $payerNames.Count) {
    throw 'Parallel execution requires distinct fee payer names to avoid nonce contention.'
}
foreach ($payer in $payerNames[0..($Count - 1)]) {
    $balanceEnvelope = Invoke-ThruJson @(
        '--network', $Network, '--json', '--quiet',
        'getbalance', $payer
    )
    if ([long]$balanceEnvelope.balance.balance -lt 2) {
        throw "fee payer $payer needs at least 2 native THRU for birth plus pulse"
    }
}

$birthResults = @()
foreach ($organism in $plan) {
    $proof = Invoke-ThruJson @(
        '--network', $Network, '--json', '--quiet',
        'txn', 'make-state-proof', 'creating', $organism.address
    )
    $entropyBase = 128 + $organism.index
    $encodingRaw = (& $node --experimental-transform-types --no-warnings `
        $birthBuilder `
        $proof.makeStateProof.proof_data_hex `
        $organism.seed `
        $entropyBase | Out-String)
    if ($LASTEXITCODE -ne 0) {
        throw "failed to encode birth for $($organism.seed)"
    }
    $instructionHex = ($encodingRaw | ConvertFrom-Json).instruction_hex
    $birth = Invoke-ThruJson @(
        '--network', $Network, '--json', '--quiet',
        'txn', 'execute', $ProgramAddress, $instructionHex,
        '--fee-payer', $organism.fee_payer,
        '--readwrite-accounts', $organism.address,
        '--compute-units', '300000000',
        '--state-units', '10000',
        '--memory-units', '10000',
        '--fee', '1'
    )
    $birthResult = $birth.transaction_execute
    if ($birthResult.status -ne 'success') {
        throw "birth did not succeed for $($organism.seed)"
    }
    $birthResults += [PSCustomObject]@{
        index = $organism.index
        seed = $organism.seed
        address = $organism.address
        fee_payer = $organism.fee_payer
        signature = $birthResult.signature
        slot = $birthResult.slot
        compute_units = $birthResult.compute_units_consumed
    }
}

$maximumBirthSlot = [long](($birthResults | Measure-Object -Property slot -Maximum).Maximum)
$height = $maximumBirthSlot
for ($attempt = 0; $attempt -lt 40 -and $height -le $maximumBirthSlot; $attempt++) {
    $heightEnvelope = Invoke-ThruJson @(
        '--network', $Network, '--json', '--quiet', 'getheight'
    )
    $height = [long]$heightEnvelope.getheight.locally_executed
    if ($height -le $maximumBirthSlot) {
        Start-Sleep -Milliseconds 250
    }
}
if ($height -le $maximumBirthSlot) {
    throw 'Betanet did not advance beyond the final birth slot in time'
}

$pulseHex = Get-HexFile $pulseFixture
$jobs = @()
$stopwatch = [Diagnostics.Stopwatch]::StartNew()
foreach ($organism in $plan) {
    $jobs += Start-Job -ScriptBlock {
        param($Thru, $NetworkName, $Program, $Instruction, $Payer, $Address, $Index)

        $arguments = @(
            '--network', $NetworkName, '--json', '--quiet',
            'txn', 'execute', $Program, $Instruction,
            '--fee-payer', $Payer,
            '--readwrite-accounts', $Address,
            '--compute-units', '300000000',
            '--state-units', '10000',
            '--memory-units', '10000',
            '--fee', '1'
        )
        $raw = (& $Thru @arguments 2>&1 | Out-String)
        [PSCustomObject]@{
            index = $Index
            address = $Address
            exit_code = $LASTEXITCODE
            output = $raw
        } | ConvertTo-Json -Compress
    } -ArgumentList @(
        $thru, $Network, $ProgramAddress, $pulseHex,
        $organism.fee_payer, $organism.address, $organism.index
    )
}

try {
    $jobOutput = @($jobs | Wait-Job | Receive-Job)
}
finally {
    $jobs | Remove-Job -Force
    $stopwatch.Stop()
}

$pulseResults = @()
foreach ($line in $jobOutput) {
    $jobResult = $line | ConvertFrom-Json
    if ([int]$jobResult.exit_code -ne 0) {
        throw "parallel pulse failed for $($jobResult.address): $($jobResult.output)"
    }
    $envelope = $jobResult.output | ConvertFrom-Json
    $pulse = $envelope.transaction_execute
    if ($pulse.status -ne 'success') {
        throw "parallel pulse did not return success for $($jobResult.address)"
    }
    $decodedRaw = (& $decoder -Signature $pulse.signature -Network $Network | Out-String)
    $decoded = $decodedRaw | ConvertFrom-Json
    if ($decoded.variant -ne 'pulse') {
        throw "stress transaction did not emit a pulse event for $($jobResult.address)"
    }
    $pulseResults += [PSCustomObject]@{
        index = $jobResult.index
        address = $jobResult.address
        signature = $pulse.signature
        slot = $pulse.slot
        compute_units = $pulse.compute_units_consumed
        event_size = $decoded.receipt_size
    }
}

$snapshots = @($plan | ForEach-Object {
    Get-OrganismPulseSnapshot -Address $_.address
})
foreach ($snapshot in $snapshots) {
    if ([long]$snapshot.pulse_count -ne 1) {
        throw "stress organism $($snapshot.address) did not persist pulse_count=1"
    }
}

[PSCustomObject]@{
    result = 'parallel independent-organism stress run passed'
    network = $Network
    run_id = $RunId
    count = $Count
    fee_payers = $payerNames[0..($Count - 1)]
    pulse_wall_time_ms = $stopwatch.ElapsedMilliseconds
    total_pulse_compute_units = [long](($pulseResults | Measure-Object -Property compute_units -Sum).Sum)
    births = $birthResults
    pulses = $pulseResults
    states = $snapshots
} | ConvertTo-Json -Depth 20
