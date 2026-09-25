param(
    [string]$Network = 'betanet',
    [string]$RpcUrl = 'https://rpc.betanet.thru.org',
    [string]$ProgramAddress = 'taqUdv93329-ZLvalbNYKhby6cDAa0v3dbT0IHbihXV3rw',
    [string]$AbiAddress = 'tafHBf1TH_KYXKy4AsKa-FJVob07FTyOigKH__mH_C8W47'
)

$ErrorActionPreference = 'Stop'

$projectDir = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$abiFile = Join-Path $projectDir 'cambrian.abi.yaml'
$decoder = Join-Path $PSScriptRoot 'decode-live-event.ps1'
$thruCommand = Get-Command thru.cmd -ErrorAction SilentlyContinue
if ($null -eq $thruCommand) {
    $thruCommand = Get-Command thru -ErrorAction Stop
}
$thru = $thruCommand.Source

$organisms = [ordered]@{
    genesis = 'tagREJBIT3EjPhKEBTd2WUChA-Q_HaeVLRVX9Qs2o0yyvY'
    actor = 'tarP_lYAaD0KWNG3cMEyMjYjxZFYuEQc4ZNUMUxIkjdoKp'
    child = 'ta6k1d-C7y2Vp9w1rp1E07EJ458wQI5QJRCap7vD3slja7'
}
$transactions = [ordered]@{
    birth = 'tsWpbm4YEt4MUZeOV8kPqX5OWwS7cn_gqkZF8fLKf4797mOaCMaU-IHzevEpUgnQ4EJDToc0tcdqausm50l3bRByCI'
    pulse = 'ts-ow3K02YNBs9gvJL8uMUzSnfQ0rcnva8Xh-HQUjg5c6fPwT3d_8WxxqXp1-MTibE4A8AwkYnBBjJtpFr5ZsqBx68'
    encounter = 'ts3DChUKvxWs67zaCWVT1S3EHN0YvOuk8FLUWx_j7fHL7dNnLNeKCwF3cIzJfTof9Bdl6Y8H6xu5fLAiVIg_OFBiJ8'
    reproduce = 'tsaTX8lypB6MxkKS854UD1YFRC12v2ouKNzDxc3XO0_Xjw0peHsajB31C5a7GmjAo-UL5cgTQWGnN8HjILXB0wAh8z'
    transfer_control = 'tsY3ybuZjmGQMwq0YM3BzHyVK0SvOS9201-fSJStwtnyc9CBEMbwwvVSRWRNKT-FdAGrVFd30ihCQALMhGGJrIBRsd'
}

function Invoke-ThruJson {
    param([Parameter(Mandatory = $true)][string[]]$Arguments)

    $raw = (& $thru @Arguments | Out-String)
    if ($LASTEXITCODE -ne 0) {
        throw "thru command failed with exit code $LASTEXITCODE`: $($Arguments -join ' ')"
    }
    return ($raw | ConvertFrom-Json)
}

function Get-ScalarValue {
    param($Field)

    if ($null -eq $Field) { return $null }
    if ($null -ne $Field.value) { return $Field.value }
    return $Field
}

function Get-OrganismSnapshot {
    param(
        [Parameter(Mandatory = $true)][string]$Name,
        [Parameter(Mandatory = $true)][string]$Address
    )

    $envelope = Invoke-ThruJson @(
        '--network', $Network, '--json', '--quiet',
        'getaccountinfo', $Address
    )
    $account = $envelope.account_info
    if ($account.owner -ne $ProgramAddress) {
        throw "$Name is not owned by the Cambrian program"
    }

    $tempPath = Join-Path ([IO.Path]::GetTempPath()) ("cambrian-state-$([Guid]::NewGuid().ToString('N')).bin")
    try {
        [IO.File]::WriteAllBytes($tempPath, [Convert]::FromBase64String($account.data))
        $reflectionRaw = (& $thru --json --quiet abi reflect `
            --abi-file $abiFile `
            --type-name CambrianOrganism `
            --data-file $tempPath `
            --values-only | Out-String)
        if ($LASTEXITCODE -ne 0) {
            throw "ABI reflection failed for $Name"
        }
        $state = $reflectionRaw | ConvertFrom-Json
        $statusValue = [int](Get-ScalarValue $state.status)
        $statusName = switch ($statusValue) {
            1 { 'ALIVE' }
            2 { 'DORMANT' }
            3 { 'DEAD' }
            default { "UNKNOWN_$statusValue" }
        }

        return [PSCustomObject]@{
            name = $Name
            address = $Address
            owner = $account.owner
            data_size = $account.dataSize
            sequence = $account.seq
            slot = $account.slot
            status = $statusName
            generation = Get-ScalarValue $state.generation
            age = Get-ScalarValue $state.age
            energy = Get-ScalarValue $state.energy
            vitality = Get-ScalarValue $state.vitality
            pulse_count = Get-ScalarValue $state.pulse_count
            encounter_count = Get-ScalarValue $state.encounter_count
            offspring_count = Get-ScalarValue $state.offspring_count
        }
    }
    finally {
        if (Test-Path -LiteralPath $tempPath) {
            Remove-Item -LiteralPath $tempPath -Force
        }
    }
}

$programEnvelope = Invoke-ThruJson @(
    '--network', $Network, '--json', '--quiet',
    'getaccountinfo', $ProgramAddress
)
$abiEnvelope = Invoke-ThruJson @(
    '--network', $Network, '--json', '--quiet',
    'getaccountinfo', $AbiAddress
)

$stateSnapshots = @()
foreach ($organism in $organisms.GetEnumerator()) {
    $stateSnapshots += Get-OrganismSnapshot -Name $organism.Key -Address $organism.Value
}

$eventSnapshots = @()
foreach ($transaction in $transactions.GetEnumerator()) {
    $decodedRaw = (& $decoder -Signature $transaction.Value -Network $Network | Out-String)
    if ($LASTEXITCODE -ne 0) {
        throw "event decode failed for $($transaction.Key)"
    }
    $decoded = $decodedRaw | ConvertFrom-Json
    if ($decoded.variant -ne $transaction.Key) {
        throw "expected $($transaction.Key) event, decoded $($decoded.variant)"
    }
    $eventSnapshots += [PSCustomObject]@{
        variant = $decoded.variant
        tag = $decoded.tag
        slot = $decoded.slot
        size = $decoded.receipt_size
        signature = $decoded.signature
    }
}

$rpcQuery = [Uri]::EscapeDataString($RpcUrl)
$explorer = [PSCustomObject]@{
    program = "https://scan.thru.org/address/$ProgramAddress`?rpc=$rpcQuery"
    abi = "https://scan.thru.org/address/$AbiAddress`?rpc=$rpcQuery"
    transactions = @($transactions.GetEnumerator() | ForEach-Object {
        [PSCustomObject]@{
            variant = $_.Key
            url = "https://scan.thru.org/tx/$($_.Value)`?rpc=$rpcQuery"
        }
    })
}

[PSCustomObject]@{
    result = 'Cambrian live demo verified'
    network = $Network
    rpc = $RpcUrl
    program = [PSCustomObject]@{
        address = $ProgramAddress
        data_size = $programEnvelope.account_info.dataSize
        owner = $programEnvelope.account_info.owner
        slot = $programEnvelope.account_info.slot
    }
    abi = [PSCustomObject]@{
        address = $AbiAddress
        data_size = $abiEnvelope.account_info.dataSize
        owner = $abiEnvelope.account_info.owner
        slot = $abiEnvelope.account_info.slot
    }
    organisms = $stateSnapshots
    events = $eventSnapshots
    explorer = $explorer
} | ConvertTo-Json -Depth 20
