// ─────────────────────────────────────────────────────────────────────────
// IMS website: central configuration.
// Everything the business must confirm lives here. Anything left as `null`
// is simply not rendered anywhere on the site (no placeholders are shown).
// After editing, run:  node build.mjs
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'IMS',
  legalName: 'Integrated Management Solutions',
  tagline: 'Business systems, software and intelligent agents.',
  // Public origin, e.g. 'https://www.example.com'. When set, canonical URLs,
  // Open Graph URLs and sitemap.xml are generated. Leave null until known.
  siteUrl: null,
  year: 2026,
  country: 'Rwanda',
  // Folder the site is served from. Used only by the 404 page (a missing URL can be
  // any depth). '/ims/' on this XAMPP install; set to '/' when deployed at a domain root.
  basePath: '/ims/',
};

// Verified contact details. Fill in only what IMS has confirmed.
export const contact = {
  email: 'info@ims.rw',
  phone: '+250 785 308 501',
  phone2: '+250 791 458 795',
  whatsapp: '250785308501', // WhatsApp inbox (international digits)
  address: null,     // street address / city
  hours: null,       // e.g. 'Mon–Sat, 08:00–18:00'
  social: {
    linkedin: null,
    x: null,
    facebook: null,
    instagram: null,
    youtube: null,
  },
};

// Enquiry form delivery.
//  endpoint  – where forms POST. The bundled PHP endpoint stores each enquiry
//              server-side (see api/enquiry.php). Replace with a CRM / form
//              service URL if preferred; it must return JSON { ok: true }.
export const forms = {
  endpoint: 'api/enquiry.php',
};

// Feature flags tied to business decisions.
export const flags = {
  // The BarMS Pro film contains two dashboard/profit scenes. Until reporting
  // and dashboard calculations are confirmed as fixed, those scenes are
  // skipped in playback and no reporting claims are published.
  reportingVerified: false,
};

// Film chapters (seconds into assets/barms-pro-film.mp4).
// `hold: true` ranges are skipped while flags.reportingVerified is false.
export const film = {
  src: 'assets/barms-pro-film.mp4',
  duration: 64.75,
  chapters: [
    { id: 'intro',      title: 'Running a bar',        start: 0,     end: 9.6,  poster: 'intro' },
    { id: 'one-system', title: 'One system',           start: 9.6,   end: 19.4, poster: 'one-system' },
    { id: 'reporting-a',title: 'Live sales',           start: 19.4,  end: 21.75,hold: true, poster: 'one-system' },
    { id: 'inventory',  title: 'Inventory',            start: 21.75, end: 23.3, poster: 'inventory' },
    { id: 'kitchen',    title: 'Kitchen',              start: 23.3,  end: 26.25,poster: 'kitchen' },
    { id: 'orders',     title: 'Orders & stock',       start: 26.25, end: 33.7, poster: 'orders' },
    { id: 'reporting-b',title: 'Calculated figures',   start: 33.7,  end: 37.5, hold: true, poster: 'orders' },
    { id: 'offline',    title: 'Offline selling',      start: 37.5,  end: 48.0, poster: 'offline' },
    { id: 'owner',      title: 'Stay connected',       start: 48.0,  end: 57.25,poster: 'owner' },
    { id: 'end',        title: 'BarMS Pro',            start: 57.25, end: 64.75,poster: 'end' },
  ],
};

// ─── Offering: two products, five services ──────────────────────────────
export const productList = [
  { id: 'barms-pro', name: 'BarMS Pro', status: 'Available', path: '/products/barms-pro/', line: 'Bar and restaurant management that keeps selling offline.', poster: 'assets/media/barms/poster-one-system.webp' },
    { id: 'hms', name: 'HMS', status: 'Coming soon', path: '/products/hms/', line: 'Hotel & Resort Management System, in development.', poster: 'assets/media/stock/hms-endless-water.webp' },
];

export const services = [
  { id: 'ai', n: '01', name: 'AI & Intelligent Agents', menu: 'AI & Agents', line: 'Agents and automation that work inside your operations.', topic: 'ai', cta: 'Talk to Our AI Team', path: '/services/#ai' },
  { id: 'software', n: '02', name: 'Custom Software Development', menu: 'Custom Software', line: 'Applications and management systems built around how you work.', topic: 'software', cta: 'Discuss Your Project', path: '/services/#software' },
  { id: 'integrations', n: '03', name: 'Systems & Integrations', menu: 'Integrations', line: 'Connect your systems, APIs and data.', topic: 'integrations', cta: 'Discuss Your Project', path: '/services/#integrations' },
  { id: 'digital', n: '04', name: 'Digital Experiences & Commerce', menu: 'Websites & Commerce', line: 'Business websites, online stores and digital platforms.', topic: 'digital', cta: 'Discuss Your Project', path: '/services/#digital' },
  { id: 'care', n: '05', name: 'Digital Performance & Continuous Care', menu: 'Continuous Care', line: 'Performance, security and ongoing improvement.', topic: 'care', cta: 'Discuss Your Project', path: '/services/#care' },
];

export const nav = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'products', label: 'Products', path: '/products/', mega: 'products' },
  { id: 'services', label: 'Services', path: '/services/', mega: 'services' },
  { id: 'company', label: 'Company', path: '/company/' },
  { id: 'contact', label: 'Contact', path: '/contact/' },
];

export const primaryCta = { label: 'Let’s Discuss Your Project', path: '/contact/?topic=consultation' };

// ─── Enquiry topics ──────────────────────────────────────────────────────
export const topics = [
  { id: 'consultation', label: 'Book a consultation', hint: 'Not sure where to start? Talk it through with us.' },
  { id: 'barms-quote',  label: 'BarMS Pro: request a quotation', hint: 'For a bar, restaurant or both.' },
  { id: 'barms-demo',   label: 'BarMS Pro: book a demo', hint: 'See BarMS Pro run, with your questions.' },
  { id: 'hotel-pos',    label: 'HMS: join the waiting list', hint: 'Hotel & Resort Management System.' },
  { id: 'ai',           label: 'AI & agents: talk to our AI team', hint: 'Automation, agents, integration into your systems.' },
  { id: 'software',     label: 'Software development: discuss your project', hint: 'Custom applications and management systems.' },
  { id: 'integrations', label: 'Systems & integrations: discuss your project', hint: 'Connect the software you already use.' },
  { id: 'digital',      label: 'Digital experiences: discuss your project', hint: 'Websites, online stores and digital platforms.' },
  { id: 'care',         label: 'Continuous care: improve what you run', hint: 'Performance, maintenance, security and updates.' },
  { id: 'support',      label: 'Support request (existing customers)', hint: 'For customers already running an IMS product.' },
];
