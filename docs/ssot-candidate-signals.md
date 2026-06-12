# SSoT Candidate Signals

Generated from development session `asc_20260527192215214_dddfdda3` on `2026-05-28`.

## resource.domain.assets-dreamlabs-co-kr

- type: `resource`
- area: `Domains`
- status: `pending_input`
- signal: `assets.dreamlabs.co.kr` is the planned static asset host for DreamLabs public-safe assets.
- verification required: DNS, SSL, GitHub Pages/custom domain binding, and runtime smoke checks.

## resource.service.assets-dreamlabs-co-kr

- type: `resource`
- area: `Services`
- status: `pending_input`
- signal: DreamLabs needs a shared external static asset service mirroring the operating shape of `assets.wcamper.com`.
- verification required: repository URL, deployment lane, domain binding, cache policy, and owner.

## standard.dreamlabs-assets-manifest-v0-1

- type: `standard`
- area: `Asset Registry`
- status: `pending_input`
- signal: DreamLabs static assets need a manifest schema derived from the WCamper manifest pattern, with candidate/current status separated from approved/runtime-applied claims.
- verification required: allowed status values, public provenance policy, and required dimensions/usage fields.

## policy.public-asset-source-ref-sanitization

- type: `policy`
- area: `Public Static Asset Metadata`
- status: `pending_input`
- signal: Public `assets-manifest.json` should not expose local absolute drive paths. Use source aliases in public static metadata and keep exact local paths in private session evidence.
- verification required: decide whether source aliases are sufficient for external asset hosts.

## policy.dreamlabs-public-disclosure-scope

- type: `policy`
- area: `External Assets`
- status: `pending_input`
- signal: certificates, MOU images, and internal screenshots exist in the provided resource folders but should not be published until public disclosure scope is confirmed.
- verification required: classify each homepage renewal asset as public, restricted, or do-not-publish.
