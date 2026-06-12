# 단계별 배포 계획표

## Stage 1. 공개 자산 범위 확정

목표: 외부에 공개해도 되는 자산만 배포 대상으로 확정한다.

입력:

- `assets-manifest.json`
- 승인된 작업 세션에서 제공된 DreamLabs 원본 자산 폴더
- 현재 제외 범위: 인증서, MOU 이미지, 내부 화면, shortcut-only 외부 폴더

산출물:

- 공개 자산 목록
- 보류/제외 자산 목록
- manifest 검수 메모

게이트:

- 사람이 현재 public-safe subset을 승인한다.

## Stage 2. 정적 사이트 릴리즈 기준선

목표: GitHub Pages에서 바로 publish 가능한 repo 상태를 만든다.

산출물:

- `.nojekyll`
- `CNAME`
- root 기준 정적 source 구조
- 로컬 smoke를 통과한 catalog

게이트:

- manifest 등록 파일 수와 실제 파일 수가 일치한다.
- public 파일에 로컬 절대경로가 없다.

## Stage 3. GitHub Repository 게시

목표: GitHub repository를 생성하거나 기존 repo와 연결하고 `main`을 push한다.

산출물:

- GitHub repository
- `origin` remote
- pushed `main` branch

게이트:

- 의도한 owner/org 아래 repository가 생성된다.
- GitHub에서 모든 정적 파일이 확인된다.

## Stage 4. GitHub Pages 활성화

목표: branch source 방식으로 사이트를 publish한다.

설정:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/`

산출물:

- GitHub Pages 활성화
- 기본 Pages URL 생성

게이트:

- GitHub Pages API에서 Pages status가 조회된다.

## Stage 5. Custom Domain DNS

목표: `assets.dreamlabs.co.kr`를 GitHub Pages로 연결한다.

DNS:

- Type: `CNAME`
- Name: `assets`
- Value: `<GITHUB_OWNER_OR_ORG>.github.io`

산출물:

- DNS record 적용
- DNS lookup evidence

게이트:

- `Resolve-DnsName assets.dreamlabs.co.kr -Type CNAME` 결과가 GitHub Pages owner domain을 가리킨다.

## Stage 6. Custom Domain 및 HTTPS

목표: GitHub Pages custom domain을 설정하고 HTTPS를 강제한다.

산출물:

- GitHub Pages custom domain 설정
- HTTPS certificate 발급
- HTTPS enforcement 활성화

게이트:

- GitHub Pages API의 `cname`이 `assets.dreamlabs.co.kr`이다.
- certificate state가 approved/active 계열이다.
- HTTPS enforcement가 true다.

## Stage 7. Runtime Smoke 및 SSoT Evidence

목표: 운영 경로가 정상 동작한다는 증거를 남긴다.

Smoke URL:

- `https://assets.dreamlabs.co.kr/`
- `https://assets.dreamlabs.co.kr/assets-manifest.json`
- `https://assets.dreamlabs.co.kr/brand/`
- `https://assets.dreamlabs.co.kr/product-logos/`
- `https://assets.dreamlabs.co.kr/footer/`
- 대표 PNG 및 ICO asset URL

산출물:

- smoke report
- GitHub Pages API response
- DNS health response
- SSoT candidate update request

게이트:

- 모든 smoke URL이 HTTP 200을 반환한다.
- custom domain에서 asset path가 root 기준으로 정상 동작한다.
