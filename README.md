# IMS website

Fonts: Cormorant Garamond (display) and Jost (interface), self-hosted in `fonts/`. Palette: deep navy / near-black / warm off-white, logo silver, one champagne accent.

Static site, zero dependencies. Source lives in `src/`; `node build.mjs` writes plain HTML, CSS and JS into the project root, so any web server (XAMPP/Apache here) can serve it as-is. The built files are committed alongside the source.

```
node build.mjs            # rebuild everything after editing src/
```

## Site structure

Home · Products (two full-screen doors: BarMS Pro, HMS) · BarMS Pro · HMS · Services (index + five stacked chapters) · Company (incl. trust) · Support · Contact · Privacy · Terms · Credits · 404. Every page opens with its own full-screen landing. Retired URLs redirect via `.htaccess`.

## Where things live

| Path | What |
|---|---|
| `src/config.mjs` | **All business information**: contact details, form endpoint, navigation, enquiry topics, film chapters, feature flags. Anything left `null` is simply not rendered. |
| `src/layout.mjs` | Document shell, header + mega-menu, footer, shared components |
| `src/pages/*.mjs` | One module per page (content as data + templates) |
| `src/hero.mjs`, `src/js/hero.js`, `src/css/30-hero.css` | Homepage hero ("Forward": the six solution areas on one rising pathway) |
| `src/css/99-pages.csssrc/css/96-ia.css` | Header (Products/Services menus, BarMS Pro pill), product panels, services page, compact footer |
| `src/css/95-theme.css` | Dark-luxury theme layer: type scale, mega-menu, signature footer, page transitions |
| `src/art.mjs` | Service line illustrations |
| `src/css/*.css` | Design system, concatenated to `css/site.css` |
| `src/js/*.js` | Behaviour, copied to `js/` |
| `api/enquiry.php`, `api/config.php` | Enquiry endpoint (stores to `data/enquiries/*.jsonl`, optional email) |
| `_legacy/` | The previous site, preserved untouched |
| `assets/` | Original brand + film (never modified) plus derived posters, icons, stock photos |

## Business information still needed (see `src/config.mjs`)

- `contact.*` — email (info@ims.rw) and phone (+250 785 308 501) are set. WhatsApp, address, hours and social URLs are still `null` and are not shown.
- `site.siteUrl` — enables canonical URLs, Open Graph URLs and `sitemap.xml`.
- `site.basePath` — `/ims/` on this XAMPP; set to `/` at a domain root (used by the 404 page).
- `api/config.php → notify_email` is set to info@ims.rw. Enquiries are always stored in `data/enquiries/`; email delivery also needs the server's mail to be configured (not the case on this XAMPP).
- `flags.reportingVerified` — set to `true` only after dashboard/report calculations are confirmed fixed; this un-skips the two dashboard scenes in the film.
- Privacy policy and Terms are **drafts** and need legal review.
- Provisional copy to confirm: HMS purpose and its "Hotel & Resort Management System" descriptor and the service descriptions on `/services/`.

## Deploying

Serve everything except `src/`, `build.mjs`, `_legacy/`, `README.md`. Keep `data/` non-public (`data/.htaccess` does this on Apache; replicate on nginx). The PHP endpoint needs a writable `data/enquiries/`.
