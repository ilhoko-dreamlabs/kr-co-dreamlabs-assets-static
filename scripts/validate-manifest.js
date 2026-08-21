const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'assets-manifest.json');
const indexPath = path.join(root, 'assets-index.md');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const ids = new Set();
const errors = [];

const forbiddenRootFields = ['starter_chat_session_id', 'approved'];
const forbiddenAssetFields = ['source_ref'];

for (const field of forbiddenRootFields) {
  if (Object.prototype.hasOwnProperty.call(manifest, field)) {
    errors.push(`public manifest exposes forbidden root field: ${field}`);
  }
}

if (!Array.isArray(manifest.assets)) {
  errors.push('manifest.assets must be an array');
} else {
  for (const asset of manifest.assets) {
    if (!asset.id) errors.push('asset missing id');
    if (ids.has(asset.id)) errors.push(`duplicate asset id: ${asset.id}`);
    ids.add(asset.id);

    for (const field of forbiddenAssetFields) {
      if (Object.prototype.hasOwnProperty.call(asset, field)) {
        errors.push(`${asset.id} exposes forbidden asset field: ${field}`);
      }
    }

    for (const field of ['approval_status', 'deployment_status', 'runtime_applied', 'collection']) {
      if (!Object.prototype.hasOwnProperty.call(asset, field)) {
        errors.push(`${asset.id} missing ${field}`);
      }
    }

    if (!asset.path || !asset.path.startsWith('/')) {
      errors.push(`${asset.id} has invalid path: ${asset.path}`);
      continue;
    }

    const filePath = path.join(root, asset.path);
    if (!fs.existsSync(filePath)) {
      errors.push(`${asset.id} missing file: ${asset.path}`);
    }
  }
}

const index = fs.readFileSync(indexPath, 'utf8');
const referencedIds = [...index.matchAll(/`([a-z0-9][a-z0-9.-]*(?:\.(?:png|svg|ico|css|json)))`/g)]
  .map((match) => match[1])
  .filter((id) => id.split('.').length >= 3);

for (const id of referencedIds) {
  if (!ids.has(id)) {
    errors.push(`assets-index.md references unknown manifest id: ${id}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`manifest ok: ${manifest.assets.length} assets, ${ids.size} unique ids`);
