# Asset Usage

This repository is a candidate static asset host for `assets.dreamlabs.co.kr`.

## Principles

- Site repositories should consume shared assets from this central host after deployment.
- The copied local files are working candidates, not canonical brand masters.
- Product logos from the `2024 new` source folder are included as public-safe candidates.
- Certificates, MOU images, and internal screenshots are excluded from the bootstrap manifest until public disclosure scope is confirmed.

## Planned URL Shape

Use absolute URLs when copying assets into an external site. Root-relative paths point to the consuming site's own origin and should only be used inside this asset host.

```html
<img src="https://assets.dreamlabs.co.kr/brand/dreamlabs/logos/dreamlabs-logo-color.png" alt="DreamLabs">
```

DreamLabs operational agent assets use the top-level `agents` namespace:

```html
<img src="https://assets.dreamlabs.co.kr/agents/dreamlabs-worker/icon/dreamlabs-bot-icon.png" alt="DreamLabs worker agent">
```

Worker Host sub-brand assets use `brand/worker-host` so they remain separate from both the DreamLabs company brand and operational agent/persona assets:

```html
<link rel="icon" href="https://assets.dreamlabs.co.kr/brand/worker-host/favicon/favicon.ico">
<img src="https://assets.dreamlabs.co.kr/brand/worker-host/logos/worker-host-logo.svg" alt="DreamLabs Worker Host">
```

Worker Host token candidates are available separately from the default DreamLabs token file:

```html
<link rel="stylesheet" href="https://assets.dreamlabs.co.kr/css/worker-host-tokens.css">
```

## Use Policy

See [Asset Policy](./asset-policy.md) before using candidate assets outside DreamLabs-controlled sites.

For GitHub Pages project preview URLs, use the inspection UI rather than treating root-relative paths as final.
