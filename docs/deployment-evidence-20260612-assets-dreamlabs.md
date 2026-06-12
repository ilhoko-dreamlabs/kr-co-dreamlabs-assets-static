# Deployment Evidence: assets.dreamlabs.co.kr

## Summary

- collected_at: `2026-06-12T17:57:53+09:00`
- repository: `https://github.com/ilhoko-dreamlabs/kr-co-dreamlabs-assets-static`
- commit: `032773d8adcebe6df0c0b99ae1c05d30d1b81717`
- GitHub Pages source: `main:/`
- custom domain: `assets.dreamlabs.co.kr`
- status: `dns_configured_http_live_https_pending`

## DNS Change

- fqdn: `assets.dreamlabs.co.kr`
- record type: `CNAME`
- target: `ilhoko-dreamlabs.github.io`
- ttl: `300`
- DNS authority lane: DOCKER2/NAS Synology DNSServer
- zone serial before: `2026060900`
- zone serial after: `2026061201`
- zone backup: `dreamlabs.co.kr.bak.20260612-174850-assets-github-pages`

## DNS Verification

| resolver | result |
| --- | --- |
| authoritative DNS | `assets.dreamlabs.co.kr CNAME ilhoko-dreamlabs.github.io` |
| `1.1.1.1` | `assets.dreamlabs.co.kr CNAME ilhoko-dreamlabs.github.io` |
| `8.8.8.8` | `assets.dreamlabs.co.kr CNAME ilhoko-dreamlabs.github.io` |

## GitHub Pages

```json
{
  "status": "built",
  "cname": "assets.dreamlabs.co.kr",
  "html_url": "http://assets.dreamlabs.co.kr/",
  "source": {
    "branch": "main",
    "path": "/"
  },
  "public": true,
  "https_enforced": false
}
```

## HTTP Smoke

| URL | status | content type |
| --- | ---: | --- |
| `http://assets.dreamlabs.co.kr/` | 200 | `text/html; charset=utf-8` |
| `http://assets.dreamlabs.co.kr/assets-manifest.json` | 200 | `application/json; charset=utf-8` |
| `http://assets.dreamlabs.co.kr/brand/` | 200 | `text/html; charset=utf-8` |
| `http://assets.dreamlabs.co.kr/product-logos/` | 200 | `text/html; charset=utf-8` |
| `http://assets.dreamlabs.co.kr/footer/` | 200 | `text/html; charset=utf-8` |
| `http://assets.dreamlabs.co.kr/brand/dreamlabs/logos/dreamlabs-logo-color.png` | 200 | `image/png` |
| `http://assets.dreamlabs.co.kr/brand/dreamlabs/favicon/favicon.ico` | 200 | `image/vnd.microsoft.icon` |

## HTTPS Status

HTTPS is not live yet.

- `https://assets.dreamlabs.co.kr/`: SSL connection not established
- `https://assets.dreamlabs.co.kr/assets-manifest.json`: SSL connection not established
- GitHub API response when enabling HTTPS: `The certificate does not exist yet`
- GitHub Pages health endpoint: `202 Accepted`

## SSoT Candidate Update Prompt

```text
DreamLabs SSoT candidate update request.

Session: asc_20260527192215214_dddfdda3
Repository: kr-co-dreamlabs-assets-static
Repository URL: https://github.com/ilhoko-dreamlabs/kr-co-dreamlabs-assets-static
Commit: 032773d8adcebe6df0c0b99ae1c05d30d1b81717
Service: assets.dreamlabs.co.kr
Deployment lane: GitHub Pages, branch source main:/, static site
Domain: assets.dreamlabs.co.kr
DNS: CNAME assets -> ilhoko-dreamlabs.github.io
DNS status: configured and propagated to authoritative DNS, 1.1.1.1, and 8.8.8.8
HTTP status: live, representative smoke URLs return 200
HTTPS status: pending, GitHub Pages certificate not created yet

Create or update candidate objects:
- resource.domain.assets-dreamlabs-co-kr
- resource.service.assets-dreamlabs-co-kr
- standard.dreamlabs-assets-manifest-v0-1
- policy.public-asset-source-ref-sanitization
- policy.dreamlabs-public-disclosure-scope

Recommended status:
- domain/service runtime_status: verification_required until HTTPS smoke passes
- DNS substatus: dns_configured
- HTTP substatus: http_live
- HTTPS substatus: https_pending

Do not mark runtime_applied until HTTPS certificate is active, HTTPS enforcement succeeds, and HTTPS smoke checks pass.
```

## Next Check

Poll GitHub Pages until the certificate exists, then run:

```powershell
$OWNER = "ilhoko-dreamlabs"
$REPO = "kr-co-dreamlabs-assets-static"
$DOMAIN = "assets.dreamlabs.co.kr"
$BRANCH = "main"

gh api `
  --method PUT `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages" `
  -F "https_enforced=true" `
  -f "cname=$DOMAIN" `
  -f "source[branch]=$BRANCH" `
  -f "source[path]=/"
```
