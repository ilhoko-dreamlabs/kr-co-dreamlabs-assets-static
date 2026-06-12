# Codex Full Deployment Prompt

아래 지시문은 다음 Codex 세션에 그대로 붙여넣기 위한 실행 프롬프트다.

```text
한국어로 대화한다.

너는 DreamLabs 개발 세션이다.

목표:
- C:\dreamlabs\github\kr-co-dreamlabs-assets-static 정적 사이트를 GitHub Pages로 배포한다.
- custom domain은 assets.dreamlabs.co.kr 이다.
- GitHub Pages source는 main branch의 root(/)를 사용한다.
- DNS는 assets CNAME -> <GITHUB_OWNER_OR_ORG>.github.io 로 연결한다.
- 배포 후 HTTPS smoke check와 SSoT candidate evidence를 정리한다.

반드시 먼저 확인할 문서:
- docs/deployment-stage-plan.md
- docs/github-pages-deployment-design.md
- docs/github-pages-runbook-copy-paste.md
- docs/deployment-stages/stage-00-bootstrap-state-design.md
- docs/deployment-stages/stage-01-public-asset-scope-design.md
- docs/deployment-stages/stage-02-github-repository-design.md
- docs/deployment-stages/stage-03-github-pages-design.md
- docs/deployment-stages/stage-04-domain-dns-design.md
- docs/deployment-stages/stage-05-custom-domain-https-design.md
- docs/deployment-stages/stage-06-runtime-smoke-design.md
- docs/deployment-stages/stage-07-ssot-evidence-design.md
- docs/deployment-stages/stage-08-rollback-design.md

변수:
- OWNER = <GITHUB_OWNER_OR_ORG>
- REPO = kr-co-dreamlabs-assets-static
- DOMAIN = assets.dreamlabs.co.kr
- BRANCH = main

진행 순서:
1. Stage 00 preflight를 실행한다.
2. Stage 01 공개 자산 범위를 점검한다.
3. GitHub owner/org 값이 없으면 사용자에게 OWNER만 질문한다.
4. git status를 확인하고, 의도한 변경만 commit한다.
5. GitHub repo를 생성하거나 기존 origin을 확인해 push한다.
6. GitHub Pages를 main:/ source로 활성화한다.
7. DNS CNAME 설정이 필요한 경우 사용자에게 DNS provider에서 적용할 정확한 record를 제시하고, 적용 완료 후 계속한다.
8. custom domain assets.dreamlabs.co.kr 을 GitHub Pages에 적용한다.
9. HTTPS certificate가 준비되면 HTTPS enforcement를 켠다.
10. Stage 06 smoke check를 실행한다.
11. Stage 07 evidence를 수집하고 SSoT candidate update 지시문을 작성한다.
12. 실패 시 Stage 08 rollback 설계를 기준으로 멈추고 보고한다.

주의:
- secret, token, private key, 로컬 절대 원본 경로를 출력하지 않는다.
- SSoT에서 runtime_applied라고 확인되기 전에는 runtime_applied라고 주장하지 않는다.
- DNS/Pages/HTTPS/smoke evidence가 모두 있어야 운영 반영 완료로 볼 수 있다.
- GitHub/DNS 변경은 이 요청의 목표 범위에 포함되지만, OWNER 또는 DNS provider 권한처럼 사용자가 제공해야 하는 값이 없으면 그 지점에서만 질문한다.

완료 보고:
- changed files
- GitHub repo URL
- GitHub Pages URL
- custom domain 상태
- HTTPS 상태
- smoke check 결과
- SSoT candidate signals/evidence
- blocked or verification required
```
