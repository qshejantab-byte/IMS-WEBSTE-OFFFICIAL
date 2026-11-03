import { services } from '../config.mjs';
import { art } from '../art.mjs';
import { arrow, enquiryHref, statusTag } from '../layout.mjs';
import { icon, widgets } from './widgets.mjs';

const detail = {
  ai: { art: 'agents', lead: 'Agents that read what is happening, prepare the next step, and ask a person to approve what matters.', tags: ['Inside your systems', 'Custom agents', 'Standalone agents', 'Process automation'], note: 'A person approves anything that matters, and what an agent did is always traceable.' },
  software: { art: 'software', lead: 'When off-the-shelf software forces you to change your process, we build the application that fits it.', tags: ['Business applications', 'Management systems', 'Software platforms', 'Built and maintained by IMS'], note: 'BarMS Pro is built this way: connected modules, one set of data, approvals and an audit trail.' },
  integrations: { art: 'integrations', lead: 'We connect the applications, APIs and data you depend on, so work is entered once and used everywhere.', tags: ['API integrations', 'Third-party software', 'Data synchronisation', 'Workflow connections'], note: 'BarMS Pro works on its own today. Connections to accounting, payment providers, RRA EBM or hotel systems are scoped separately.' },
  digital: { art: 'digital', lead: 'Business websites, online stores and customer platforms that explain what you do and make the next step easy.', tags: ['Business websites', 'Online stores', 'Customer platforms', 'Enquiry and ordering flows'] },
  care: { art: 'care', lead: 'Launching is the start. We keep what you run fast, secure and improving.', tags: ['Performance', 'Maintenance and support', 'Security and updates', 'Continuous development'] },
};
const theme = ['dark', 'light', 'deep', 'light2', 'dark'];

/* ── /services/ ── */
export const servicesPage = {
  path: '/services/', nav: 'services', bodyClass: 'page-services',
  title: 'Services: AI, software, integrations, websites and continuous care',
  description: 'IMS technology and digital services: AI and intelligent agents, custom software, systems and integrations, websites and e-commerce, and continuous care.',
  body(ctx) {
    return `
<section class="pg sv is-dark">
  <div class="wrap sv__in">
    <div class="sv__head">
      <p class="mono pg__eyebrow">Services</p>
      <h1 class="pg__title" data-split>Built to order. <em>Built around you.</em></h1>
      <p class="pg__lead">Five services. Each quoted for your project.</p>
    </div>
    <ol class="sl" data-peek>
      ${services.map((s, i) => `<li class="sl__row"><a href="#${s.id}" data-i="${i}"><span class="mono sl__n">${s.n}</span><span class="sl__name">${s.name}</span><span class="sl__go" aria-hidden="true">${arrow}</span></a></li>`).join('')}
    </ol>
    <div class="sl__peek" aria-hidden="true">${services.map((s, i) => `<div class="sl__art" data-i="${i}">${art[detail[s.id].art]()}</div>`).join('')}</div>
  </div>
</section>
<div class="stack">
${services.map((s, i) => {
    const d = detail[s.id];
    const dark = theme[i] === 'dark' || theme[i] === 'deep';
    return `<section class="ch ch--${theme[i]}${dark ? ' is-dark' : ''}" id="${s.id}" aria-labelledby="${s.id}-t">
  <div class="wrap ch__grid">
    <div class="ch__copy">
      <p class="ch__num" aria-hidden="true">${s.n}</p>
      <h2 class="ch__name rv" id="${s.id}-t">${s.name}</h2>
      <p class="ch__lead rv">${d.lead}</p>
      <ul class="ch__tags rv">${d.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      ${d.note ? `<p class="ch__note rv">${d.note}</p>` : ''}
      <p class="rv"><a class="btn ${dark ? 'btn--signal' : 'btn--primary'}" data-magnet href="${enquiryHref(ctx, s.topic)}">${s.cta}${arrow}</a></p>
    </div>
    <div class="ch__vis rv">
      <div class="ch__art" aria-hidden="true">${art[d.art]()}</div>
      <div class="ch__wid">${icon(s.id)}${widgets[s.id]}</div>
    </div>
  </div>
</section>`;
  }).join('')}
</div>`;
  },
};

/* ── /products/: two doors ── */
export const productsPage = {
  path: '/products/', nav: 'products', bodyClass: 'page-products',
  title: 'Products: BarMS Pro and HMS',
  description: 'IMS products: BarMS Pro, a bar and restaurant management system available now, and HMS, a Hotel & Resort Management System, coming soon.',
  body(ctx) {
    return `
<h1 class="sr-only">IMS products</h1>
<section class="doors">
  <a class="door door--barms is-dark" href="${ctx.url('/products/barms-pro/')}">
    <canvas class="net" data-field aria-hidden="true"></canvas>
    <span class="door__phones" aria-hidden="true">
      <img class="door__ph door__ph--a" src="${ctx.asset('assets/media/barms/poster-one-system.webp')}" alt="" width="540" height="960">
      <img class="door__ph door__ph--b" src="${ctx.asset('assets/media/barms/poster-kitchen.webp')}" alt="" width="540" height="960">
      <img class="door__ph door__ph--c" src="${ctx.asset('assets/media/barms/poster-offline.webp')}" alt="" width="540" height="960">
    </span>
    <span class="door__copy">
      ${statusTag('Available')}
      <h2 class="door__name">BarMS Pro</h2>
      <p class="door__line">The whole bar, in one connected system.</p>
      <span class="btn btn--signal">Explore BarMS Pro${arrow}</span>
    </span>
  </a>
  <a class="door door--hms is-dark" href="${ctx.url('/products/hms/')}">
    <img class="door__bg" src="${ctx.asset('assets/media/stock/hms-palm-hotel.webp')}" alt="Stock photograph: a pale hotel building among palm trees." width="1600" height="1067">
    <span class="door__shade" aria-hidden="true"></span>
    <span class="door__copy">
      ${statusTag('Coming soon')}
      <h2 class="door__name">HMS</h2>
      <p class="door__line">Hotel &amp; Resort Management System.</p>
      <span class="btn btn--ghost">Join the waiting list${arrow}</span>
    </span>
  </a>
</section>`;
  },
};
