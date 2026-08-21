# Manifest Fields

`assets-manifest.json` is the public candidate registry for the DreamLabs static asset host.

| field | description |
| --- | --- |
| `id` | Dot-path asset id. |
| `category` | Asset group such as `brand`, `product-logos`, `footer`, `web`, `css`, `ui-patterns`. Worker Host sub-brand assets stay in `brand` with `worker-host` usage tags. |
| `status` | Backward-compatible alias for approval state. Prefer `approval_status` for new consumers. |
| `approval_status` | `candidate`, `approved`, `deprecated`, or `do-not-use`. |
| `deployment_status` | `source-only`, `deployed`, or `blocked`. |
| `runtime_applied` | `true` only after consuming runtime services are confirmed to use the asset. |
| `collection` | Cross-category grouping such as `worker-host`, `dreamlabs-brand`, or `dreamlabs-product-logos`. |
| `version` | Candidate asset version. |
| `format` | File extension or delivery format. |
| `path` | Root-relative target URL for the planned asset host. |
| `usage` | Intended usage contexts. |
| `owner` | Asset owner or stewardship area. |
| `source_type` | Provenance type such as `local-drive`, `generated`, or `candidate-token`. |
| `normalized_from` | Copy, resize, rename, or generation detail. |
| `dimensions` | Pixel size when applicable. |
| `placeholder_only` | `true` only for non-runtime placeholder records. Runtime-safe files should use `false`. |
| `notes` | Review and verification notes. |

## Public Boundary

- `assets-manifest.json` must not expose internal chat/session IDs, local folder names, or source file paths.
- Internal provenance belongs in a private registry outside this public static host.

## Validation Baseline

- The manifest must only list files that exist in the repo.
- The asset index must only reference asset IDs that exist in the manifest.
- Public disclosure scope must be checked before adding certificates, MOU images, or internal screenshots.
- Candidate assets are not runtime-applied or canonical until review and deployment evidence exist.
