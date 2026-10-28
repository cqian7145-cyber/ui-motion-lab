# Start UI Motion Lab from PowerShell, after extracting the project to D:\ui-motion-lab
$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot
$env:npm_config_cache = Join-Path $PSScriptRoot ".npm-cache"
New-Item -ItemType Directory -Force $env:npm_config_cache | Out-Null
Write-Host "UI Motion Lab - local launch" -ForegroundColor Cyan
$major = [int]((node --version).TrimStart('v').Split('.')[0])
if ($major -lt 24) { throw "Node.js 24+ is required. Found $(node --version)." }
if (!(Test-Path -LiteralPath '.\node_modules')) {
  Write-Host "Installing dependencies (first run)..."
  npm install
  if ($LASTEXITCODE -ne 0) { throw "npm install failed" }
}
npm run dev
