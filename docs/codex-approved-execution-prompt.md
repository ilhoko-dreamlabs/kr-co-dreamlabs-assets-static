# Approved Execution Prompt

아래 지시문은 다음 DreamLabs/Codex 세션에 그대로 붙여넣어 실행하기 위한 승인 완료 버전이다.

```text
한국어로 대화한다.

너는 DreamLabs 개발 세션이다.

승인 상태:
- 전체 진행 계획 승인됨.
- 권고안대로 수행 승인됨.
- 잘못 들어간 상단 카드 필터 변경은 폐기한다.
- DreamLabs static asset catalog 기준선으로 정리한다.
- GitHub Pages 배포와 assets.dreamlabs.co.kr custom domain 연결까지 진행한다.
- 단, GitHub OWNER/org 값과 DNS provider 조작 권한처럼 외부 입력이 필요한 지점에서는 그 값만 사용자에게 질문한다.

작업 경로:
- C:\dreamlabs\github\kr-co-dreamlabs-assets-static

목표:
- DreamLabs 정적 asset catalog를 GitHub Pages로 배포한다.
- GitHub Pages source는 main branch root(/)를 사용한다.
- custom domain은 assets.dreamlabs.co.kr 이다.
- DNS는 assets CNAME -> <GITHUB_OWNER_OR_ORG>.github.io 로 연결한다.
- 배포 후 HTTPS smoke check와 SSoT candidate evidence를 정리한다.

필수 선행 확인:
1. git status --short --branch
2. assets-manifest.json 파싱
3. manifest 등록 파일이 실제 존재하는지 확인
4. public 파일에 로컬 절대경로가 없는지 확인
5. node --check inspection.js

실행 순서:
1. C:\dreamlabs\github\kr-co-dreamlabs-assets-static 으로 이동한다.
2. docs/deployment-stage-plan.md 를 확인한다.
3. docs/github-pages-deployment-design.md 를 확인한다.
4. docs/github-pages-runbook-copy-paste.md 를 확인한다.
5. docs/deployment-stages/stage-00-bootstrap-state-design.md 부터 stage-08-rollback-design.md 까지 확인한다.
6. 잘못된 상단 카드 필터 변경이 남아 있으면 폐기한다.
7. 로컬 검증을 실행한다.
8. 첫 커밋을 생성한다.
   - commit message: Bootstrap DreamLabs static asset catalog
9. branch를 main으로 전환한다.
10. GitHub OWNER/org 값이 없으면 사용자에게 OWNER만 질문한다.
11. GitHub repo를 생성하거나 기존 origin을 확인해 push한다.
    - repo: kr-co-dreamlabs-assets-static
    - 권고: public repo
12. GitHub Pages를 main:/ source로 활성화한다.
13. DNS provider에서 아래 record를 적용해야 하면 사용자에게 정확히 요청한다.
    - Type: CNAME
    - Name: assets
    - Value: <GITHUB_OWNER_OR_ORG>.github.io
14. DNS 전파를 확인한다.
15. GitHub Pages custom domain을 assets.dreamlabs.co.kr 로 설정한다.
16. HTTPS certificate가 active/approved 상태가 되면 HTTPS enforcement를 켠다.
17. Runtime smoke check를 실행한다.
    - https://assets.dreamlabs.co.kr/
    - https://assets.dreamlabs.co.kr/assets-manifest.json
    - https://assets.dreamlabs.co.kr/brand/
    - https://assets.dreamlabs.co.kr/product-logos/
    - https://assets.dreamlabs.co.kr/footer/
    - https://assets.dreamlabs.co.kr/brand/dreamlabs/logos/dreamlabs-logo-color.png
    - https://assets.dreamlabs.co.kr/brand/dreamlabs/favicon/favicon.ico
18. GitHub Pages API response, Pages health response, DNS lookup, smoke 결과를 evidence로 정리한다.
19. SSoT candidate update 지시문을 작성한다.
20. 실패 시 docs/deployment-stages/stage-08-rollback-design.md 기준으로 rollback 또는 중단 보고한다.

주의:
- secret, token, private key, 로컬 원본 절대경로를 출력하지 않는다.
- 승인 없이 unrelated user work를 되돌리지 않는다.
- SSoT에서 runtime_applied라고 확인되기 전에는 runtime_applied라고 주장하지 않는다.
- DNS/Pages/HTTPS/smoke evidence가 모두 있어야 운영 반영 완료로 판단한다.
- GitHub Pages 또는 DNS API가 실패하면 추측하지 말고 응답과 필요한 다음 조치를 보고한다.

완료 보고 형식:
- changed files
- GitHub repo URL
- GitHub Pages URL
- custom domain 상태
- HTTPS 상태
- smoke check 결과
- SSoT candidate signals/evidence
- blocked or verification required
```
