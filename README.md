# Royalty Travel Victoria Falls

The saved Wix website has been migrated to Next.js App Router, React and TypeScript, with a consistent redesign across the landing page, tours, prices, transfers, accommodation, contact pages and blog. The original crown logo, black/gold/white palette, text and rates are retained.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`.

```sh
npm run build
npm start
npm run typecheck
```

With the local server running, `npm run verify` checks all migrated pages, legacy redirects, internal content links, image references, image optimisation, the 404 page, sitemap, robots and RSS. Set `SITE_URL` to check a different running instance.

## Editing and redesign

- `src/app/globals.css`: shared styles, colours and responsive layouts.
- `src/app/landing.css`: landing-page hero and service-card layouts.
- `src/lib/visuals.ts`: original-photo selection and focal points for aligned image crops.
- `src/components/`: header, footer, page renderer and enquiry form.
- `src/components/scroll-reveal.tsx`: scroll animations with reduced-motion support.
- `src/content/site.json`: editable page content and image references.
- `public/images/`: 53 images copied from the original site, served locally.
- `src/app/[...slug]/page.tsx`: statically generated content and blog pages.
- `next.config.ts`: permanent redirects from the original `.html` URLs.

The 16 original HTML files were removed after migration. Their content is stored in `src/content/site.json`: 12 main pages and four complete blog posts. The original RSS export remains as a reference and lists additional posts whose full pages were not included; the migrated feed includes the four available posts.

The legacy `pricelist-2024` and `adrenalin-activites` slugs are intentionally retained for link compatibility. The price-list heading says 2026 in the source, and its rates and terms are preserved without updating them. No Wix runtime or Wix form service is used.

The enquiry form prepares a WhatsApp message using the existing business number. Visitors review and send the message in WhatsApp. It does not send email or store submissions. Phone and email links are also available. A backend email integration can be added later if required.

## Content import

The one-time importer is `scripts/migrate-content.py`. It requires Python and `beautifulsoup4`; neither is needed to run the website. To re-import, first restore the original HTML files to their previous locations. Run it only when intentionally re-importing, as it replaces `src/content/site.json`.

## Deployment

Use a host that supports the Next.js Node runtime. Build with `npm run build`, then serve with `npm start`. The app is not configured as a plain static export because it uses Next.js image optimisation and server redirects. Nothing has been published or changed on the live domain.

Before deploying under a different domain, update the metadata base URL, sitemap, RSS feed URL and robots sitemap URL in `src/app/`.
