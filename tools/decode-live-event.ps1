param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Za-z0-9_-]+$')]
    [string]$Signature,

    [ValidatePattern('^[A-Za-z0-9_-]+$')]
    [string]$Network = 'betanet',

    [string]$AbiFile
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($AbiFile)) {
    $AbiFile = Join-Path (Split-Path $PSScriptRoot -Parent) 'cambrian.abi.yaml'
}

$thruCommand = Get-Command thru.cmd -ErrorAction SilentlyContinue
if ($null -eq $thruCommand) {
    $thruCommand = Get-Command thru -ErrorAction Stop
}
$thru = $thruCommand.Source
$resolvedAbi = (Resolve-Path $AbiFile).Path

$transactionJson = (& $thru --network $Network --json --quiet txn get $Signature | Out-String)
if ($LASTEXITCODE -ne 0) {
    throw "transaction lookup failed with exit code $LASTEXITCODE"
}

$transactionEnvelope = $transactionJson | ConvertFrom-Json
$transaction = $transactionEnvelope.transaction_get
if ($transaction.status -ne 'success') {
    throw "transaction lookup did not return success"
}
if ([int]$transaction.events_count -ne 1 -or $transaction.events.Count -ne 1) {
    throw "Cambrian event decoder expects exactly one event per transaction"
}

# Windows PowerShell converts large JSON integers through floating point. Preserve
# event_type exactly from the raw JSON because these eight bytes are event bytes.
$eventTypeMatch = [regex]::Match(
    $transactionJson,
    '"event_type"\s*:\s*(\d+)'
)
if (-not $eventTypeMatch.Success) {
    throw 'transaction receipt did not contain event_type'
}

$eventTypeText = $eventTypeMatch.Groups[1].Value
$eventTypeBytes = [BitConverter]::GetBytes([UInt64]::Parse($eventTypeText))
$dataHex = [string]$transaction.events[0].data.value
if (($dataHex.Length % 2) -ne 0 -or $dataHex -notmatch '^[0-9a-fA-F]*$') {
    throw 'transaction receipt contained invalid event hex'
}

$expectedSize = [int]$transaction.events_size
if ($expectedSize -lt $eventTypeBytes.Length) {
    throw 'event receipt size is smaller than event_type'
}

$encodedTailSize = [int]($dataHex.Length / 2)
$expectedTailSize = $expectedSize - $eventTypeBytes.Length
if ($encodedTailSize -gt $expectedTailSize) {
    throw 'event data exceeds the receipt event size'
}

$eventBytes = New-Object byte[] $expectedSize
[Array]::Copy($eventTypeBytes, 0, $eventBytes, 0, $eventTypeBytes.Length)
for ($offset = 0; $offset -lt $dataHex.Length; $offset += 2) {
    $eventBytes[$eventTypeBytes.Length + ($offset / 2)] =
        [Convert]::ToByte($dataHex.Substring($offset, 2), 16)
}

$tempPath = Join-Path ([IO.Path]::GetTempPath()) ("cambrian-event-$([Guid]::NewGuid().ToString('N')).bin")
try {
    [IO.File]::WriteAllBytes($tempPath, $eventBytes)
    $reflectionJson = (& $thru --json --quiet abi reflect `
        --abi-file $resolvedAbi `
        --type-name CambrianEvent `
        --data-file $tempPath `
        --values-only | Out-String)
    if ($LASTEXITCODE -ne 0) {
        throw "ABI reflection failed with exit code $LASTEXITCODE"
    }

    $reflection = $reflectionJson | ConvertFrom-Json
    [PSCustomObject]@{
        signature = $transaction.signature
        slot = $transaction.slot
        event_id = $transaction.events[0].event_id
        receipt_size = $expectedSize
        encoded_tail_bytes = $encodedTailSize
        padded_zero_bytes = $expectedTailSize - $encodedTailSize
        tag = $reflection.tag.value
        variant = $reflection.payload.variant
        decoded_event = $reflection
    } | ConvertTo-Json -Depth 100
}
finally {
    if (Test-Path -LiteralPath $tempPath) {
        Remove-Item -LiteralPath $tempPath -Force
    }
}
