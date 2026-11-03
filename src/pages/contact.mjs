import { contact, forms, topics } from '../config.mjs';
import { esc, arrow } from '../layout.mjs';

// A call-to-action page: what you need, who you are, one message. Nothing else.
const short = {
  consultation: 'Consultation', 'barms-quote': 'BarMS Pro quote', 'barms-demo': 'BarMS Pro demo', 'hotel-pos': 'HMS waiting list',
  ai: 'AI & agents', software: 'Software', integrations: 'Integrations', digital: 'Websites & commerce', care: 'Continuous care', support: 'Support',
};

export const contactPage = {
  path: '/contact/',
  nav: 'contact',
  title: 'Contact: let’s discuss your project',
  description: 'Discuss your project with IMS. Email info@ims.rw, call +250 785 308 501 or +250 791 458 795, message us on WhatsApp, or send a short enquiry.',
  bodyClass: 'page-contact',
  body(ctx) {
    const tel = contact.phone ? contact.phone.replace(/\s+/g, '') : '';
    const mailto = contact.email ? esc(contact.email) : '';
    return `
<section class="cx is-dark">
  <div class="wrap cx__grid">
    <div class="cx__left">
      <p class="mono cx__eyebrow">Contact</p>
      <h1 class="cx__title">Let’s build<br><em>what’s next.</em></h1>
      <ul class="cx__direct">
        ${contact.email ? `<li><a href="mailto:${esc(contact.email)}"><span class="mono">Email</span>${esc(contact.email)}${arrow}</a></li>` : ''}
        ${contact.phone ? `<li><a href="tel:${esc(tel)}"><span class="mono">Call</span>${esc(contact.phone)}${arrow}</a></li>` : ''}
        ${contact.phone2 ? `<li><a href="tel:${esc(contact.phone2.replace(/\s+/g, ''))}"><span class="mono">Call</span>${esc(contact.phone2)}${arrow}</a></li>` : ''}
        ${contact.whatsapp ? `<li><a href="https://wa.me/${esc(contact.whatsapp)}" target="_blank" rel="noopener"><span class="mono">Chat</span>WhatsApp${arrow}</a></li>` : ''}
      </ul>
      <p class="cx__fine">No prices are published. Every quotation is written for your project.</p>
    </div>
    <form class="cx__form" data-enquiry data-endpoint="${ctx.asset(forms.endpoint)}" ${mailto ? `data-mailto="${mailto}"` : ''} novalidate aria-labelledby="form-title">
      <h2 id="form-title" class="cx__formtitle">I’m interested in</h2>
      <fieldset class="cx__topics">
        <legend class="sr-only">What do you need?</legend>
        ${topics.map((t, i) => `<label class="pillopt"><input type="radio" name="topic" value="${t.id}" data-label="${esc(t.label)}" ${i === 0 ? 'checked' : ''}><span>${esc(short[t.id] || t.label)}</span></label>`).join('')}
      </fieldset>
      <div class="cx__row">
        <div class="field"><label for="name">Name</label><input class="input" id="name" name="name" type="text" autocomplete="name" required aria-required="true" data-label="Name" data-msg="Enter your name." aria-describedby="name-e"><p class="err" id="name-e"></p></div>
        <div class="field"><label for="email">Email</label><input class="input" id="email" name="email" type="email" autocomplete="email" required aria-required="true" data-label="Email" data-msg="Enter your email address." aria-describedby="email-e"><p class="err" id="email-e"></p></div>
      </div>
      <div class="field"><label for="message">Tell us a little</label><textarea class="textarea" id="message" name="message" required aria-required="true" data-label="Message" data-msg="Tell us a little about what you need." aria-describedby="message-e"></textarea><p class="err" id="message-e"></p></div>
      <div class="hp" aria-hidden="true"><label>Leave this field empty<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label></div>
      <div class="field"><label class="check"><input type="checkbox" name="consent" value="yes" required aria-required="true" data-label="Consent" data-msg="Please confirm so we can reply." aria-describedby="consent-e"><span>I agree that IMS may contact me about this enquiry. <a href="${ctx.url('/privacy/')}">Privacy</a></span></label><p class="err" id="consent-e"></p></div>
      <div class="form__status" data-status role="status" tabindex="-1" hidden></div>
      <button class="btn btn--signal btn--lg cx__send" type="submit" data-magnet>Send enquiry${arrow}</button>
      <noscript><p class="form__fine"><strong>JavaScript is needed to send this form.</strong></p></noscript>
    </form>
  </div>
</section>`;
  },
};
