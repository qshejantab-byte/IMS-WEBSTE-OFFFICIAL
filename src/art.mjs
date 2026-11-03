// Custom line illustrations for the product categories. Same visual language
// as the homepage hero (orthogonal pathways, mono labels, one signal colour).
// They are decorative: pages pair each with a text description.

const T = (x, y, s, extra = '') => `<text x="${x}" y="${y}" class="art__t" ${extra}>${s}</text>`;
const box = (x, y, w, h, label, cls = '') => `<g class="art__box ${cls}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>${T(x + w / 2, y + h / 2 + 5, label, 'text-anchor="middle"')}</g>`;
const ln = (d, cls = '') => `<path class="art__ln d ${cls}" d="${d}" pathLength="1"/>`;
const wrap = (inner, label) => `<svg class="art" viewBox="0 0 800 480" role="img" aria-label="${label}" focusable="false">${inner}</svg>`;

export const art = {
  // One event, many connected records
  systems() {
    const rows = ['SALES', 'STOCK', 'KITCHEN', 'CASH', 'AUDIT LOG'];
    const ys = [70, 150, 230, 310, 390];
    return wrap(`
      <g class="art__box art__box--hot"><circle cx="130" cy="240" r="66"/>${T(130, 236, 'ONE', 'text-anchor="middle"')}${T(130, 256, 'EVENT', 'text-anchor="middle"')}</g>
      ${ys.map((y) => ln(`M196 240 H300 V${y + 20} H470`)).join('')}
      ${rows.map((r, i) => box(470, ys[i], 230, 40, r, i === 4 ? 'art__box--hot' : '')).join('')}
      <circle class="art__jn" cx="300" cy="240" r="5"/>
      ${T(300, 466, 'Every module shares one record of what happened', 'text-anchor="middle" class="art__t art__t--dim"')}`,
      'Diagram: one event fans out to sales, stock, kitchen, cash and audit records');
  },

  // Event → agent → human approval → action, with an audit trail
  agents() {
    return wrap(`
      ${box(30, 190, 150, 56, 'EVENT')}
      ${ln('M180 218 H260')}
      <g class="art__box art__box--hot"><rect x="260" y="160" width="200" height="116" rx="4"/>${T(360, 200, 'AGENT', 'text-anchor="middle"')}
        ${T(360, 226, 'reads · reasons', 'text-anchor="middle" class="art__t art__t--dim"')}${T(360, 248, 'drafts an action', 'text-anchor="middle" class="art__t art__t--dim"')}</g>
      ${ln('M460 218 H520')}
      <g class="art__box"><path d="M580 160 L640 218 L580 276 L520 218 Z"/>${T(580, 223, 'PERSON', 'text-anchor="middle"')}</g>
      ${ln('M640 218 H690')}
      ${box(690, 190, 90, 56, 'ACT')}
      ${ln('M580 276 V380 H360 V276', 'art__ln--dash')}
      ${box(250, 380, 220, 44, 'AUDIT TRAIL')}
      ${T(580, 148, 'approve · edit · reject', 'text-anchor="middle" class="art__t art__t--dim"')}
      ${T(30, 120, 'A person stays in the loop where it matters.', 'class="art__t art__t--dim"')}`,
      'Diagram: an event reaches an AI agent, which drafts an action that a person approves before it runs and is logged');
  },

  // Modular blocks assembling into a bespoke shape
  software() {
    const blocks = [
      [60, 60, 200, 80, 'INTERFACE'], [280, 60, 140, 80, 'ACCESS'], [440, 60, 200, 80, 'WORKFLOWS'],
      [60, 160, 140, 120, 'YOUR DATA'], [220, 160, 200, 60, 'RULES'], [220, 240, 200, 40, 'REPORTS'], [440, 160, 200, 120, 'INTEGRATIONS'],
    ];
    return wrap(`
      <g class="art__grid">${Array.from({ length: 9 }, (_, i) => `<line x1="${40 + i * 90}" y1="40" x2="${40 + i * 90}" y2="400"/>`).join('')}${Array.from({ length: 5 }, (_, i) => `<line x1="40" y1="${40 + i * 90}" x2="760" y2="${40 + i * 90}"/>`).join('')}</g>
      ${blocks.map((b, i) => `<g class="art__box ${i === 3 ? 'art__box--hot' : ''} art__blk" style="--i:${i}"><rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" rx="3"/>${T(b[0] + 14, b[1] + 28, b[4])}</g>`).join('')}
      ${ln('M40 420 H640 M40 410 V430 M640 410 V430')}
      ${T(340, 456, 'built around your requirements', 'text-anchor="middle" class="art__t art__t--dim"')}`,
      'Diagram: modular blocks for interface, access, workflows, data, rules, reports and integrations assembled into one custom system');
  },

  // Conceptual only: several hospitality venues feeding one view. Not a product interface.
  concept() {
    const v = [['RESTAURANT', 60], ['BAR', 150], ['POOLSIDE', 240], ['SHOP', 330]];
    return wrap(`
      ${v.map(([t, y]) => `<g class="art__box art__box--dash"><rect x="40" y="${y}" width="190" height="56" rx="3"/>${T(135, y + 33, t, 'text-anchor="middle"')}</g>`).join('')}
      ${v.map(([, y]) => ln(`M230 ${y + 28} H330 V240 H420`, 'art__ln--dash')).join('')}
      <g class="art__box art__box--dash art__box--hot"><rect x="420" y="170" width="260" height="140" rx="4"/>${T(550, 236, 'ONE VIEW OF THE', 'text-anchor="middle"')}${T(550, 258, 'WHOLE PROPERTY', 'text-anchor="middle"')}</g>
      <g class="art__tag"><rect x="40" y="420" width="300" height="34" rx="2"/>${T(190, 442, 'CONCEPT · NOT THE PRODUCT', 'text-anchor="middle"')}</g>`,
      'Conceptual diagram: several hospitality venues such as a restaurant, bar, poolside and shop feed into one view. This is an illustration of an idea, not the product interface');
  },


  // A website / storefront wireframe
  digital() {
    return wrap(`
      <g class="art__box"><rect x="60" y="50" width="680" height="380" rx="6"/><path d="M60 92 H740"/>
        <circle cx="86" cy="71" r="5"/><circle cx="106" cy="71" r="5"/><circle cx="126" cy="71" r="5"/></g>
      <g class="art__box art__box--hot"><rect x="90" y="120" width="360" height="150" rx="3"/>${T(110, 160, 'YOUR BUSINESS,')}${T(110, 184, 'CLEARLY EXPLAINED')}</g>
      ${box(470, 120, 240, 70, 'CALL TO ACTION')}
      ${box(470, 200, 240, 70, 'ENQUIRY')}
      ${[0, 1, 2].map((i) => box(90 + i * 208, 296, 188, 110, ['PRODUCT', 'CHECKOUT', 'ACCOUNT'][i])).join('')}`,
      'Diagram: a website with a clear message, enquiry and call to action, and storefront blocks for products, checkout and customer accounts');
  },

  // Monitor, improve, release: a continuous loop
  care() {
    return wrap(`
      ${box(90, 60, 200, 64, 'MONITOR')}
      ${box(510, 60, 200, 64, 'IMPROVE')}
      ${box(510, 330, 200, 64, 'RELEASE')}
      ${box(90, 330, 200, 64, 'SUPPORT', 'art__box--hot')}
      ${ln('M290 92 H510')}${ln('M610 124 V330')}${ln('M510 362 H290')}${ln('M190 330 V124', 'art__ln--dash')}
      ${T(400, 84, 'measure', 'text-anchor="middle" class="art__t art__t--dim"')}
      ${T(400, 354, 'ship', 'text-anchor="middle" class="art__t art__t--dim"')}
      ${T(400, 232, 'PERFORMANCE · SECURITY · UPDATES', 'text-anchor="middle"')}`,
      'Diagram: a continuous loop of monitoring, improving and releasing, supported by technical support, covering performance, security and updates');
  },

  // Different systems normalised through an integration layer
  integrations() {
    const L = [['ERP', 70], ['CRM', 170], ['POS', 270], ['SHEETS', 370]];
    const R = [['WEBSITE', 70], ['PAYMENTS', 170], ['ANALYTICS', 270], ['MESSAGING', 370]];
    return wrap(`
      ${L.map(([t, y]) => box(30, y, 150, 44, t)).join('')}
      ${R.map(([t, y]) => box(620, y, 150, 44, t)).join('')}
      <g class="art__box art__box--hot"><rect x="330" y="40" width="140" height="390" rx="4"/>${T(400, 70, 'INTEGRATION', 'text-anchor="middle"')}${T(400, 90, 'LAYER', 'text-anchor="middle"')}
        ${['API', 'MAP', 'ROUTE', 'CHECK'].map((s, i) => `<g><rect x="350" y="${130 + i * 70}" width="100" height="36" rx="2" class="art__chip"/>${T(400, 153 + i * 70, s, 'text-anchor="middle"')}</g>`).join('')}</g>
      ${L.map(([, y]) => ln(`M180 ${y + 22} H330`)).join('')}
      ${R.map(([, y]) => ln(`M470 ${y + 22} H620`)).join('')}
      ${T(400, 462, 'data and workflows move between systems on their own', 'text-anchor="middle" class="art__t art__t--dim"')}`,
      'Diagram: ERP, CRM, point-of-sale and spreadsheets connect through an integration layer to a website, payments, analytics and messaging');
  },
};
