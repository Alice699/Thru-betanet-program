$ErrorActionPreference = 'Stop'

$projectDir = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location $projectDir

$thru = (Get-Command thru.cmd -ErrorAction Stop).Source
$abi = '.\cambrian.abi.yaml'

function Invoke-Thru {
    param([Parameter(Mandatory = $true)][string[]]$Arguments)

    & $thru @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "thru command failed with exit code ${LASTEXITCODE}: $($Arguments -join ' ')"
    }
}

Write-Host '== ABI analyze =='
Invoke-Thru @('abi', 'analyze', '--files', $abi, '--print-footprint', 'CambrianOrganism', '--print-validate', 'CambrianInstruction', '--quiet')

Write-Host '== ABI codegen: C =='
Invoke-Thru @('abi', 'codegen', '--files', $abi, '--language', 'c', '--output', '.\generated\c', '--quiet')

Write-Host '== ABI codegen: TypeScript =='
Invoke-Thru @('abi', 'codegen', '--files', $abi, '--language', 'typescript', '--output', '.\generated\typescript', '--quiet')

Write-Host '== Generate fixtures =='
& node.exe --experimental-transform-types .\tools\make-fixtures.mjs
if ($LASTEXITCODE -ne 0) {
    throw "fixture generation failed with exit code $LASTEXITCODE"
}

Write-Host '== Model boundary tests =='
& node.exe .\tools\test-model.mjs
if ($LASTEXITCODE -ne 0) {
    throw "model boundary tests failed with exit code $LASTEXITCODE"
}

$validCases = @(
    @('CambrianInstruction', '.\fixtures\instruction-birth.bin'),
    @('CambrianInstruction', '.\fixtures\instruction-pulse.bin'),
    @('CambrianInstruction', '.\fixtures\instruction-encounter.bin'),
    @('CambrianInstruction', '.\fixtures\instruction-reproduce.bin'),
    @('CambrianInstruction', '.\fixtures\instruction-transfer-control.bin'),
    @('CambrianInstruction', '.\fixtures\runtime-pulse-bad-index.bin'),
    @('CambrianInstruction', '.\fixtures\runtime-encounter-same-account.bin'),
    @('CambrianInstruction', '.\fixtures\runtime-reproduce-same-parent.bin'),
    @('CambrianInstruction', '.\fixtures\runtime-transfer-program-controller.bin'),
    @('CambrianOrganism', '.\fixtures\account-organism.bin'),
    @('CambrianEvent', '.\fixtures\event-birth.bin'),
    @('CambrianEvent', '.\fixtures\event-pulse.bin'),
    @('CambrianEvent', '.\fixtures\event-encounter.bin'),
    @('CambrianEvent', '.\fixtures\event-reproduce.bin'),
    @('CambrianEvent', '.\fixtures\event-transfer-control.bin'),
    @('CambrianError', '.\fixtures\error-unauthorized.bin')
)

Write-Host "== Reflect/validate $($validCases.Count) valid fixtures =="
foreach ($case in $validCases) {
    Invoke-Thru @('abi', 'reflect', '--abi-file', $abi, '--type-name', $case[0], '--data-file', $case[1], '--validate-only', '--quiet')
}

$invalidCases = @(
    @('CambrianInstruction', '.\fixtures\invalid-truncated-birth.bin'),
    @('CambrianInstruction', '.\fixtures\invalid-proof-size.bin'),
    @('CambrianInstruction', '.\fixtures\invalid-instruction-tag.bin')
)

Write-Host "== Reject $($invalidCases.Count) malformed fixtures =="
foreach ($case in $invalidCases) {
    & $thru abi reflect --abi-file $abi --type-name $case[0] --data-file $case[1] --validate-only --quiet
    if ($LASTEXITCODE -eq 0) {
        throw "malformed fixture unexpectedly validated: $($case[1])"
    }
    Write-Host "rejected $($case[1])"
}

Write-Host 'Local ABI validation passed.'
