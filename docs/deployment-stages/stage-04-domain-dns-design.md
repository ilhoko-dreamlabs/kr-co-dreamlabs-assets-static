# Stage 04. Domain DNS Design

## Purpose

`assets.dreamlabs.co.kr`를 GitHub Pages owner domain으로 연결한다.

## DNS Record

| Type | Name | Value |
| --- | --- | --- |
| `CNAME` | `assets` | `<GITHUB_OWNER_OR_ORG>.github.io` |

## Important Notes

- Do not point `assets.dreamlabs.co.kr` to a GitHub repository URL.
- Do not point the subdomain to `github.com`.
- Keep any GitHub domain verification TXT record if one is required.

## Copy Paste DNS Check

```powershell
$DOMAIN = "assets.dreamlabs.co.kr"

Resolve-DnsName $DOMAIN -Type CNAME
Resolve-DnsName $DOMAIN -Type A -ErrorAction SilentlyContinue
Resolve-DnsName $DOMAIN -Type AAAA -ErrorAction SilentlyContinue
```

## Expected

`Resolve-DnsName assets.dreamlabs.co.kr -Type CNAME` should point to:

```text
<GITHUB_OWNER_OR_ORG>.github.io
```

## Gate

Proceed only after DNS lookup returns the expected GitHub Pages owner domain.
