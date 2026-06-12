# Stage 00. Bootstrap State Design

## Purpose

현재 repo가 GitHub Pages 배포 가능한 정적 사이트 상태인지 확인한다.

## Inputs

- repo path: `C:\dreamlabs\github\kr-co-dreamlabs-assets-static`
- local catalog files
- `assets-manifest.json`
- `CNAME`
- `.nojekyll`

## Expected State

- Git repo exists.
- Static files are at repo root.
- No build step is required.
- `CNAME` contains `assets.dreamlabs.co.kr`.
- `.nojekyll` exists.
- Manifest assets point to existing files.
- Public files do not expose local absolute drive paths.

## Copy Paste Check

```powershell
cd C:\dreamlabs\github\kr-co-dreamlabs-assets-static

git status --short --branch
Test-Path .\.git
Test-Path .\.nojekyll
Get-Content .\CNAME

$manifest = Get-Content .\assets-manifest.json -Raw | ConvertFrom-Json
$missing = @()
foreach ($asset in $manifest.assets) {
  $local = Join-Path (Get-Location) ($asset.path.TrimStart('/') -replace '/', [IO.Path]::DirectorySeparatorChar)
  if (-not (Test-Path -LiteralPath $local)) { $missing += $asset.path }
}

[pscustomobject]@{
  assets = $manifest.assets.Count
  missing = $missing.Count
  approved = $manifest.approved
  runtime_applied = $manifest.runtime_applied
  planned_host = $manifest.planned_host
} | Format-List

if ($missing.Count -gt 0) {
  $missing
  throw "manifest has missing files"
}

if (Select-String -LiteralPath .\assets-manifest.json,.\README.md -SimpleMatch 'H:\' -Quiet) {
  throw "public files contain local absolute paths"
}
```

## Gate

Proceed only if `missing = 0`, `runtime_applied = False`, and `CNAME = assets.dreamlabs.co.kr`.
