const scriptBase = new URL('.', document.currentScript.src);

async function loadManifest() {
  const response = await fetch(new URL('assets-manifest.json', scriptBase), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`manifest fetch failed: ${response.status}`);
  }
  return response.json();
}

function assetUrl(path) {
  return new URL(path.replace(/^\//, ''), scriptBase).toString();
}

function byPath(assets, path) {
  return assets.find((asset) => asset.path === path) || null;
}

function categoryCounts(assets) {
  return assets.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {});
}

function statusCounts(assets) {
  return assets.reduce((acc, asset) => {
    acc[asset.status] = (acc[asset.status] || 0) + 1;
    return acc;
  }, {});
}

function badgeClass(asset) {
  return asset.source_type === 'generated' ? 'generated' : asset.status;
}

function assetCard(asset, options = {}) {
  const title = options.title || asset.id;
  const description = options.description || '';
  const previewClass = options.previewClass || '';
  return `
    <article class="card ${options.cardClass || ''}">
      <div class="chip-row">
        <span class="badge ${badgeClass(asset)}">${asset.status}</span>
        <span class="mono">${asset.format}</span>
      </div>
      <h3>${title}</h3>
      ${description ? `<p>${description}</p>` : ''}
      <div class="preview ${previewClass}">
        <img src="${assetUrl(asset.path)}" alt="${title}">
      </div>
      <div class="meta">
        <div class="mono">id: ${asset.id}</div>
        <div class="mono">path: ${asset.path}</div>
        <div class="mono">source: ${asset.source_ref}</div>
      </div>
    </article>
  `;
}

function fileCard(asset, title, description) {
  return `
    <article class="card">
      <div class="chip-row">
        <span class="badge ${badgeClass(asset)}">${asset.status}</span>
        <span class="mono">${asset.format}</span>
      </div>
      <h3>${title}</h3>
      <p>${description}</p>
      <div class="meta">
        <div class="mono">id: ${asset.id}</div>
        <div class="mono">path: ${asset.path}</div>
        <div class="mono">normalized_from: ${asset.normalized_from}</div>
      </div>
    </article>
  `;
}

function renderHome(manifest, assets) {
  const counts = categoryCounts(assets);
  const statuses = statusCounts(assets);
  document.getElementById('summary-metrics').innerHTML = `
    <article class="metric-card"><strong>${assets.length}</strong><span>total candidate files</span></article>
    <article class="metric-card"><strong>${statuses.candidate || 0}</strong><span>candidate entries</span></article>
    <article class="metric-card"><strong>${manifest.version}</strong><span>manifest version</span></article>
  `;

  document.getElementById('home-categories').innerHTML = [
    ['brand', './brand/index.html', 'logo · symbol · favicon · app icon'],
    ['worker-host', './brand/worker-host/index.html', 'sub-brand logo · favicon · app icon · tokens'],
    ['agents', './assets-index.md', 'worker agent · persona assets'],
    ['product-logos', './product-logos/index.html', '2024 product set · legacy product set'],
    ['footer', './footer/index.html', 'attribution logos'],
    ['web', './brand/index.html', 'homepage logo variants'],
    ['css', './docs/asset-usage.md', 'candidate design tokens'],
    ['ui-patterns', './assets-index.md', 'background · divider']
  ].map(([key, href, text]) => `
    <article class="card category-card">
      <h3><a href="${href}">${key}</a></h3>
      <p>${text}</p>
      <div class="category-card__meta">
        <span class="mono">entries: ${counts[key] || 0}</span>
        <span class="badge candidate">${manifest.status}</span>
      </div>
    </article>
  `).join('');

  const featured = [
    [byPath(assets, '/brand/dreamlabs/logos/dreamlabs-logo-color.png'), 'Color Logo', 'DreamLabs 기본 컬러 로고 후보'],
    [byPath(assets, '/brand/dreamlabs/logos/dreamlabs-symbol-color.png'), 'Color Symbol', 'DreamLabs 심볼 후보'],
    [byPath(assets, '/brand/worker-host/logos/worker-host-logo.svg'), 'Worker Host Logo', 'Worker Host 서브브랜드 로고 후보'],
    [byPath(assets, '/brand/worker-host/app-icons/worker-host-app-icon-512.png'), 'Worker Host App Icon', 'Worker Host app icon 후보'],
    [byPath(assets, '/agents/dreamlabs-worker/icon/dreamlabs-bot-icon.png'), 'Worker Agent Icon', 'DreamLabs worker agent 공식 asset'],
    [byPath(assets, '/brand/dreamlabs/app-icons/dreamlabs-app-icon-512.png'), 'App Icon 512', 'resized app icon 후보'],
    [byPath(assets, '/brand/dreamlabs/product-logos/wcms.png'), 'WCMS Product Logo', '2024 product logo 후보']
  ].filter(([asset]) => asset);
  document.getElementById('home-featured').innerHTML = featured.map(([asset, title, description]) => assetCard(asset, { title, description })).join('');
}

function renderBrand(assets) {
  const cards = [
    [byPath(assets, '/brand/dreamlabs/logos/dreamlabs-logo-color.png'), 'Color Logo', '기본 컬러 로고 후보'],
    [byPath(assets, '/brand/dreamlabs/logos/dreamlabs-logo-black.png'), 'Black Logo', '밝은 배경용 단색 로고 후보'],
    [byPath(assets, '/brand/dreamlabs/logos/dreamlabs-logo-white.png'), 'White Logo', '어두운 배경용 단색 로고 후보', 'preview--dark'],
    [byPath(assets, '/brand/dreamlabs/logos/dreamlabs-symbol-color.png'), 'Color Symbol', '심볼 단독 후보'],
    [byPath(assets, '/brand/dreamlabs/app-icons/dreamlabs-app-icon-512.png'), 'App Icon 512', '아이콘 후보'],
    [byPath(assets, '/brand/dreamlabs/favicon/favicon-32.png'), 'Favicon 32', '브라우저 favicon 후보'],
    [byPath(assets, '/brand/dreamlabs/web/dreamlabs-logo-gray.png'), 'Homepage Gray Logo', '2023 renewal 로고 후보'],
    [byPath(assets, '/brand/worker-host/logos/worker-host-logo.svg'), 'Worker Host Logo', '서브브랜드 로고 후보'],
    [byPath(assets, '/brand/worker-host/favicon/favicon-32.png'), 'Worker Host Favicon 32', '서브브랜드 favicon 후보'],
    [byPath(assets, '/ui-patterns/backgrounds/dreamlabs-grid-subtle.svg'), 'Grid Pattern', 'UI pattern 후보']
  ].filter(([asset]) => asset);
  document.getElementById('brand-featured-grid').innerHTML = cards.map(([asset, title, description, previewClass]) => assetCard(asset, { title, description, previewClass })).join('');

  const refs = [
    ['Color logo', '/brand/dreamlabs/logos/dreamlabs-logo-color.png'],
    ['Black logo', '/brand/dreamlabs/logos/dreamlabs-logo-black.png'],
    ['White logo', '/brand/dreamlabs/logos/dreamlabs-logo-white.png'],
    ['Symbol', '/brand/dreamlabs/logos/dreamlabs-symbol-color.png'],
    ['Favicon ICO', '/brand/dreamlabs/favicon/favicon.ico'],
    ['App icon 512', '/brand/dreamlabs/app-icons/dreamlabs-app-icon-512.png'],
    ['CSS tokens', '/css/dreamlabs-tokens.css'],
    ['JSON tokens', '/css/dreamlabs-tokens.json'],
    ['Worker Host inspection', '/brand/worker-host/index.html'],
    ['Worker Host logo', '/brand/worker-host/logos/worker-host-logo.svg'],
    ['Worker Host favicon', '/brand/worker-host/favicon/favicon.ico'],
    ['Worker Host tokens', '/css/worker-host-tokens.css']
  ];
  document.getElementById('brand-reference-list').innerHTML = refs.map(([label, path]) => `
    <article class="card">
      <strong>${label}</strong>
      <div class="mono">${path}</div>
    </article>
  `).join('');
}

function renderWorkerHost(assets) {
  const cards = [
    [byPath(assets, '/brand/worker-host/logos/worker-host-logo.svg'), 'Worker Host Logo', '밝은 배경용 horizontal logo 후보'],
    [byPath(assets, '/brand/worker-host/logos/worker-host-logo-white.svg'), 'Worker Host White Logo', '어두운 배경용 horizontal logo 후보', 'preview--worker-dark'],
    [byPath(assets, '/brand/worker-host/logos/worker-host-symbol.svg'), 'Worker Host Symbol', '편집 가능한 SVG symbol 후보'],
    [byPath(assets, '/brand/worker-host/app-icons/worker-host-app-icon-512.png'), 'App Icon 512', 'Worker Host app icon 후보'],
    [byPath(assets, '/brand/worker-host/favicon/favicon-32.png'), 'Favicon 32', 'Worker Host favicon 후보'],
    [byPath(assets, '/brand/worker-host/web/worker-host-og.svg'), 'Social Card', 'Worker Host OG/social preview 후보'],
    [byPath(assets, '/css/worker-host-tokens.css'), 'CSS Tokens', 'Worker Host CSS token 후보'],
    [byPath(assets, '/css/worker-host-tokens.json'), 'JSON Tokens', 'Worker Host JSON token 후보']
  ].filter(([asset]) => asset);
  document.getElementById('worker-host-featured-grid').innerHTML = cards.map(([asset, title, description, previewClass]) => {
    if (asset.category === 'css') return fileCard(asset, title, description);
    return assetCard(asset, { title, description, previewClass });
  }).join('');

  const refs = [
    ['Inspection page', '/brand/worker-host/index.html'],
    ['Color logo', '/brand/worker-host/logos/worker-host-logo.svg'],
    ['White logo', '/brand/worker-host/logos/worker-host-logo-white.svg'],
    ['Symbol', '/brand/worker-host/logos/worker-host-symbol.svg'],
    ['Favicon ICO', '/brand/worker-host/favicon/favicon.ico'],
    ['App icon 512', '/brand/worker-host/app-icons/worker-host-app-icon-512.png'],
    ['Social card', '/brand/worker-host/web/worker-host-og.svg'],
    ['CSS tokens', '/css/worker-host-tokens.css'],
    ['JSON tokens', '/css/worker-host-tokens.json']
  ];
  document.getElementById('worker-host-reference-list').innerHTML = refs.map(([label, path]) => `
    <article class="card">
      <strong>${label}</strong>
      <div class="mono">${path}</div>
    </article>
  `).join('');
}

function renderProducts(assets) {
  const products = assets
    .filter((asset) => asset.category === 'product-logos')
    .sort((a, b) => a.path.localeCompare(b.path));
  document.getElementById('product-grid').innerHTML = products.map((asset) => assetCard(asset, {
    title: asset.path.split('/').pop().replace('.png', '').toUpperCase(),
    description: asset.usage.includes('legacy') ? 'legacy product logo 후보' : '2024 product logo 후보',
    cardClass: 'product-card'
  })).join('');
}

function renderFooter(assets) {
  const footerAssets = assets.filter((asset) => asset.category === 'footer').sort((a, b) => a.path.localeCompare(b.path));
  document.getElementById('footer-asset-grid').innerHTML = footerAssets.map((asset) => assetCard(asset, {
    title: asset.path.split('/').pop(),
    description: 'footer attribution 후보'
  })).join('');

  const defaultLogo = byPath(assets, '/footer/dreamlabs/dreamlabs-logo-default.png');
  const whiteLogo = byPath(assets, '/brand/dreamlabs/logos/dreamlabs-logo-white.png');
  document.getElementById('footer-surface-preview').innerHTML = `
    <div class="surface">
      <strong>Light surface</strong>
      <div class="surface__logos">
        <img src="${assetUrl(defaultLogo.path)}" alt="DreamLabs footer logo">
      </div>
    </div>
    <div class="surface surface--dark">
      <strong>Dark surface</strong>
      <div class="surface__logos">
        <img src="${assetUrl(whiteLogo.path)}" alt="DreamLabs footer dark logo">
      </div>
    </div>
  `;
}

function renderError(error) {
  const target = document.getElementById('page-error');
  if (!target) return;
  target.innerHTML = `<article class="card error-card"><strong>manifest load failed</strong><p>${String(error.message || error)}</p></article>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const manifest = await loadManifest();
    const assets = manifest.assets || [];
    const page = document.body.dataset.page;
    if (page === 'home') renderHome(manifest, assets);
    if (page === 'brand') renderBrand(assets);
    if (page === 'worker-host') renderWorkerHost(assets);
    if (page === 'products') renderProducts(assets);
    if (page === 'footer') renderFooter(assets);
  } catch (error) {
    renderError(error);
  }
});
