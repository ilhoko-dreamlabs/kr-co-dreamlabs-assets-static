# Asset Usage

This repository is a candidate static asset host for `assets.dreamlabs.co.kr`.

## Principles

- Site repositories should consume shared assets from this central host after deployment.
- The copied local files are working candidates, not canonical brand masters.
- Product logos from the `2024 new` source folder are included as public-safe candidates.
- Certificates, MOU images, and internal screenshots are excluded from the bootstrap manifest until public disclosure scope is confirmed.

## Planned URL Shape

Use root-relative paths after the custom domain is attached:

```html
<img src="/brand/dreamlabs/logos/dreamlabs-logo-color.png" alt="DreamLabs">
```

DreamLabs operational agent assets use the top-level `agents` namespace:

```html
<img src="/agents/dreamlabs-worker/icon/dreamlabs-bot-icon.png" alt="DreamLabs worker agent">
```

For GitHub Pages project preview URLs, use the inspection UI rather than treating root-relative paths as final.
