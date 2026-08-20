# Manifest Fields

`assets-manifest.json` is the candidate registry for the DreamLabs static asset host.

| field | description |
| --- | --- |
| `id` | Dot-path asset id. |
| `category` | Asset group such as `brand`, `product-logos`, `footer`, `web`, `css`, `ui-patterns`. Worker Host sub-brand assets stay in `brand` with `worker-host` usage tags. |
| `status` | `candidate`, `approved`, `deprecated`, or `do-not-use`. |
| `version` | Candidate asset version. |
| `format` | File extension or delivery format. |
| `path` | Root-relative target URL for the planned asset host. |
| `usage` | Intended usage contexts. |
| `owner` | Asset owner or stewardship area. |
| `source_type` | Provenance type such as `local-drive`, `generated`, or `candidate-token`. |
| `source_ref` | Human-readable source path or generation note. |
| `normalized_from` | Copy, resize, rename, or generation detail. |
| `dimensions` | Pixel size when applicable. |
| `placeholder_only` | `true` only for non-runtime placeholder records. Runtime-safe files should use `false`. |
| `notes` | Review and verification notes. |

## Validation Baseline

- The manifest must only list files that exist in the repo.
- Public disclosure scope must be checked before adding certificates, MOU images, or internal screenshots.
- Candidate assets are not runtime-applied or canonical until review and deployment evidence exist.
