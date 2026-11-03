import { services, productList, primaryCta } from '../config.mjs';
import { arrow } from '../layout.mjs';
import { art } from '../art.mjs';
import { productPanels } from './shared.mjs';
import { icon, widgets, text } from './widgets.mjs';

const cards = [
  { kind: 'phone', name: 'BarMS Pro', tag: 'Available', path: '/products/barms-pro/', img: 'assets/media/barms/poster-one-system.webp' },
  { kind: 'wide', name: 'HMS', tag: 'Coming soon', path: '/products/hms/', img: 'assets/media/stock/hms-endless-water.webp' },
  { kind: 'art', name: 'AI & Agents', tag: 'Service', path: '/services/#ai', art: art.agents() },
  { kind: 'phone', name: 'BarMS Pro', tag: 'Kitchen', path: '/products/barms-pro/', img: 'assets/media/barms/poster-kitchen.webp' },
  { kind: 'art', name: 'Custom Software', tag: 'Service', path: '/services/#software', art: art.software() },
  { kind: 'wide', name: 'HMS', tag: 'Coming soon', path: '/products/hms/', img: 'assets/media/stock/hms-restaurant-dusk.webp' },
  { kind: 'art', name: 'Integrations', tag: 'Service', path: '/services/#integrations', art: art.integrations() },
  { kind: 'phone', name: 'BarMS Pro', tag: 'Offline selling', path: '/products/barms-pro/', img: 'assets/media/barms/poster-offline.webp' },
  { kind: 'art', name: 'Websites & Commerce', tag: 'Service', path: '/services/#digital', art: art.digital() },
  { kind: 'wide', name: 'HMS', tag: 'Coming soon', path: '/products/hms/', img: 'assets/media/stock/hms-infinity-pool.webp' },
  { kind: 'art', name: 'Continuous Care', tag: 'Service', path: '/services/#care', art: art.care() },
  { kind: 'phone', name: 'BarMS Pro', tag: 'Stay connected', path: '/products/barms-pro/', img: 'assets/media/barms/poster-owner.webp' },
];

export const home = {
  path: '/',
  nav: 'home',
  title: 'IMS',
  description: 'IMS (Integrated Management Solutions) makes BarMS Pro, a bar and restaurant management system, and builds custom software, AI agents, integrations, websites and digital platforms.',
  bodyClass: 'page-home',
  jsonld: [{
    '@context': 'https://schema.org', '@type': 'Organization', name: 'IMS', alternateName: 'Integrated Management Solutions',
    description: 'Business management software, custom software, AI agents, systems integration, websites and digital commerce.',
    email: 'info@ims.rw', telephone: ['+250785308501', '+250791458795'],
  }],
  body(ctx) {
    const chips = [
      ...productList.map((p) => `<li><a href="${ctx.url(p.path)}">${p.name}${p.status === 'Available' ? '<span class="chip__dot" aria-hidden="true"></span>' : '<small>Soon</small>'}</a></li>`),
      ...services.map((s) => `<li><a href="${ctx.url(s.path)}">${s.menu}</a></li>`),
    ].join('');
    const ticker = ['Business systems', 'Point of sale', 'AI agents', 'Custom software', 'Integrations', 'Websites', 'E-commerce', 'Continuous care'];
    const tk = ticker.map((t) => `<span>${t}</span>`).join('<i aria-hidden="true">◆</i>');

    return `
<section class="hero3 is-dark" aria-labelledby="hero-title">
  <canvas class="net" data-field aria-hidden="true"></canvas>
  <div class="hero3__veil" aria-hidden="true"></div>
  <div class="wrap hero3__in">
    <a class="hero2__chip" href="${ctx.url('/products/barms-pro/')}"><span class="chip__dot" aria-hidden="true"></span>BarMS Pro is available now<span class="hero2__chip-go">See it${arrow}</span></a>
    <h1 class="hero3__title" id="hero-title" data-split>Technology that moves your business <em>forward.</em></h1>
    <p class="hero2__lead">BarMS Pro, software, AI and digital solutions for your business.</p>
    <div class="hero2__cta">
      <a class="btn btn--signal btn--lg" data-magnet href="${ctx.url(primaryCta.path)}">${primaryCta.label}${arrow}</a>
      <a class="btn btn--ghost btn--lg" data-magnet href="${ctx.url('/products/barms-pro/')}">See BarMS Pro${arrow}</a>
    </div>
  </div>
  <div class="arc" data-arc aria-hidden="true">
    ${cards.map((c) => `<a class="arc__card arc__card--${c.kind}" href="${ctx.url(c.path)}" tabindex="-1">${c.img ? `<img src="${ctx.asset(c.img)}" alt="" ${c.kind === 'phone' ? 'width="540" height="960"' : 'width="1600" height="1067"'} decoding="async">` : `<span class="arc__art">${c.art}</span>`}<span class="arc__label"><b>${c.name}</b><i>${c.tag}</i></span></a>`).join('')}
  </div>
</section>

<div class="ticker" aria-hidden="true"><div class="ticker__track">${tk}<i>◆</i>${tk}<i>◆</i>${tk}<i>◆</i>${tk}</div></div>

<section class="sec sec--paper statement2" id="statement">
  <div class="wrap">
    <p class="mono sec-head__label sec-head__label--c rv">What we do</p>
    <p class="statement2__text" data-fill>We build the systems your business runs on, and keep them working.</p>
  </div>
</section>

<section class="sec sec--bone" id="products" aria-labelledby="products-title">
  <div class="wrap">
    <header class="sec-head sec-head--c rv"><p class="mono sec-head__label">Products</p><h2 class="sec-head__title" id="products-title">Software you can use today.</h2></header>
    ${productPanels(ctx)}
  </div>
</section>

<section class="sec sec--paper" id="services" aria-labelledby="services-title">
  <div class="wrap">
    <header class="sec-head sec-head--c rv"><p class="mono sec-head__label">Services</p><h2 class="sec-head__title" id="services-title">Built to order. <em>Built around you.</em></h2><p class="sec-head__lead">Five services, each quoted for your project.</p></header>
    <div class="bento">
      ${services.map((s) => `<a class="bento__card bento__card--${s.id} fx-card rv" href="${ctx.url(s.path)}">
        ${icon(s.id)}
        <h3>${s.name}</h3>
        <p>${text[s.id]}</p>
        ${widgets[s.id]}
        <span class="bento__more">Learn more${arrow}</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="sec sec--bone" aria-labelledby="how-title">
  <div class="wrap">
    <header class="sec-head sec-head--c rv"><p class="mono sec-head__label">How it works</p><h2 class="sec-head__title" id="how-title">Three steps, and we are on it.</h2></header>
    <ol class="tl" data-timeline>
      <li class="tl__step rv">
        <div class="tl__copy"><span class="tl__n">1</span><p class="mono">Step 01</p><h3>You tell us the problem</h3><p>A short enquiry is enough.</p></div>
        <div class="tl__card" aria-hidden="true"><p class="tl__t">New enquiry</p><div class="tl__field">What do you need?</div><ul class="tl__opts"><li class="on">Software</li><li>AI agents</li><li>Website</li><li>Integration</li></ul><div class="tl__btn">Send enquiry</div></div>
      </li>
      <li class="tl__step tl__step--r rv">
        <div class="tl__copy"><span class="tl__n">2</span><p class="mono">Step 02</p><h3>We talk it through</h3><p>An honest view of what fits.</p></div>
        <div class="tl__card" aria-hidden="true"><p class="tl__t">Consultation</p><ul class="tl__rows"><li>Your process today</li><li>What could change</li><li>What is not worth building</li></ul></div>
      </li>
      <li class="tl__step rv">
        <div class="tl__copy"><span class="tl__n">3</span><p class="mono">Step 03</p><h3>You receive a quotation</h3><p>Written by a person, for your project.</p></div>
        <div class="tl__card" aria-hidden="true"><p class="tl__t">Quotation</p><div class="tl__lines"><i></i><i></i><i class="s"></i><i></i><i class="s"></i></div><div class="tl__stamp">Prepared by a person</div></div>
      </li>
    </ol>
  </div>
</section>

<section class="sec sec--paper" aria-labelledby="sys-title">
  <div class="wrap">
    <header class="sec-head sec-head--c rv"><p class="mono sec-head__label">Integrations</p><h2 class="sec-head__title" id="sys-title">Works with the systems you already run.</h2><p class="sec-head__lead">The kinds of systems we connect.</p></header>
    <ul class="tiles">
      ${[['POS', 'Point of sale'], ['XLS', 'Spreadsheets'], ['ACC', 'Accounting'], ['CRM', 'Customer records'], ['WEB', 'Websites'], ['PAY', 'Payments'], ['MSG', 'Messaging'], ['MAIL', 'Email & calendar']].map((t, i) => `<li class="tiles__item fx-card rv" data-d="${i % 4}"><span class="mono">${t[0]}</span>${t[1]}</li>`).join('')}
      <li class="tiles__item tiles__item--more rv"><span class="mono">+</span>And more</li>
    </ul>
  </div>
</section>

<section class="sec sec--end is-dark why" aria-labelledby="why-title">
  <div class="wrap">
    <header class="sec-head sec-head--c rv"><p class="mono sec-head__label">Why IMS</p><h2 class="sec-head__title" id="why-title">Built to be <em>relied on.</em></h2></header>
    <ul class="why__grid">
      <li class="rv"><span>01</span><h3>Integrated by design.</h3><p>Systems share one set of data, so work is recorded once and used wherever it matters.</p></li>
      <li class="rv" data-d="1"><span>02</span><h3>People stay in control.</h3><p>Where a decision matters, a person approves it, and the record shows who and when.</p></li>
      <li class="rv" data-d="2"><span>03</span><h3>Honest about today.</h3><p>We say what a product does now, what needs custom work, and what is not available.</p></li>
    </ul>
  </div>
</section>`;
  },
};
