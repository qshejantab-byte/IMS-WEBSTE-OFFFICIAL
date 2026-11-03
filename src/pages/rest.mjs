import { contact, productList, services } from '../config.mjs';
import { arrow, enquiryHref, statusTag } from '../layout.mjs';

const tel = (n) => n.replace(/\s+/g, '');
const draftBanner = '<p class="draft mono">Draft for legal review. This text must be reviewed and approved by IMS’s legal adviser before launch.</p>';
const doc = (title) => `<header class="doc__head"><div class="wrap"><h1 class="doc__title">${title}</h1></div></header>`;

/* ── Company ── */
export const company = {
  path: '/company/', nav: 'company', bodyClass: 'page-company',
  title: 'About IMS: Integrated Management Solutions',
  description: 'IMS is a technology company that makes BarMS Pro and builds custom software, AI agents, integrations and digital platforms. How we work, and how we approach claims.',
  body(ctx) {
    const trust = [
      ['No invented proof', 'No certifications, audits, uptime guarantees or customer claims are made here. We publish them when they exist and can be verified.'],
      ['Customer stories', 'Published only with the customer’s agreement and verified facts. None yet. The best proof of BarMS Pro is seeing it run.'],
      ['Personal logins', 'BarMS Pro gives everyone their own login, with lockout after five wrong passwords and sign-out after 10 idle minutes.'],
      ['Server-side permissions', 'Every permission is checked on the server, on every action. Hiding a button is only for convenience.'],
      ['Approved devices', 'IMS approves a device before it reaches a business’s data, and can block one that is lost.'],
      ['Audit log and backups', 'Key actions are recorded. Daily backups are verified, and the latest 14 are kept.'],
    ];
    return `
<section class="pg co is-dark">
  <div class="co__orbit" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="wrap co__in">
    <p class="mono pg__eyebrow">Company</p>
    <h1 class="co__title" data-split><span class="co__ln"><b>I</b>ntegrated</span> <span class="co__ln"><b>M</b>anagement</span> <span class="co__ln"><b>S</b>olutions</span></h1>
    <p class="co__lead">Software, AI and digital technology for organisations that need their systems to work as one.</p>
    <a class="hero2__scroll mono" href="#statement" aria-label="Scroll to the next section"><span>Scroll</span><i aria-hidden="true"></i></a>
  </div>
</section>

<section class="sec sec--paper statement2" id="statement">
  <div class="wrap">
    <p class="mono sec-head__label sec-head__label--c rv">Who we are</p>
    <p class="statement2__text" data-fill>We make software, and we build technology to order. We are straightforward about what it does.</p>
  </div>
</section>

<section class="sec sec--bone">
  <div class="wrap">
    <header class="sec-head sec-head--c rv"><p class="mono sec-head__label">How we work</p><h2 class="sec-head__title">Three commitments.</h2></header>
    <ul class="pc">
      <li class="pc__card fx-card rv"><span>01</span><h3>Integrated by design.</h3><p>Systems share one set of data, so work is recorded once and used wherever it matters.</p></li>
      <li class="pc__card fx-card rv" data-d="1"><span>02</span><h3>People stay in control.</h3><p>Where a decision matters, a person approves it, and the record shows who and when.</p></li>
      <li class="pc__card fx-card rv" data-d="2"><span>03</span><h3>Honest about today.</h3><p>We say what a product does now, what needs custom work, and what is not available.</p></li>
    </ul>
  </div>
</section>

<section class="sec sec--paper">
  <div class="wrap">
    <header class="sec-head sec-head--c rv"><p class="mono sec-head__label">At a glance</p><h2 class="sec-head__title">Products and <em>services.</em></h2></header>
    <div class="glance">
      <div class="glance__col fx-card rv">
        <p class="mono">Products</p>
        <ul>${productList.map((p) => `<li><a href="${ctx.url(p.path)}"><span>${p.name}</span>${statusTag(p.status)}</a></li>`).join('')}</ul>
      </div>
      <div class="glance__col fx-card rv" data-d="1">
        <p class="mono">Services</p>
        <ul>${services.map((s) => `<li><a href="${ctx.url(s.path)}"><span>${s.menu}</span><i aria-hidden="true">${arrow}</i></a></li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--end is-dark" id="trust">
  <div class="wrap">
    <header class="sec-head sec-head--c rv"><p class="mono sec-head__label">Trust</p><h2 class="sec-head__title">No badges we have <em>not earned.</em></h2></header>
    <ul class="tr3">${trust.map((t, i) => `<li class="tr3__card fx-card rv" data-d="${i % 3}"><span class="mono">${String(i + 1).padStart(2, '0')}</span><h3>${t[0]}</h3><p>${t[1]}</p></li>`).join('')}</ul>
    <p class="tr3__fine rv">BarMS Pro controls are as documented in the System Guide, version 1.0. This website sets no tracking cookies. <a href="${ctx.url('/privacy/')}">Privacy</a></p>
  </div>
</section>`;
  },
};

/* ── Support ── */
export const support = {
  path: '/support/', nav: 'support', bodyClass: 'page-support',
  title: 'Support for IMS customers',
  description: 'Support for IMS customers: help inside the product, onboarding, device approval and how to reach us.',
  body(ctx) {
    return `
<section class="pg sp is-dark">
  <div class="wrap sp__in">
    <p class="mono pg__eyebrow">Support</p>
    <h1 class="pg__title" data-split>How can we <em>help?</em></h1>
    <ul class="sp__tiles">
      <li class="sp__tile fx-card rv">
        <span class="mono">01</span><h2>In the product</h2>
        <p>BarMS Pro has a Help &amp; Support page, and a System Health area with self-checks and incident references.</p>
      </li>
      <li class="sp__tile fx-card rv" data-d="1">
        <span class="mono">02</span><h2>Raise a request</h2>
        <p>Tell us what you see. A person reads every request.</p>
        <a class="btn btn--signal" data-magnet href="${enquiryHref(ctx, 'support')}">Open a request${arrow}</a>
      </li>
      <li class="sp__tile fx-card rv" data-d="2">
        <span class="mono">03</span><h2>Call or chat</h2>
        <ul class="sp__direct">
          ${contact.phone ? `<li><a href="tel:${tel(contact.phone)}">${contact.phone}</a></li>` : ''}
          ${contact.phone2 ? `<li><a href="tel:${tel(contact.phone2)}">${contact.phone2}</a></li>` : ''}
          ${contact.whatsapp ? `<li><a href="https://wa.me/${contact.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>` : ''}
          ${contact.email ? `<li><a href="mailto:${contact.email}">${contact.email}</a></li>` : ''}
        </ul>
      </li>
    </ul>
  </div>
</section>`;
  },
};

/* ── Legal ── */
export const privacy = {
  path: '/privacy/', nav: '', bodyClass: 'page-doc', title: 'Privacy policy',
  description: 'How IMS handles personal information submitted through this website.',
  body() {
    return `${doc('Privacy policy')}
<section class="doc"><div class="wrap prose">
${draftBanner}
<h2>Who we are</h2>
<p>This website is operated by IMS (Integrated Management Solutions). Contact us at <a href="mailto:${contact.email}">${contact.email}</a>, <a href="tel:${tel(contact.phone)}">${contact.phone}</a> or <a href="tel:${tel(contact.phone2)}">${contact.phone2}</a>.</p>
<h2>What we collect</h2>
<p>When you send an enquiry we collect what you enter: your name, email address, the topic and your message. We also record the date and the page you sent it from.</p>
<h2>How we use it</h2>
<p>To review and respond to your enquiry, and to prepare consultations, demos or quotations you ask for. We do not use it for advertising and we do not sell it.</p>
<h2>Where it is stored</h2>
<p>Enquiries are stored on IMS’s web server so a person can respond, and may be emailed to IMS. [IMS to confirm: hosting location, who can access enquiries, and how long they are kept.]</p>
<h2>Cookies and analytics</h2>
<p>This website does not use advertising or analytics trackers and does not set tracking cookies. If you message us on WhatsApp, WhatsApp’s own privacy terms apply.</p>
<h2>Your rights</h2>
<p>You may ask to see, correct or delete the personal information we hold about you, in line with applicable data protection law, including Rwanda’s Law No. 058/2021. [IMS’s legal adviser to confirm the applicable provisions.]</p>
</div></section>`;
  },
};

export const terms = {
  path: '/terms/', nav: '', bodyClass: 'page-doc', title: 'Terms of use',
  description: 'Terms for using the IMS website: information, quotations, upcoming products and acceptable use.',
  body(ctx) {
    return `${doc('Terms of use')}
<section class="doc"><div class="wrap prose">
${draftBanner}
<h2>About these terms</h2>
<p>These terms cover your use of this website. They do not replace the agreement for any IMS product or service, which is provided separately.</p>
<h2>Information on this site</h2>
<p>We take care to keep this site accurate, but it is general information, not an offer. Availability, features and commercial terms are confirmed in writing in a quotation or agreement.</p>
<h2>Quotations</h2>
<p>This site does not publish prices. A quotation is prepared by IMS for a specific project after a conversation. Submitting an enquiry does not create an order or a contract.</p>
<h2>Upcoming products</h2>
<p>Products described as “coming soon” are in development. Their features, timing and availability may change.</p>
<h2>Acceptable use</h2>
<p>Please do not misuse the site or its forms, attempt to disrupt it, or submit unlawful or misleading content.</p>
<h2>Intellectual property</h2>
<p>The IMS name, logo, product names and site content belong to IMS or its licensors. Third-party photographs are credited on the <a href="${ctx.url('/credits/')}">credits page</a>.</p>
<h2>Liability</h2>
<p>[IMS’s legal adviser to complete: limitation of liability, governing law and jurisdiction.]</p>
</div></section>`;
  },
};

const credits = [
  ['A guest looking out to the sea from an infinity pool', 'Alex Bertha (alexbertha)', 'Endless_Water_(Unsplash).jpg'],
  ['Infinity pool above green hills and the sea', 'Cosmic Timetraveler (atw)', 'Round_infinity_pool_(Unsplash).jpg'],
  ['Hotel restaurant at dusk', 'Patryk Sobczak (patryksobczak)', 'Restaurant_at_dusk_(Unsplash).jpg'],
  ['Bartenders serving cocktails', 'Crew (crew)', 'Bartenders_serving_cocktail_(Unsplash).jpg'],
  ['Hotel and palm trees', 'Shane Hauser (shanehauser)', 'Hotel_and_palm_trees_(Unsplash).jpg'],
  ['Resort at sunset', 'Dino Reichmuth (dinoreichmuth)', 'Giverola_Resort_sunset._(Unsplash).jpg'],
];
export const creditsPage = {
  path: '/credits/', nav: '', bodyClass: 'page-doc', title: 'Credits',
  description: 'Photograph, font and asset credits for the IMS website.',
  body() {
    return `${doc('Credits')}
<section class="doc"><div class="wrap prose">
<h2>Photography</h2>
<p>Photographs on the home, Products and HMS pages are licensed stock images from Wikimedia Commons (CC0). None shows an IMS customer, product or project.</p>
<div class="spec-wrap"><table class="spec spec--light">
<thead><tr><th scope="col">Image</th><th scope="col">Author</th><th scope="col">Licence</th><th scope="col">Source</th></tr></thead>
<tbody>${credits.map((c) => `<tr><th scope="row">${c[0]}</th><td>${c[1]}</td><td>CC0 1.0</td><td><a href="https://commons.wikimedia.org/wiki/File:${c[2]}" rel="noopener" target="_blank">Source</a>. Resized and re-encoded to WebP.</td></tr>`).join('')}</tbody>
</table></div>
<h2>Fonts</h2>
<p>Cormorant Garamond and Jost, used under the SIL Open Font License 1.1 and self-hosted.</p>
<h2>IMS assets</h2>
<p>The IMS logo and the BarMS Pro film are IMS’s own. Still images from the film are frames taken from it.</p>
</div></section>`;
  },
};

/* ── 404 ── */
export const notFound = {
  path: '/404.html', file: '404.html', nav: '', noindex: true, bodyClass: 'page-404',
  title: 'Page not found', description: 'This page could not be found.',
  body(ctx) {
    return `
<section class="pg nf is-dark">
  <div class="wrap nf__in">
    <p class="nf__code" aria-hidden="true">404</p>
    <h1 class="pg__title">That page <em>is not here.</em></h1>
    <div class="actions"><a class="btn btn--signal btn--lg" href="${ctx.url('/')}">Home${arrow}</a><a class="btn btn--ghost btn--lg" href="${ctx.url('/products/barms-pro/')}">BarMS Pro${arrow}</a><a class="btn btn--ghost btn--lg" href="${ctx.url('/contact/')}">Contact${arrow}</a></div>
  </div>
</section>`;
  },
};
