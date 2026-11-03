import { arrow } from '../layout.mjs';

// Shared illustrative mini-interfaces (drawings, not product screenshots).
export const ico = {
  ai: '<path d="M12 3v3M8 21h8M6 8h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Zm3 5h.01M15 13h.01"/>',
  software: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  integrations: '<path d="M9 7V3m6 4V3M7 7h10v4a5 5 0 0 1-10 0V7Zm5 9v5"/>',
  digital: '<path d="M3 5h18v14H3V5Zm0 4h18M7 7h.01M10 7h.01"/>',
  care: '<path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4"/>',
};
export const icon = (k) => `<span class="bento__ico" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ico[k]}</svg></span>`;

export const widgets = {
  ai: `<ul class="w-tasks" aria-hidden="true">
      <li class="is-done"><span class="w-dot"></span>Stock level reached<b>Detected</b></li>
      <li class="is-done"><span class="w-dot"></span>Draft supplier order<b>Prepared</b></li>
      <li class="is-wait"><span class="w-dot"></span>Approve and send<b>Needs a person</b></li>
    </ul>`,
  software: '<ul class="w-chips" aria-hidden="true"><li>Interface</li><li>Access</li><li>Workflows</li><li class="hot">Your data</li><li>Rules</li><li>Integrations</li></ul>',
  integrations: '<div class="w-link" aria-hidden="true"><span>Your systems</span><i></i><b>IMS</b><i></i><span>Everything else</span></div>',
  digital: '<div class="w-browser" aria-hidden="true"><div class="w-browser__bar"><i></i><i></i><i></i></div><div class="w-browser__body"><em></em><em class="s"></em><b></b></div></div>',
  care: '<div class="w-loop" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38"/><circle class="arc" cx="50" cy="50" r="38" pathLength="100"/></svg><span>Monitor<br>Improve<br>Release</span></div>',
};

export const text = {
  ai: 'Agents that read what is happening, prepare the next step, and ask a person to approve what matters.',
  software: 'Applications and management systems built around how your organisation actually works.',
  integrations: 'Connect your applications, APIs and data so work is entered once and used everywhere.',
  digital: 'Business websites, online stores and customer platforms that make the next step easy.',
  care: 'Performance, security and updates, and steady improvement long after launch.',
};

export { arrow };
