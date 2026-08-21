# kr-co-dreamlabs-assets-static

## Repo Purpose

This repository is a bootstrap candidate for the DreamLabs shared static asset service planned as `assets.dreamlabs.co.kr`.

It follows the broad structure of `com-wcamper-assets-static` so DreamLabs sites can later consume common brand and product assets from one static host instead of copying them into each site repository.

## Current Candidate Baseline

- baseline: `DreamLabs Asset Pack 0.1.2-candidate`
- generated date: `2026-08-20`
- status: `candidate`
- approval state: mixed, with candidate assets and one approved worker agent asset
- deployment state: deployed static host
- runtime state: not applied by consuming services
- usage scope: DreamLabs external/static asset inspection and future shared asset host

## Structure Overview

- `assets-manifest.json`: public candidate asset registry without internal source provenance
- `assets-index.md`: category and priority index
- `brand/`: DreamLabs brand, app icon, favicon, product logo, and web logo candidates
- `brand/worker-host/`: DreamLabs Worker Host sub-brand logo, favicon, app icon, and web candidates
- `agents/`: DreamLabs operational agent/persona assets
- `footer/`: footer attribution candidates
- `og-social/`: OG/social placeholder area
- `icons/`: line icon placeholder area
- `ui-patterns/`: candidate UI background/divider patterns
- `css/`: candidate design tokens
- `docs/`: usage and manifest notes

## Public Manifest Boundary

- The public manifest separates `approval_status`, `deployment_status`, and `runtime_applied`.
- The public manifest uses `collection` for cross-category sets such as Worker Host.
- Internal source references and chat/session IDs are not published in `assets-manifest.json`.

## Source Mapping

- Company logos: operator-provided DreamLabs logo source folder
- Product logos: operator-provided DreamLabs product-logo source folder
- Homepage logo variants: operator-provided DreamLabs 2023 renewal source folder
- Worker agent icon: operator-provided DreamLabs worker agent official asset attachment
- Worker Host sub-brand candidates: generated local design candidates for review

## Boundary

- This bootstrap includes public-safe logo and product-logo candidates only.
- Certificates, MOU images, and internal screenshots are intentionally excluded pending public disclosure review.
- Static deployment status does not imply runtime adoption by consuming services.
- See `docs/asset-policy.md` before using candidate assets outside DreamLabs-controlled sites.
