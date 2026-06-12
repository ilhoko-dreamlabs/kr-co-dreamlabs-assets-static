# Stage 01. Public Asset Scope Design

## Purpose

외부 공개 가능한 DreamLabs asset subset만 GitHub Pages에 게시한다.

## Included Scope

- company logo candidates
- symbol/favicon/app icon candidates
- footer attribution logo candidates
- 2024 product logo candidates
- legacy product logo candidates already included in manifest
- candidate UI token/pattern files

## Excluded Scope

- certificates
- MOU documents
- internal screenshots
- shortcut-only external folders
- files with unclear ownership or disclosure status

## Copy Paste Check

```powershell
cd C:\dreamlabs\github\kr-co-dreamlabs-assets-static

$manifest = Get-Content .\assets-manifest.json -Raw | ConvertFrom-Json
$manifest.assets |
  Group-Object category |
  Select-Object Name,Count |
  Sort-Object Name |
  Format-Table -AutoSize

$manifest.excluded_scope

rg -n "certificate|cert-|mou|협약|인증서|확인서|내부|screenshot|screen" .
```

## Gate

If `rg` returns public-risk files inside runtime paths, stop and remove or quarantine them before deployment.
