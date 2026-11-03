import { arrow, enquiryHref } from '../layout.mjs';

// HMS is an upcoming product. No software screenshots exist, so none are shown.
// Photography is licensed stock (see /credits/). Copy stays free of feature
// claims until IMS confirms scope.

const scenes = [
  { n: '01', tag: 'The lounge', title: 'Where the day <em>slows down.</em>', img: 'hms-lounge.webp', alt: 'A lounge armchair and sofa in front of tall windows onto a garden.' },
  { n: '02', tag: 'The bar', title: 'Where the night <em>is served.</em>', img: 'hms-cocktail.webp', alt: 'A passion-fruit cocktail with a yellow striped straw, set among leaves and volcanic rock.' },
  { n: '03', tag: 'The poolside', title: 'Where the evening <em>gathers.</em>', img: 'hms-firepit.webp', alt: 'A fire pit burning at night beside a lit pool.' },
];

export const hms = {
  path: '/products/hms/',
  nav: 'products',
  title: 'HMS: Hotel & Resort Management System (coming soon)',
  description: 'HMS, the IMS Hotel & Resort Management System, is in development. Join the waiting list to hear when it is ready.',
  bodyClass: 'page-hms',
  body(ctx) {
    return `
<section class="hhero hx is-dark">
  <img class="hhero__img" data-parallax src="${ctx.asset('assets/media/stock/hms-endless-water.webp')}" alt="Stock photograph: a guest looking out to the sea from an infinity pool." width="1600" height="1067" fetchpriority="high">
  <div class="hhero__shade" aria-hidden="true"></div>
  <div class="wrap hhero__in">
    <nav class="crumbs mono" aria-label="Breadcrumb"><a href="${ctx.url('/products/')}">Products</a><span aria-hidden="true">/</span><span aria-current="page">HMS</span></nav>
    <p class="mono phero__label"><span class="tag tag--soon">Coming soon</span> Hotel &amp; Resort Management System</p>
    <h1 class="hhero__title" data-split>HMS.</h1>
    <p class="hx__line">Hospitality, <em>in one view.</em></p>
    <div class="actions"><a class="btn btn--signal btn--lg" data-magnet href="${enquiryHref(ctx, 'hotel-pos')}">Join the Waiting List${arrow}</a><a class="btn btn--ghost btn--lg" data-magnet href="${ctx.url('/products/barms-pro/')}">See BarMS Pro, available now${arrow}</a></div>
  </div>
  <p class="hhero__credit mono">Stock photograph · <a href="${ctx.url('/credits/')}">credit</a></p>
</section>

<section class="sec sec--paper statement2">
  <div class="wrap">
    <p class="mono sec-head__label sec-head__label--c rv">The idea</p>
    <p class="statement2__text" data-fill>A hotel is many places where guests spend. HMS is being designed to bring them together.</p>
  </div>
</section>

<section class="sec sec--paper hg" aria-label="The idea in pictures">
  <div class="wrap">
    <figure class="hg__console rv">
      <img src="${ctx.asset('assets/media/stock/hms-console.webp')}" alt="" loading="lazy" decoding="async" width="1600" height="922">
      <figcaption class="mono">A first glimpse. In development.</figcaption>
    </figure>
  </div>
</section>

<div class="stack hv">
${scenes.map((s) => `<section class="hv__scene is-dark" aria-labelledby="hv-${s.n}">
  <img class="hv__img" data-parallax src="${ctx.asset(`assets/media/stock/${s.img}`)}" alt="${s.alt}" loading="lazy" decoding="async" width="1600" height="1067">
  <div class="hv__shade" aria-hidden="true"></div>
  <div class="wrap hv__in">
    <p class="mono hv__tag rv"><span>${s.n}</span> ${s.tag}</p>
    <h2 class="hv__title rv" id="hv-${s.n}">${s.title}</h2>
  </div>
  </section>`).join('')}
</div>

<section class="hz is-dark">
  <img class="hz__img" data-parallax src="${ctx.asset('assets/media/stock/hms-sunset.webp')}" alt="Stock photograph: a resort coastline at sunset." loading="lazy" decoding="async" width="1600" height="1192">
  <div class="hz__shade" aria-hidden="true"></div>
  <div class="wrap hz__in">
    <h2 class="hz__title rv">Be first <em>to know.</em></h2>
    <p class="hz__line rv">HMS is in development. Features are announced to the waiting list first.</p>
    <div class="actions rv" style="justify-content:center"><a class="btn btn--signal btn--lg" data-magnet href="${enquiryHref(ctx, 'hotel-pos')}">Join the Waiting List${arrow}</a><a class="btn btn--ghost btn--lg" data-magnet href="${ctx.url('/contact/')}">Talk to us${arrow}</a></div>
  </div>
</section>`;
  },
};
