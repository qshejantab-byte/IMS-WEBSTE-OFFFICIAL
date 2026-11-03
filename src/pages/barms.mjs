import { film, flags } from '../config.mjs';
import { arrow, sectionHead, accordion, enquiryHref, esc } from '../layout.mjs';

// All claims come from the BarMS Pro System Guide v1.0 and the product film.
// Reporting / dashboard / profit claims are deliberately absent until reporting
// calculations are confirmed as fixed (config.flags). Stills are film frames.

const faq = [
  { q: 'Do we need special hardware?', a: 'No. Use the phones, tablets and computers you already have. A receipt printer is optional; confirm the model with IMS.' },
  { q: 'Does it need the internet all the time?', a: 'No. Approved devices keep selling offline for up to 14 days and sync automatically. SMS receipts and the kitchen screen need internet.' },
  { q: 'Can another bar see our data?', a: 'No. Each client’s records are private, and only devices approved by IMS can reach them.' },
  { q: 'Does it support MoMo?', a: 'MoMo is recorded as a payment method, with the customer’s phone number. BarMS Pro does not pull payments automatically from MoMo.' },
  { q: 'Does it work with RRA EBM?', a: 'Not yet. BarMS Pro works alongside your EBM. Integration is not currently available.' },
  { q: 'How much does it cost?', a: 'We do not publish prices. Request a quotation and we will prepare one for your business.' },
];

const chapters = [
  { id: 'orders', n: '01', tag: 'Orders', still: 'orders', title: 'Every sale recorded.', lead: 'Orders for tables, the counter or open tabs, paid by cash, MoMo or card, with a printed or SMS receipt.', pts: ['Open a tab and settle once at the end', 'Discounts follow the Owner’s rules', 'Wrong sale? A void request with a reason'] },
  { id: 'stock', n: '02', tag: 'Stock', still: 'inventory', title: 'Every bottle accounted for.', lead: 'Each sale reduces stock, recipes deduct their ingredients, and crates convert into single bottles.', pts: ['Low-stock alerts before a busy night', 'Weekly counts show each difference', 'Supplier purchases: paid and owed'] },
  { id: 'kitchen', n: '03', tag: 'Kitchen', still: 'kitchen', title: 'The kitchen is connected.', lead: 'Food orders appear on a live kitchen screen as they are taken, in order of arrival.', pts: ['New, preparing, ready', 'Recipes deduct ingredients automatically', 'The kitchen screen needs internet'] },
  { id: 'offline', n: '04', tag: 'Offline', still: 'offline', title: 'No internet. Still selling.', lead: 'Approved devices keep taking orders and payments, then upload automatically, oldest first, with no duplicates.', pts: ['One main device sells offline, so sellers never clash', 'Offline orders are numbered OFF-0001, OFF-0002…', 'Up to 14 days without reaching IMS'], extra: 'offline' },
  { id: 'control', n: '05', tag: 'Control', still: 'control', title: 'Mistakes leave a trail.', lead: 'Each person has their own login and role. Voids and refunds need a reason and an approval, and key actions are recorded.', pts: ['Owner, Manager, Bartender and Kitchen roles', 'Permissions the Owner switches on for managers', 'The server checks every permission on every action'], extra: 'control', dark: true },
  { id: 'devices', n: '06', tag: 'Devices', still: 'devices', title: 'Install from the browser.', lead: 'No app store. Open the link on any phone, tablet or computer, install it, and sign in.', pts: ['IMS approves each device before it reaches your data', 'A lost phone can be blocked', 'Updates install themselves'] },
];

const compat = [
  ['Phones, tablets, computers', 'yes', 'Supported', 'Installed from the browser.'],
  ['Receipt printers', 'yes', 'Supported', 'Optional. Confirm the model with IMS.'],
  ['SMS receipts', 'yes', 'Supported', 'Needs internet.'],
  ['Mobile Money (MoMo)', 'partial', 'Recorded', 'Recorded as a payment method. Not an automatic MoMo link.'],
  ['Card payments', 'partial', 'Recorded', 'Recorded as a payment method. No direct bank processing.'],
  ['RRA EBM', 'no', 'Not yet', 'Not currently integrated. Works alongside your EBM.'],
  ['Accounting software, hotel PMS', 'no', 'On request', 'Requires technical assessment and custom work.'],
];

const steps = [
  ['Register and configure', 'IMS creates your account, issues the activation key and sets up your business.'],
  ['Your data and team', 'IMS guides setup. You bring items, prices, opening stock, staff and roles.'],
  ['Devices and offline', 'IMS activates each device and configures the main and Owner devices.'],
  ['Training and go live', 'IMS walks through each role and stays with you at launch.'],
];

const transcript = [
  'Running a bar is more than serving drinks. It’s managing every sale, every bottle, every payment, every detail that keeps your business moving.',
  'Introducing BarMS Pro: a smarter way to manage your bar, restaurant, stock, kitchen and cash.',
  'Monitor your inventory.',
  'Keep your kitchen connected. Orders move from new, to preparing, to ready.',
  'All through one powerful system. Every sale recorded. Every stock movement tracked.',
  'And when the internet goes down, your business doesn’t have to stop. BarMS Pro keeps approved devices working, and automatically syncs records when the connection returns.',
  'Whether you’re behind the counter or away from your business, stay connected to what matters most.',
  'Less guesswork. More control. Better visibility.',
  'BarMS Pro, Rwanda bar management, by IMS company. Your business under control.',
];

const filmData = JSON.stringify({ chapters: film.chapters, reportingVerified: flags.reportingVerified, duration: film.duration }).replace(/'/g, '&#39;');

function filmFigure(ctx, id) {
  const chapters2 = film.chapters.filter((c) => !c.hold || flags.reportingVerified);
  return `<figure class="film" data-film data-src="${ctx.asset(film.src)}" data-config='${filmData}' id="${id}">
  <div class="phone">
    <div class="phone__frame">
      <img class="phone__screen" data-film-poster src="${ctx.asset('assets/media/barms/poster-one-system.webp')}" width="540" height="960" alt="Still from the BarMS Pro film: a desktop order screen above the words “A smarter way to manage your bar, restaurant, stock, kitchen and cash”.">
      <video class="film__video" data-film-video playsinline muted preload="none" hidden aria-label="BarMS Pro film"></video>
      <button class="film__play" type="button" data-film-play aria-label="Play the BarMS Pro film"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></button>
    </div>
  </div>
  <div class="film__side">
    <div class="film__bar" role="group" aria-label="Film controls">
      <button class="film__btn mono" type="button" data-film-toggle>Play</button>
      <button class="film__btn mono" type="button" data-film-mute aria-pressed="true">Sound off</button>
      <button class="film__btn mono" type="button" data-film-restart>Restart</button>
    </div>
    <p class="film__now mono" data-film-now aria-live="polite">65 s · muted · loads when you press play</p>
    <ol class="film__chapters" aria-label="Scenes">
      ${chapters2.map((c, i) => `<li><button type="button" class="film__ch" data-chapter="${c.id}"><span class="mono">${String(i + 1).padStart(2, '0')}</span>${esc(c.title)}</button></li>`).join('')}
    </ol>
    <details class="film__tx"><summary class="link">Read the film as text</summary><ul>${transcript.map((t) => `<li>${esc(t)}</li>`).join('')}</ul><p class="film__fine">The film has a music soundtrack and on-screen text. Some figures shown in the film are examples.</p></details>
  </div>
</figure>`;
}

const extras = {
  offline: () => `<div class="offdemo" data-offdemo>
        <p class="mono offdemo__cap">Try it · a simulation of the behaviour described</p>
        <div class="offdemo__ctl">
          <button class="switch" type="button" role="switch" aria-checked="true" data-net><span class="switch__k mono">Internet</span><span class="switch__v" data-net-label>On</span></button>
          <button class="btn btn--primary btn--sm" type="button" data-sell>Sell a drink</button>
        </div>
        <p class="offdemo__status" data-offstatus role="status">Online. Orders are saved to the server as they happen.</p>
        <ol class="offdemo__queue" data-queue aria-label="Orders"></ol>
      </div>`,
  control: () => `<ol class="strip strip--dark">
        <li><b>Wrong sale</b>Bartender sends a void request with a reason</li>
        <li><b>Red badge</b>Owner sees the pending request</li>
        <li><b>Decision</b>Approve or reject</li>
        <li><b>Audit log</b>Request and decision recorded</li>
      </ol>`,
};

export const barms = {
  path: '/products/barms-pro/',
  nav: 'barms',
  title: 'BarMS Pro: bar and restaurant management system',
  description: 'BarMS Pro by IMS: bar and restaurant management for Rwanda. Orders, kitchen, stock, cash shifts, roles, approvals and audit trail, and selling that continues offline.',
  scripts: ['film', 'barms'],
  bodyClass: 'page-barms',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'BarMS Pro',
      applicationCategory: 'BusinessApplication', operatingSystem: 'Web browser (installable)',
      description: 'Bar and restaurant management system: orders, tables, kitchen, bar stock, cash shifts, suppliers, staff roles, approvals and offline selling.',
      publisher: { '@type': 'Organization', name: 'IMS (Integrated Management Solutions)' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })) },
  ],
  body(ctx) {
    return `
<section class="bhero is-dark">
  <div class="wrap bhero__grid">
    <div class="bhero__copy">
      <nav class="crumbs mono" aria-label="Breadcrumb"><a href="${ctx.url('/products/')}">Products</a><span aria-hidden="true">/</span><span aria-current="page">BarMS Pro</span></nav>
      <p class="mono phero__label"><span class="tag tag--live">Available now</span> Bar &amp; restaurant management</p>
      <h1 class="bhero__title">BarMS<span class="pro"> Pro</span></h1>
      <p class="bhero__tag"><em>The whole bar, in one connected system.</em></p>
      <p class="lead">Orders, kitchen, stock and cash in one app on the devices you already own. It keeps selling when the internet is down.</p>
      <div class="actions">
        <a class="btn btn--signal btn--lg" data-magnet href="${enquiryHref(ctx, 'barms-quote')}">Request a Quotation${arrow}</a>
        <a class="btn btn--ghost btn--lg" data-magnet href="${enquiryHref(ctx, 'barms-demo')}">Book a Demo${arrow}</a>
      </div>
      <dl class="facts-strip">
        <div><dt class="mono">Owner screens</dt><dd>28</dd></div>
        <div><dt class="mono">Staff roles</dt><dd>4</dd></div>
        <div><dt class="mono">Days offline grace</dt><dd>14</dd></div>
        <div><dt class="mono">App-store downloads</dt><dd>0</dd></div>
      </dl>
    </div>
    ${filmFigure(ctx, 'film')}
  </div>
</section>

<section class="sec sec--navy is-dark" aria-labelledby="onesale-title">
  <div class="wrap">
    <header class="sec-head sec-head--c rv"><p class="mono sec-head__label">One connected record</p><h2 class="sec-head__title" id="onesale-title">One sale. <em>Everything updated.</em></h2></header>
    <div class="onesale" data-onesale>
      <div class="onesale__ctl rv">
        <div class="onesale__core" data-core><span class="mono">Event</span><strong>Order paid</strong></div>
        <button class="btn btn--signal" type="button" data-onesale-run>Take a payment${arrow}</button>
      </div>
      <ul class="onesale__out">
        <li data-node><span class="onesale__dot" aria-hidden="true"></span><h3>Sales</h3><p>Revenue, payment method, staff member and shift.</p></li>
        <li data-node><span class="onesale__dot" aria-hidden="true"></span><h3>Stock</h3><p>Bottles and recipe ingredients deducted.</p></li>
        <li data-node><span class="onesale__dot" aria-hidden="true"></span><h3>Kitchen</h3><p>Food already sent to the queue.</p></li>
        <li data-node><span class="onesale__dot" aria-hidden="true"></span><h3>Cash</h3><p>Expected drawer total updated.</p></li>
        <li data-node><span class="onesale__dot" aria-hidden="true"></span><h3>Audit log</h3><p>Who, what, when, and on which device.</p></li>
      </ul>
    </div>
  </div>
</section>

${chapters.map((c, i) => `<section class="bch ${c.dark ? 'bch--dark is-dark' : (i % 2 ? 'bch--bone' : 'bch--paper')} ${i % 2 ? 'bch--alt' : ''}" id="${c.id}" aria-labelledby="${c.id}-t">
  <div class="wrap bch__grid">
    <figure class="bch__ph rv">
      <div class="phone"><div class="phone__frame"><img class="phone__screen" src="${ctx.asset(`assets/media/barms/poster-${c.still}.webp`)}" width="540" height="960" loading="lazy" decoding="async" alt="Still from the BarMS Pro film."></div></div>
      <figcaption class="mono">Still from the film</figcaption>
    </figure>
    <div class="bch__copy">
      <p class="mono bch__tag rv"><span>${c.n}</span> ${c.tag}</p>
      <h2 class="bch__title rv" id="${c.id}-t">${c.title}</h2>
      <p class="bch__lead rv">${c.lead}</p>
      <ul class="bch__pts rv">${c.pts.map((p) => `<li>${p}</li>`).join('')}</ul>
      ${c.extra ? `<div class="bch__extra rv">${extras[c.extra]()}</div>` : ''}
    </div>
  </div>
</section>`).join('\n')}

<section class="sec sec--paper" aria-labelledby="compat-title">
  <div class="wrap">
    ${sectionHead({ label: 'Compatibility', title: 'What works today, and <em>what does not.</em>' }).replace('<h2', '<h2 id="compat-title"').replace('sec-head rv', 'sec-head sec-head--c rv')}
    <div class="spec-wrap rv">
      <table class="spec spec--light">
        <thead><tr><th scope="col">System or equipment</th><th scope="col">Status today</th><th scope="col">Note</th></tr></thead>
        <tbody>${compat.map((c) => `<tr><th scope="row">${c[0]}</th><td><span class="st st--${c[1] === 'yes' ? 'ok' : c[1]}">${c[2]}</span></td><td>${c[3]}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="note rv">Not included today: hotel property management and room reservations, confirmed multi-branch consolidation, and automatic payment processing through MoMo or card providers. These can be scoped as custom work. See <a href="${ctx.url('/services/#integrations')}">integrations</a>.</p>
  </div>
</section>

<section class="sec sec--stone">
  <div class="wrap">
    ${sectionHead({ label: 'Getting started', title: 'From first call to <em>first sale.</em>', lead: 'Many small bars can be selling within a day, depending on setup.' }).replace('sec-head rv', 'sec-head sec-head--c rv')}
    <ol class="onboard onboard--4">
      ${steps.map((s, i) => `<li class="rv" data-d="${i % 4}"><span class="mono">${String(i + 1).padStart(2, '0')}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="sec sec--paper">
  <div class="wrap faqwrap">
    ${sectionHead({ label: 'Questions', title: 'Quick answers.' }).replace('sec-head rv', 'sec-head sec-head--c rv')}
    <div class="rv">${accordion(faq, 'bfaq')}</div>
    <div class="actions rv" style="margin-top:48px;justify-content:center"><a class="btn btn--primary btn--lg" data-magnet href="${enquiryHref(ctx, 'barms-quote')}">Request a Quotation${arrow}</a><a class="btn btn--ghost btn--lg" data-magnet href="${enquiryHref(ctx, 'barms-demo')}" style="color:var(--ink);--rule:var(--line)">Book a Demo${arrow}</a></div>
  </div>
</section>`;
  },
};
