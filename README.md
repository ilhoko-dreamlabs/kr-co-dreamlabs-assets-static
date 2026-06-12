# kr-co-dreamlabs-assets-static

## Repo Purpose

This repository is a bootstrap candidate for the DreamLabs shared static asset service planned as `assets.dreamlabs.co.kr`.

It follows the broad structure of `com-wcamper-assets-static` so DreamLabs sites can later consume common brand and product assets from one static host instead of copying them into each site repository.

## Current Candidate Baseline

- baseline: `DreamLabs Asset Pack 0.1.0-candidate`
- generated date: `2026-05-28`
- status: `candidate`
- approval state: not approved as canonical brand master
- deployment state: not deployed in this session
- usage scope: DreamLabs external/static asset inspection and future shared asset host

## Structure Overview

- `assets-manifest.json`: candidate asset registry
- `assets-index.md`: category and priority index
- `brand/`: DreamLabs brand, app icon, favicon, product logo, and web logo candidates
- `footer/`: footer attribution candidates
- `og-social/`: OG/social placeholder area
- `icons/`: line icon placeholder area
- `ui-patterns/`: candidate UI background/divider patterns
- `css/`: candidate design tokens
- `docs/`: usage and manifest notes

## Source Mapping

- Company logos: operator-provided DreamLabs logo source folder
- Product logos: operator-provided DreamLabs product-logo source folder
- Homepage logo variants: operator-provided DreamLabs 2023 renewal source folder

## Boundary

- This bootstrap includes public-safe logo and product-logo candidates only.
- Certificates, MOU images, and internal screenshots are intentionally excluded pending public disclosure review.
- GitHub/static deployment is allowed by task scope, but was not performed without a separate runtime deployment approval.
