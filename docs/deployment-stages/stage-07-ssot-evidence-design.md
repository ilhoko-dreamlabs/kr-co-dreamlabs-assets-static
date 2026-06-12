# Stage 07. SSoT Evidence Design

## Purpose

GitHub Pages/DNS/HTTPS/smoke 결과를 SSoT 후보 신호로 정리한다.

## Candidate Objects

- `resource.domain.assets-dreamlabs-co-kr`
- `resource.service.assets-dreamlabs-co-kr`
- `standard.dreamlabs-assets-manifest-v0-1`
- `policy.public-asset-source-ref-sanitization`
- `policy.dreamlabs-public-disclosure-scope`

## Copy Paste Evidence Collection

```powershell
$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"
$DOMAIN = "assets.dreamlabs.co.kr"

$pages = gh api "/repos/$OWNER/$REPO/pages" | ConvertFrom-Json
$health = gh api "/repos/$OWNER/$REPO/pages/health" | ConvertFrom-Json
$dns = Resolve-DnsName $DOMAIN -Type CNAME

[pscustomobject]@{
  collected_at = (Get-Date).ToString("s")
  domain = $DOMAIN
  pages_status = $pages.status
  html_url = $pages.html_url
  cname = $pages.cname
  https_enforced = $pages.https_enforced
  protected_domain_state = $pages.protected_domain_state
  certificate_state = $pages.https_certificate.state
  dns = $dns
  health = $health
} | ConvertTo-Json -Depth 10
```

## SSoT Manager Prompt

```text
DreamLabs SSoT candidate update request.

Session: asc_20260527192215214_dddfdda3
Repository: kr-co-dreamlabs-assets-static
Service: assets.dreamlabs.co.kr
Deployment lane: GitHub Pages, branch source main:/, static site
Domain: assets.dreamlabs.co.kr
DNS: CNAME assets -> <GITHUB_OWNER_OR_ORG>.github.io

Create or update candidate objects:
- resource.domain.assets-dreamlabs-co-kr
- resource.service.assets-dreamlabs-co-kr
- standard.dreamlabs-assets-manifest-v0-1
- policy.public-asset-source-ref-sanitization
- policy.dreamlabs-public-disclosure-scope

Keep status as candidate / verification_required unless attached evidence shows DNS, HTTPS, GitHub Pages, and smoke checks passed.
```

## Gate

Do not claim `runtime_applied` unless the runtime evidence is attached and reviewed.
