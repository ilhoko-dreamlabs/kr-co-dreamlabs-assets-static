# Deployment Evidence: assets.dreamlabs.co.kr

## Summary

- collected_at: `2026-06-12T18:31:00+09:00`
- repository: `https://github.com/ilhoko-dreamlabs/kr-co-dreamlabs-assets-static`
- repository commit: `6dd621a39a2496c941cb060841bd25a338eaab66`
- GitHub Pages source: `main:/`
- custom domain: `assets.dreamlabs.co.kr`
- status: `dns_configured_https_enforced_smoke_passed`

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
| local resolver | `assets.dreamlabs.co.kr CNAME ilhoko-dreamlabs.github.io` |

## GitHub Pages

```json
{
  "status": "built",
  "cname": "assets.dreamlabs.co.kr",
  "html_url": "https://assets.dreamlabs.co.kr/",
  "source": {
    "branch": "main",
    "path": "/"
  },
  "public": true,
  "https_certificate": {
    "state": "approved",
    "domains": [
      "assets.dreamlabs.co.kr"
    ],
    "expires_at": "2026-09-10"
  },
  "https_enforced": true
}
```

## HTTP Redirect

| URL | status | location |
| --- | ---: | --- |
| `http://assets.dreamlabs.co.kr/` | 301 | `https://assets.dreamlabs.co.kr/` |

## HTTPS Smoke

| URL | status | content type |
| --- | ---: | --- |
| `https://assets.dreamlabs.co.kr/` | 200 | `text/html; charset=utf-8` |
| `https://assets.dreamlabs.co.kr/assets-manifest.json` | 200 | `application/json; charset=utf-8` |
| `https://assets.dreamlabs.co.kr/brand/` | 200 | `text/html; charset=utf-8` |
| `https://assets.dreamlabs.co.kr/product-logos/` | 200 | `text/html; charset=utf-8` |
| `https://assets.dreamlabs.co.kr/footer/` | 200 | `text/html; charset=utf-8` |
| `https://assets.dreamlabs.co.kr/brand/dreamlabs/logos/dreamlabs-logo-color.png` | 200 | `image/png` |
| `https://assets.dreamlabs.co.kr/brand/dreamlabs/favicon/favicon.ico` | 200 | `image/vnd.microsoft.icon` |

## SSL Activation Actions

- Initial HTTPS enforcement attempt failed with `The certificate does not exist yet`.
- GitHub Pages domain health showed DNS valid, HTTPS eligible, and no CAA error.
- GitHub Pages build was retriggered.
- Custom domain was removed and re-added through the GitHub Pages API to trigger certificate issuance after DNS propagation.
- GitHub certificate became `approved`.
- HTTPS enforcement was enabled successfully.

## SSoT Candidate Update Prompt

```text
DreamLabs SSoT candidate update request.

Session: asc_20260527192215214_dddfdda3
Repository: kr-co-dreamlabs-assets-static
Repository URL: https://github.com/ilhoko-dreamlabs/kr-co-dreamlabs-assets-static
Repository commit: 6dd621a39a2496c941cb060841bd25a338eaab66
Service: assets.dreamlabs.co.kr
Deployment lane: GitHub Pages, branch source main:/, static site
Domain: assets.dreamlabs.co.kr
DNS: CNAME assets -> ilhoko-dreamlabs.github.io
DNS status: configured and propagated to authoritative DNS, 1.1.1.1, 8.8.8.8, and local resolver
HTTP status: redirects to HTTPS
HTTPS certificate status: GitHub Pages certificate approved, expires 2026-09-10
HTTPS enforcement: enabled
HTTPS smoke status: passed for home, manifest, category pages, logo PNG, and favicon ICO

Create or update candidate objects:
- resource.domain.assets-dreamlabs-co-kr
- resource.service.assets-dreamlabs-co-kr
- standard.dreamlabs-assets-manifest-v0-1
- policy.public-asset-source-ref-sanitization
- policy.dreamlabs-public-disclosure-scope

Recommended status:
- domain/service runtime_status: evidence_ready_for_runtime_applied_review
- DNS substatus: dns_configured
- HTTP substatus: redirects_to_https
- HTTPS substatus: certificate_approved_https_enforced_smoke_passed

Do not mark canonical/runtime_applied unless SSoT promotion policy accepts this evidence.
```
