# GitHub Pages 배포 설계서

## 목표

DreamLabs 정적 자산 카탈로그를 GitHub Pages에 배포하고, `assets.dreamlabs.co.kr` 도메인을 GitHub Pages로 연결한다.

## 배포 형태

- 사이트 유형: 정적 HTML/CSS/JS asset host
- 빌드 단계: 없음
- GitHub Pages source: branch source
- branch: `main`
- folder: `/`
- custom domain: `assets.dreamlabs.co.kr`
- 도메인 유형: custom subdomain
- DNS record: `CNAME`
- CNAME file: repo root의 `CNAME`
- Jekyll: `.nojekyll`로 비활성화

## Branch Source를 쓰는 이유

이 사이트는 빌드 산출물이 따로 없는 순수 정적 사이트다. GitHub Pages는 특정 branch의 root 또는 `/docs` 폴더를 publishing source로 사용할 수 있으므로, `main:/` 배포가 가장 단순하고 운영 추적도 쉽다.

## URL 설계

최종 운영 URL:

```text
https://assets.dreamlabs.co.kr/
```

자산 URL은 custom domain root 기준 root-relative path를 사용한다.

```text
/brand/dreamlabs/logos/dreamlabs-logo-color.png
/brand/dreamlabs/favicon/favicon.ico
/assets-manifest.json
```

GitHub 기본 project URL은 보조 preview 용도일 수 있지만, canonical runtime 형태는 `assets.dreamlabs.co.kr` root다.

## GitHub Repository 전제

배포 전 아래 값을 확정한다.

```powershell
$OWNER = "<GITHUB_OWNER_OR_ORG>"
$REPO = "kr-co-dreamlabs-assets-static"
$DOMAIN = "assets.dreamlabs.co.kr"
```

`$OWNER`는 GitHub Pages 사이트를 소유할 GitHub 계정 또는 조직명이다.

## DNS 설계

`assets.dreamlabs.co.kr`는 subdomain이므로 DNS는 아래처럼 설정한다.

| Name | Type | Value |
| --- | --- | --- |
| `assets` | `CNAME` | `<GITHUB_OWNER_OR_ORG>.github.io` |

subdomain을 repository URL로 연결하지 않는다. GitHub Pages custom subdomain은 owner Pages domain을 바라봐야 한다.

## 보안 설계

- 가능하면 GitHub에서 custom domain verification을 먼저 수행한다.
- domain verification용 TXT record는 검증 후에도 유지한다.
- GitHub Pages 인증서 발급 후 HTTPS enforcement를 켠다.
- public manifest에는 로컬 드라이브 절대경로를 노출하지 않는다.

## 배포 게이트

1. 공개 asset 범위 승인
2. GitHub repository owner 확정
3. GitHub Pages source `main:/` 설정
4. DNS CNAME 적용
5. GitHub Pages custom domain `assets.dreamlabs.co.kr` 설정
6. HTTPS 인증서 활성화 및 HTTPS enforcement 적용
7. smoke check 통과

## SSoT 상태 경계

DNS, Pages, HTTPS, smoke evidence가 모두 확인되기 전까지 이 서비스는 `candidate` / `verification_required` 상태다. 근거 없이 `runtime_applied`로 표시하지 않는다.
