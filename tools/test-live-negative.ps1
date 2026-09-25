param(
    [switch]$Execute,
    [string]$Network = 'betanet',
    [string]$FeePayer = 'default',
    [string]$ProgramAddress = 'taqUdv93329-ZLvalbNYKhby6cDAa0v3dbT0IHbihXV3rw',
    [string]$ActorAddress = 'tarP_lYAaD0KWNG3cMEyMjYjxZFYuEQc4ZNUMUxIkjdoKp',
    [string]$TransferredChildAddress = 'ta6k1d-C7y2Vp9w1rp1E07EJ458wQI5QJRCap7vD3slja7',
    [string]$AbiAccountAddress = 'tafHBf1TH_KYXKy4AsKa-FJVob07FTyOigKH__mH_C8W47'
)

$ErrorActionPreference = 'Stop'

if (-not $Execute) {
    throw 'Pass -Execute to submit the intentional reverting transactions (network fees apply).'
}

$projectDir = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
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

function Get-HexFile {
    param([Parameter(Mandatory = $true)][string]$Path)

    $bytes = [IO.File]::ReadAllBytes((Resolve-Path $Path).Path)
    return (($bytes | ForEach-Object { $_.ToString('x2') }) -join '')
}

function Invoke-ThruRead {
    param([Parameter(Mandatory = $true)][string[]]$Arguments)

    $raw = (& $thru @Arguments | Out-String)
    if ($LASTEXITCODE -ne 0) {
        throw "thru read failed with exit code $LASTEXITCODE`: $($Arguments -join ' ')"
    }
    return ($raw | ConvertFrom-Json)
}

function Invoke-ExpectedRevert {
    param(
        [Parameter(Mandatory = $true)][string]$Name,
        [Parameter(Mandatory = $true)][string]$InstructionHex,
        [Parameter(Mandatory = $true)][string]$ExpectedCode,
        [string[]]$ReadWriteAccounts = @(),
        [string[]]$ReadOnlyAccounts = @()
    )

    $arguments = @(
        '--network', $Network,
        '--json', '--quiet',
        'txn', 'execute',
        $ProgramAddress,
        $InstructionHex,
        '--fee-payer', $FeePayer,
        '--compute-units', '300000000',
        '--state-units', '10000',
        '--memory-units', '10000',
        '--fee', '1'
    )
    foreach ($account in $ReadWriteAccounts) {
        $arguments += @('--readwrite-accounts', $account)
    }
    foreach ($account in $ReadOnlyAccounts) {
        $arguments += @('--readonly-accounts', $account)
    }

    $raw = (& $thru @arguments 2>&1 | Out-String)
    $exitCode = $LASTEXITCODE
    if ($exitCode -eq 0) {
        throw "$Name unexpectedly succeeded"
    }
    if ($raw -notmatch [regex]::Escape($ExpectedCode)) {
        throw "$Name returned an unexpected error. Expected $ExpectedCode. Output: $raw"
    }

    $signatureMatch = [regex]::Match($raw, '"signature"\s*:\s*"([^"]+)"')
    [PSCustomObject]@{
        name = $Name
        expected_error = $ExpectedCode
        signature = if ($signatureMatch.Success) { $signatureMatch.Groups[1].Value } else { $null }
        passed = $true
    }
}

Set-Location $projectDir

$derivedSeed = 'cambrian-negative-birth'
$encodedWrongSeed = 'cambrian-wrong-seed'
$derived = Invoke-ThruRead @(
    '--network', $Network, '--json', '--quiet',
    'program', 'derive-address', $ProgramAddress, $derivedSeed
)
$birthTarget = $derived.derive_address.derived_address
$proof = Invoke-ThruRead @(
    '--network', $Network, '--json', '--quiet',
    'txn', 'make-state-proof', 'creating', $birthTarget
)
$birthEncodingRaw = (& $node --experimental-transform-types --no-warnings `
    (Join-Path $projectDir 'tools\build-birth.mjs') `
    $proof.makeStateProof.proof_data_hex `
    $encodedWrongSeed `
    160 | Out-String)
if ($LASTEXITCODE -ne 0) {
    throw 'failed to encode the negative birth instruction'
}
$birthInstruction = ($birthEncodingRaw | ConvertFrom-Json).instruction_hex

$pulse = Get-HexFile '.\fixtures\instruction-pulse.bin'
$pulseBadIndex = Get-HexFile '.\fixtures\runtime-pulse-bad-index.bin'
$encounterSame = Get-HexFile '.\fixtures\runtime-encounter-same-account.bin'
$reproduceSame = Get-HexFile '.\fixtures\runtime-reproduce-same-parent.bin'
$transferProgram = Get-HexFile '.\fixtures\runtime-transfer-program-controller.bin'

$results = @()
$results += Invoke-ExpectedRevert `
    -Name 'birth rejects seed/address mismatch' `
    -InstructionHex $birthInstruction `
    -ExpectedCode '0xCA01000E' `
    -ReadWriteAccounts @($birthTarget)
$results += Invoke-ExpectedRevert `
    -Name 'pulse rejects former controller' `
    -InstructionHex $pulse `
    -ExpectedCode '0xCA01000C' `
    -ReadWriteAccounts @($TransferredChildAddress)
$results += Invoke-ExpectedRevert `
    -Name 'encounter rejects identical organisms' `
    -InstructionHex $encounterSame `
    -ExpectedCode '0xCA010012' `
    -ReadWriteAccounts @($ActorAddress)
$results += Invoke-ExpectedRevert `
    -Name 'reproduce rejects identical parents' `
    -InstructionHex $reproduceSame `
    -ExpectedCode '0xCA010012' `
    -ReadWriteAccounts @($ActorAddress)
$results += Invoke-ExpectedRevert `
    -Name 'transfer rejects program as controller' `
    -InstructionHex $transferProgram `
    -ExpectedCode '0xCA010003' `
    -ReadWriteAccounts @($ActorAddress)
$results += Invoke-ExpectedRevert `
    -Name 'pulse rejects invalid account index' `
    -InstructionHex $pulseBadIndex `
    -ExpectedCode '0xCA010003' `
    -ReadWriteAccounts @($ActorAddress)
$results += Invoke-ExpectedRevert `
    -Name 'pulse rejects read-only organism' `
    -InstructionHex $pulse `
    -ExpectedCode '0xCA010006' `
    -ReadOnlyAccounts @($ActorAddress)
$results += Invoke-ExpectedRevert `
    -Name 'pulse rejects invalid account layout' `
    -InstructionHex $pulse `
    -ExpectedCode '0xCA01000A' `
    -ReadWriteAccounts @($AbiAccountAddress)

[PSCustomObject]@{
    network = $Network
    program = $ProgramAddress
    cases = $results.Count
    passed = @($results | Where-Object { $_.passed }).Count
    results = $results
} | ConvertTo-Json -Depth 10
