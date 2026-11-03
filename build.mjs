// Zero-dependency static site builder.  Usage:  node build.mjs
// Reads src/, writes plain HTML/CSS/JS into the project root so any web
// server (XAMPP/Apache here) can serve the result as-is.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderDocument } from './src/layout.mjs';
import { pages } from './src/pages/index.mjs';
import { site } from './src/config.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const w = (rel, data) => { const f = path.join(root, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };

// pages
for (const p of pages) {
  const rel = p.path === '/' ? 'index.html' : (p.file || (p.path.replace(/^\//, '') + 'index.html'));
  w(rel, renderDocument(p));
}

// css (concatenated in filename order)
const cssDir = path.join(root, 'src/css');
const css = fs.readdirSync(cssDir).filter((f) => f.endsWith('.css')).sort().map((f) => fs.readFileSync(path.join(cssDir, f), 'utf8')).join('\n');
w('css/site.css', css);

// js (copied as-is: written to be served directly)
const jsDir = path.join(root, 'src/js');
for (const f of fs.readdirSync(jsDir).filter((f) => f.endsWith('.js'))) w('js/' + f, fs.readFileSync(path.join(jsDir, f), 'utf8'));

// robots + sitemap
const indexable = pages.filter((p) => !p.noindex && p.path !== '/404.html');
w('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /data/\nDisallow: /_legacy/\n${site.siteUrl ? `Sitemap: ${site.siteUrl.replace(/\/$/, '')}/sitemap.xml\n` : ''}`);
if (site.siteUrl) {
  const base = site.siteUrl.replace(/\/$/, '');
  w('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `  <url><loc>${base}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
}
console.log(`Built ${pages.length} pages, css/site.css (${(css.length / 1024).toFixed(0)} KB), ${fs.readdirSync(jsDir).length} scripts.`);
