# Stage 03. GitHub Pages Design

## Purpose

GitHub Pages를 `main:/` branch source로 활성화한다.

## Design

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/`
- Build: none
- Jekyll: disabled by `.nojekyll`

## Copy Paste Commands

```powershell
$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"
$BRANCH = "main"

gh api `
  --method POST `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages" `
  -f "source[branch]=$BRANCH" `
  -f "source[path]=/"
```

If Pages already exists:

```powershell
gh api `
  --method PUT `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages" `
  -f "source[branch]=$BRANCH" `
  -f "source[path]=/"
```

Status check:

```powershell
gh api "/repos/$OWNER/$REPO/pages" |
  ConvertFrom-Json |
  Select-Object status,html_url,cname,https_enforced,source
```

## Gate

Proceed when GitHub Pages API returns a site object and source points to `main` and `/`.
