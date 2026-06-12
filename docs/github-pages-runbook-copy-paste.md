# GitHub Pages 실행 지시문

아래 명령은 PowerShell에서 그대로 복붙해 실행하는 것을 기준으로 작성했다.

먼저 작업 폴더로 이동한다.

```powershell
cd C:\dreamlabs\github\kr-co-dreamlabs-assets-static
```

`<GITHUB_OWNER_OR_ORG>`만 실제 GitHub 계정 또는 조직명으로 바꾼다.

## 0. 변수 설정

```powershell
$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"
$DOMAIN = "assets.dreamlabs.co.kr"
$BRANCH = "main"
```

## 1. 사전 점검

```powershell
cd C:\dreamlabs\github\kr-co-dreamlabs-assets-static

git status --short --branch
gh auth status

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
} | Format-List

if ($missing.Count -gt 0) {
  $missing
  throw "manifest has missing files"
}

if (Select-String -LiteralPath .\assets-manifest.json,.\README.md -SimpleMatch 'H:\' -Quiet) {
  throw "public files contain local absolute paths"
}
```

## 2. Bootstrap commit 생성

```powershell
git add .
git commit -m "Bootstrap DreamLabs static asset catalog"
git branch -M main
```

## 3. GitHub repository 생성 또는 연결

새 public repository를 만들고 push한다.

```powershell
gh repo create "$OWNER/$REPO" --public --source . --remote origin --push
```

이미 repository가 있으면 아래를 실행한다.

```powershell
git remote add origin "https://github.com/$OWNER/$REPO.git"
git push -u origin main
```

이미 `origin`이 있으면 아래만 실행한다.

```powershell
git remote -v
git push -u origin main
```

## 4. GitHub Pages 활성화

`main:/`을 Pages source로 생성한다.

```powershell
gh api `
  --method POST `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages" `
  -f "source[branch]=$BRANCH" `
  -f "source[path]=/"
```

이미 Pages가 있으면 업데이트한다.

```powershell
gh api `
  --method PUT `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages" `
  -f "source[branch]=$BRANCH" `
  -f "source[path]=/" `
  -f "cname=$DOMAIN"
```

상태를 확인한다.

```powershell
gh api "/repos/$OWNER/$REPO/pages" | ConvertFrom-Json | Select-Object status,html_url,cname,https_enforced,protected_domain_state
```

## 5. DNS 설정

`dreamlabs.co.kr` DNS 제공자에서 아래 record를 추가하거나 수정한다.

```text
Type: CNAME
Name: assets
Value: <GITHUB_OWNER_OR_ORG>.github.io
TTL: Auto 또는 300
```

로컬에서 DNS를 확인한다.

```powershell
Resolve-DnsName assets.dreamlabs.co.kr -Type CNAME
```

기대값:

```text
<GITHUB_OWNER_OR_ORG>.github.io
```

## 6. Custom domain 적용

repo root에는 이미 아래 파일이 있어야 한다.

```text
CNAME -> assets.dreamlabs.co.kr
```

DNS가 보이면 custom domain을 적용한다.

```powershell
gh api `
  --method PUT `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages" `
  -f "cname=$DOMAIN" `
  -f "source[branch]=$BRANCH" `
  -f "source[path]=/"
```

GitHub Pages DNS health check를 실행한다.

```powershell
gh api "/repos/$OWNER/$REPO/pages/health" | ConvertFrom-Json
```

## 7. HTTPS 강제

GitHub Pages 인증서가 발급될 때까지 기다린 뒤 실행한다.

```powershell
gh api `
  --method PUT `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages" `
  -F "https_enforced=true" `
  -f "cname=$DOMAIN" `
  -f "source[branch]=$BRANCH" `
  -f "source[path]=/"
```

확인한다.

```powershell
gh api "/repos/$OWNER/$REPO/pages" | ConvertFrom-Json | Select-Object status,html_url,cname,https_enforced,https_certificate
```

## 8. Runtime smoke check

```powershell
$urls = @(
  "https://$DOMAIN/",
  "https://$DOMAIN/assets-manifest.json",
  "https://$DOMAIN/brand/",
  "https://$DOMAIN/product-logos/",
  "https://$DOMAIN/footer/",
  "https://$DOMAIN/brand/dreamlabs/logos/dreamlabs-logo-color.png",
  "https://$DOMAIN/brand/dreamlabs/favicon/favicon.ico"
)

foreach ($url in $urls) {
  $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
  [pscustomobject]@{
    url = $url
    status = [int]$res.StatusCode
    length = $res.RawContentLength
    contentType = $res.Headers.'Content-Type'
  }
}
```

## 9. 배포 증거 수집

```powershell
$pages = gh api "/repos/$OWNER/$REPO/pages" | ConvertFrom-Json
$health = gh api "/repos/$OWNER/$REPO/pages/health" | ConvertFrom-Json

[pscustomobject]@{
  deployed_at = (Get-Date).ToString("s")
  domain = $DOMAIN
  pages_status = $pages.status
  html_url = $pages.html_url
  cname = $pages.cname
  https_enforced = $pages.https_enforced
  protected_domain_state = $pages.protected_domain_state
  certificate_state = $pages.https_certificate.state
  health = $health
} | ConvertTo-Json -Depth 10
```

## 10. SSoT candidate update 지시문

배포 증거를 수집한 뒤 SSoT Manager 세션에 아래를 복붙한다.

```text
DreamLabs SSoT candidate update request.

Session: asc_20260527192215214_dddfdda3
Repository: kr-co-dreamlabs-assets-static
Service: assets.dreamlabs.co.kr
Deployment lane: GitHub Pages, branch source main:/, static site
Domain: assets.dreamlabs.co.kr
DNS: CNAME assets -> <GITHUB_OWNER_OR_ORG>.github.io

Please create or update candidate objects:
- resource.domain.assets-dreamlabs-co-kr
- resource.service.assets-dreamlabs-co-kr
- standard.dreamlabs-assets-manifest-v0-1
- policy.public-asset-source-ref-sanitization
- policy.dreamlabs-public-disclosure-scope

Keep status as candidate / verification_required unless the attached evidence shows DNS, HTTPS, GitHub Pages, and smoke checks passed.

Evidence to attach:
- GitHub Pages API response
- GitHub Pages health response
- DNS CNAME lookup
- HTTPS smoke check for /
- HTTPS smoke check for /assets-manifest.json
- HTTPS smoke check for representative PNG and ICO assets
```
