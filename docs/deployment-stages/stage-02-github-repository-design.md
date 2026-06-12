# Stage 02. GitHub Repository Design

## Purpose

정적 사이트 repo를 GitHub에 생성하거나 기존 remote에 연결한다.

## Variables

```powershell
$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"
$BRANCH = "main"
```

## Repository Policy

- Repository can be public because GitHub Pages output is public.
- Do not commit local secrets, private keys, or raw local source paths.
- Initial commit should capture the full bootstrap baseline.

## Copy Paste Commands

```powershell
cd C:\dreamlabs\github\kr-co-dreamlabs-assets-static

$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"
$BRANCH = "main"

git status --short
git add .
git commit -m "Bootstrap DreamLabs static asset catalog"
git branch -M main

gh auth status
gh repo create "$OWNER/$REPO" --public --source . --remote origin --push
```

## Existing Repo Alternative

```powershell
cd C:\dreamlabs\github\kr-co-dreamlabs-assets-static

$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"

git remote -v
git remote add origin "https://github.com/$OWNER/$REPO.git"
git push -u origin main
```

If `origin` already exists:

```powershell
git push -u origin main
```

## Gate

Proceed only if `git push` succeeds and the GitHub repository shows the root static files.
