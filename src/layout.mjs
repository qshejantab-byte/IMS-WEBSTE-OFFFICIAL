import { site, contact, productList, services, nav, primaryCta } from './config.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Relative-URL helper so the site works from any folder (e.g. /ims/ on XAMPP).
export function makeCtx(page) {
  const segs = page.path.split('/').filter(Boolean);
  const depth = page.file ? 0 : segs.length;
  const up = depth === 0 ? './' : '../'.repeat(depth);
  const url = (target) => {
    if (/^(https?:|mailto:|tel:|#)/.test(target)) return target;
    const t = target.startsWith('/') ? target.slice(1) : target;
    return up + t;
  };
  return { up, url, asset: (p) => up + p, page };
}

export const arrow = '<svg class="arr" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
export const arrowDown = '<svg class="arr" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 2v11M3.5 9 8 13.5 12.5 9" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
export const statusTag = (s) => `<span class="tag ${s === 'Available' ? 'tag--live' : 'tag--soon'}">${s}</span>`;

// ─── <head> ──────────────────────────────────────────────────────────────
export function head(page, ctx) {
  const title = page.title === site.name ? `${site.name}: ${site.legalName}` : `${page.title} | ${site.name}`;
  const base = site.siteUrl ? site.siteUrl.replace(/\/$/, '') : '';
  const canonical = base ? `<link rel="canonical" href="${base}${page.path}">` : '';
  const ogUrl = base ? `<meta property="og:url" content="${base}${page.path}">` : '';
  const ld = (page.jsonld || []).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
${page.file ? `<base href="${site.basePath}">` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : ''}
${canonical}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}: ${esc(site.legalName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(page.description)}">
${ogUrl}
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#0B1A33">
<link rel="icon" type="image/png" sizes="32x32" href="${ctx.asset('assets/brand/icon-32.png')}">
<link rel="apple-touch-icon" href="${ctx.asset('assets/brand/icon-180.png')}">
<link rel="preload" href="${ctx.asset('fonts/cormorant-garamond.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${ctx.asset('fonts/jost.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ctx.asset('css/site.css')}">
<script>document.documentElement.className='js';setTimeout(function(){if(!window.__imsReady)document.documentElement.classList.add('failsafe')},3500)</script>
${ld}
</head>`;
}

// ─── Brand lockup (original artwork, cropped by CSS only) ────────────────
export function brand(ctx, cls = '') {
  return `<a class="brand ${cls}" href="${ctx.url('/')}" aria-label="IMS, Integrated Management Solutions: home">
<span class="brand__crop"><img src="${ctx.asset('assets/ims logo with words.jpeg').replace(/ /g, '%20')}" alt="" width="1280" height="1141"></span></a>`;
}

// ─── Floating pill header: Products ▾ Services ▾ Company Contact · logo · BarMS Pro · CTA ─
export function header(ctx, active) {
  const trig = (n) => `<li class="nav__item">
  <button class="nav__link nav__trigger${active === n.id ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="mega-${n.mega}" data-mega-trigger>${n.label}<svg class="chev" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
</li>`;
  const links = nav.filter((n) => n.id !== 'home').map((n) => (n.mega ? trig(n)
    : `<li class="nav__item"><a class="nav__link${active === n.id ? ' is-active' : ''}" href="${ctx.url(n.path)}"${active === n.id ? ' aria-current="page"' : ''}>${n.label}</a></li>`)).join('\n');

  const productsMega = `<div class="mega" id="mega-products" hidden data-mega>
    <div class="mega__inner mega__inner--products">
      ${productList.map((p) => `<a class="mega__feat" href="${ctx.url(p.path)}">
        <span class="mega__img"><img src="${ctx.asset(p.poster)}" alt="" loading="lazy" width="540" height="${p.id === 'barms-pro' ? 960 : 360}"></span>
        <span class="mega__body">${statusTag(p.status)}<span class="mega__t">${p.name}</span><span class="mega__l">${p.line}</span><span class="mega__go">${p.status === 'Available' ? 'Explore BarMS Pro' : 'See what is coming'}${arrow}</span></span>
      </a>`).join('')}
    </div>
  </div>`;

  const servicesMega = `<div class="mega" id="mega-services" hidden data-mega>
    <div class="mega__inner mega__inner--services">
      <ul class="mega__list">${services.map((s) => `<li><a href="${ctx.url(s.path)}"><span class="mega__ico mono">${s.n}</span><span class="mega__txt"><span class="mega__t">${s.menu}</span><span class="mega__l">${s.line}</span></span></a></li>`).join('')}</ul>
      <div class="mega__side"><p class="mega__lead">Built to order,<br><em>around you.</em></p><a class="link" href="${ctx.url('/services/')}">All services${arrow}</a></div>
    </div>
  </div>`;

  return `<a class="skip" href="#main">Skip to content</a>
<div class="progress" data-progress aria-hidden="true"></div>
<header class="site-header" data-header>
  <div class="site-header__bar">
    <nav class="nav" aria-label="Primary"><ul class="nav__list">${links}</ul></nav>
    ${brand(ctx)}
    <div class="site-header__r">
      <a class="pill" href="${ctx.url('/products/barms-pro/')}"${active === 'barms' ? ' aria-current="page"' : ''}><span class="pill__dot" aria-hidden="true"></span>BarMS Pro<span class="pill__tag">Available</span></a>
      <a class="btn btn--primary btn--sm site-header__cta" href="${ctx.url(primaryCta.path)}">${primaryCta.label}${arrow}</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav" data-burger><span class="sr-only">Menu</span><span class="burger__bars" aria-hidden="true"></span></button>
    </div>
  </div>
  ${productsMega}
  ${servicesMega}
  <div class="mnav" id="mobile-nav" hidden data-mnav>
    <div class="wrap">
      <ul class="mnav__list">
        <li><a href="${ctx.url('/')}">Home</a></li>
        <li>
          <button class="mnav__acc" type="button" aria-expanded="false" aria-controls="mnav-products" data-mnav-acc>Products<svg class="chev" viewBox="0 0 12 12" width="14" height="14" aria-hidden="true"><path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
          <ul class="mnav__sub" id="mnav-products" hidden>
            ${productList.map((p) => `<li><a href="${ctx.url(p.path)}">${p.name} ${statusTag(p.status)}</a></li>`).join('')}
          </ul>
        </li>
        <li>
          <button class="mnav__acc" type="button" aria-expanded="false" aria-controls="mnav-services" data-mnav-acc>Services<svg class="chev" viewBox="0 0 12 12" width="14" height="14" aria-hidden="true"><path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
          <ul class="mnav__sub" id="mnav-services" hidden>
            <li><a href="${ctx.url('/services/')}">All services</a></li>
            ${services.map((s) => `<li><a href="${ctx.url(s.path)}"><span class="mono">${s.n}</span> ${s.menu}</a></li>`).join('')}
          </ul>
        </li>
        <li><a href="${ctx.url('/company/')}">Company</a></li>
        <li><a href="${ctx.url('/contact/')}">Contact</a></li>
      </ul>
      <a class="btn btn--signal btn--block" href="${ctx.url(primaryCta.path)}">${primaryCta.label}${arrow}</a>
      <ul class="mnav__quick" aria-label="Contact">
        ${contact.phone ? `<li><a href="tel:${esc(contact.phone.replace(/s+/g, ''))}">Call</a></li>` : ''}
        ${contact.whatsapp ? `<li><a href="https://wa.me/${esc(contact.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a></li>` : ''}
        ${contact.email ? `<li><a href="mailto:${esc(contact.email)}">Email</a></li>` : ''}
      </ul>
    </div>
  </div>
</header>`;
}

// Floating actions: a quick enquiry link (after scrolling) and a call button
export function floaters(ctx) {
  const ic = (d) => `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const dock = `<nav class="dock" aria-label="Quick contact">
  ${contact.phone ? `<a href="tel:${esc(contact.phone.replace(/s+/g, ''))}">${ic('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>')}<span>Call</span></a>` : ''}
  ${contact.whatsapp ? `<a href="https://wa.me/${esc(contact.whatsapp)}" target="_blank" rel="noopener">${ic('<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/>')}<span>WhatsApp</span></a>` : ''}
  <a class="dock__main" href="${ctx.url(primaryCta.path)}">${ic('<path d="M4 6h16v12H4zM4 7l8 6 8-6"/>')}<span>Enquire</span></a>
</nav>`;
  return `${dock}
<a class="fab fab--talk" data-fab href="${ctx.url(primaryCta.path)}">Let’s talk${arrow}</a>
${contact.whatsapp ? `<a class="fab fab--call" href="https://wa.me/${esc(contact.whatsapp)}" target="_blank" rel="noopener" aria-label="Chat with IMS on WhatsApp"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 8.5c.3 3 3.4 6 6.5 6.5l1.2-1.5-2.2-1-1 .9c-1.2-.5-2.4-1.7-2.9-2.9l.9-1-1-2.2L9 8.5Z" fill="currentColor"/></svg></a>` : ''}`;
}

// ─── Footer: a closing line, one directory row, legal ──────────────────────
export function footer(ctx) {
  const social = Object.entries(contact.social).filter(([, v]) => v)
    .map(([k, v]) => `<li><a href="${esc(v)}" rel="noopener" target="_blank">${k[0].toUpperCase() + k.slice(1)}</a></li>`).join('');
  const tel = (n) => n.replace(/\s+/g, '');
  return `<footer class="ft is-dark">
  <div class="wrap ft__top">
    <h2 class="ft__title">Have a business challenge <em>worth solving?</em></h2>
    <a class="btn btn--signal btn--lg" data-magnet href="${ctx.url(primaryCta.path)}">${primaryCta.label}${arrow}</a>
  </div>
  <div class="wrap ft__grid">
    <a class="ft__logo" href="${ctx.url('/')}" aria-label="IMS, Integrated Management Solutions: home"><span class="brand__crop"><img src="${ctx.asset('assets/ims logo with words.jpeg').replace(/ /g, '%20')}" alt="" width="1280" height="1141" loading="lazy"></span></a>
    <ul class="ft__list" aria-label="Contact">
      ${contact.email ? `<li><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></li>` : ''}
      ${contact.phone ? `<li><a href="tel:${esc(tel(contact.phone))}">${esc(contact.phone)}</a></li>` : ''}
      ${contact.phone2 ? `<li><a href="tel:${esc(tel(contact.phone2))}">${esc(contact.phone2)}</a></li>` : ''}
      ${contact.whatsapp ? `<li><a href="https://wa.me/${esc(contact.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a></li>` : ''}
      ${contact.address ? `<li>${esc(contact.address)}</li>` : ''}${contact.hours ? `<li>${esc(contact.hours)}</li>` : ''}
    </ul>
    <nav aria-label="Footer">
      <ul class="ft__list ft__list--nav">
        <li><a href="${ctx.url('/products/barms-pro/')}">BarMS Pro</a></li>
        <li><a href="${ctx.url('/products/hms/')}">HMS</a></li>
        <li><a href="${ctx.url('/services/')}">Services</a></li>
        <li><a href="${ctx.url('/company/')}">Company</a></li>
        <li><a href="${ctx.url('/support/')}">Support</a></li>
        <li><a href="${ctx.url('/contact/')}">Contact</a></li>
        ${social}
      </ul>
    </nav>
  </div>
  <div class="wrap ft__base">
    <p>© ${site.year} ${esc(site.name)}: ${esc(site.legalName)}</p>
    <ul>
      <li><a href="${ctx.url('/privacy/')}">Privacy</a></li>
      <li><a href="${ctx.url('/terms/')}">Terms</a></li>
      <li><a href="${ctx.url('/credits/')}">Credits</a></li>
    </ul>
  </div>
</footer>`;
}

// ─── Reusable blocks ─────────────────────────────────────────────────────
export function sectionHead({ n, label, title, lead, tag = 'h2' }) {
  return `<header class="sec-head rv">
  <p class="mono sec-head__label">${n ? `<span>${n}</span> ` : ''}${label}</p>
  <${tag} class="sec-head__title">${title}</${tag}>
  ${lead ? `<p class="sec-head__lead">${lead}</p>` : ''}
</header>`;
}

export function accordion(items, id) {
  return `<div class="acc" data-acc>
${items.map((it, i) => `  <div class="acc__item">
    <h3 class="acc__h"><button class="acc__btn" type="button" aria-expanded="false" aria-controls="${id}-${i}" id="${id}-b${i}"><span>${it.q}</span><span class="acc__ico" aria-hidden="true"></span></button></h3>
    <div class="acc__panel" id="${id}-${i}" role="region" aria-labelledby="${id}-b${i}"><div><p>${it.a}</p></div></div>
  </div>`).join('\n')}
</div>`;
}

export function enquiryHref(ctx, topic) {
  return ctx.url(`/contact/?topic=${topic}`);
}

// ─── Document wrapper ────────────────────────────────────────────────────
export function renderDocument(page) {
  const ctx = makeCtx(page);
  const body = page.body(ctx);
  const scripts = [`<script src="${ctx.asset('js/site.js')}" defer></script>`, `<script src="${ctx.asset('js/fx.js')}" defer></script>`]
    .concat((page.scripts || []).map((s) => `<script src="${ctx.asset(`js/${s}.js`)}" defer></script>`))
    .join('\n');
  return `${head(page, ctx)}
<body class="${page.bodyClass || ''}">
${header(ctx, page.nav)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(ctx)}
${floaters(ctx)}
${scripts}
</body>
</html>
`;
}
