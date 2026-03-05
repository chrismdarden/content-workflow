# Setup Workspace for Content Workflow
# This script reconstructs machine-specific shortcuts for Google Drive assets.

$ProjectRoot = Get-Location
$ShortcutPath = Join-Path $ProjectRoot "Prompt Library.lnk"

# 1. Identify Google Drive Root
$GoogleDrive = "G:\My Drive"
if (-not (Test-Path $GoogleDrive)) {
    Write-Host "Google Drive not found at G:\. Searching common locations..." -ForegroundColor Yellow
    # Add logic here if user uses a different mount point
}

# 2. Create/Update Shortcut
$Target = "G:\My Drive\Work Files\G Google Antigravity"
if (Test-Path $Target) {
    $WshShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WshShell.CreateShortcut($ShortcutPath)
    $Shortcut.TargetPath = $Target
    $Shortcut.Save()
    Write-Host "Success: 'Prompt Library.lnk' created pointing to $Target" -ForegroundColor Green
} else {
    Write-Host "Error: Target folder not found at $Target. Please check your Google Drive mount." -ForegroundColor Red
}

# 3. Verify .gitignore
if (-not (Select-String -Path ".gitignore" -Pattern "*.lnk")) {
    Add-Content -Path ".gitignore" -Value "`n*.lnk"
    Write-Host "Added *.lnk to .gitignore for security." -ForegroundColor Cyan
}
