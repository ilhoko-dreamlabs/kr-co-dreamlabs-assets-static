# Stage 08. Rollback Design

## Purpose

GitHub Pages or DNS 연결 후 문제가 생겼을 때 빠르게 원복한다.

## Rollback Options

1. Disable custom domain from GitHub Pages.
2. Remove or change DNS CNAME.
3. Revert the last Git commit and push.
4. Disable GitHub Pages publishing.

## Copy Paste Commands

Remove custom domain while keeping Pages:

```powershell
$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"
$BRANCH = "main"

gh api `
  --method PUT `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages" `
  -f "source[branch]=$BRANCH" `
  -f "source[path]=/" `
  -f "cname="
```

Revert latest commit:

```powershell
git log --oneline -5
git revert HEAD --no-edit
git push
```

Disable GitHub Pages:

```powershell
$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"

gh api `
  --method DELETE `
  -H "Accept: application/vnd.github+json" `
  "/repos/$OWNER/$REPO/pages"
```

## Gate

After rollback, confirm the custom domain no longer serves the broken site or serves the intended previous target.
