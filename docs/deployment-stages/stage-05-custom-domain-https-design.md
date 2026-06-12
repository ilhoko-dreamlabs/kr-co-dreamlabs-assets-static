# Stage 05. Custom Domain And HTTPS Design

## Purpose

GitHub Pages에 `assets.dreamlabs.co.kr` custom domain을 적용하고 HTTPS를 강제한다.

## Inputs

- GitHub Pages enabled repo
- DNS CNAME applied
- root `CNAME` file committed and pushed

## Copy Paste Commands

```powershell
$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"
$DOMAIN = "assets.dreamlabs.co.kr"
$BRANCH = "main"

gh api `
  --method PUT `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages" `
  -f "cname=$DOMAIN" `
  -f "source[branch]=$BRANCH" `
  -f "source[path]=/"
```

DNS health check:

```powershell
gh api "/repos/$OWNER/$REPO/pages/health" | ConvertFrom-Json
```

Pages status:

```powershell
gh api "/repos/$OWNER/$REPO/pages" |
  ConvertFrom-Json |
  Select-Object status,html_url,cname,protected_domain_state,https_certificate,https_enforced
```

Enable HTTPS after certificate is ready:

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

## Gate

Proceed when:

- `cname` is `assets.dreamlabs.co.kr`
- certificate state is approved/active
- `https_enforced` is true
