import { arrow, statusTag, enquiryHref } from '../layout.mjs';

// The two real products, shown identically on the homepage and /products/.
export function productPanels(ctx) {
  return `<div class="prods">
  <article class="prod prod--main is-dark rv">
    <div class="prod__copy">
      ${statusTag('Available')}
      <h3 class="prod__name">BarMS Pro</h3>
      <p class="prod__tag"><em>The whole bar, in one connected system.</em></p>
      <p>Orders, kitchen, stock, cash and staff in one app on the devices you already own. It keeps selling when the internet is down, and every void and refund leaves a trail.</p>
      <div class="actions">
        <a class="btn btn--signal" href="${ctx.url('/products/barms-pro/')}">Explore BarMS Pro${arrow}</a>
        <a class="btn btn--ghost" href="${enquiryHref(ctx, 'barms-demo')}">Book a Demo${arrow}</a>
      </div>
    </div>
    <figure class="phone">
      <a class="phone__frame" href="${ctx.url('/products/barms-pro/#film')}" aria-label="Watch the BarMS Pro film">
        <img class="phone__screen" src="${ctx.asset('assets/media/barms/poster-one-system.webp')}" width="540" height="960" loading="lazy" decoding="async" alt="Still from the BarMS Pro film: a desktop order screen above the words “A smarter way to manage your bar, restaurant, stock, kitchen and cash”.">
      </a>
    </figure>
  </article>
  <article class="prod prod--soon is-dark rv" data-d="1">
    <img class="prod__bg" src="${ctx.asset('assets/media/stock/hms-sunset.webp')}" alt="Stock photograph: a resort coastline at sunset." loading="lazy" decoding="async" width="1600" height="1067">
    <div class="prod__shade" aria-hidden="true"></div>
    <div class="prod__copy">
      ${statusTag('Coming soon')}
      <h3 class="prod__name">HMS</h3>
      <p class="prod__tag"><em>Hotel &amp; Resort Management System.</em></p>
      <p>In development. Join the waiting list to hear when it is ready.</p>
      <div class="actions"><a class="btn btn--ghost" href="${ctx.url('/products/hms/')}">See what is coming${arrow}</a></div>
    </div>
  </article>
</div>`;
}
