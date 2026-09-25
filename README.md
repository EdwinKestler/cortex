# CORTEX site

Bilingual, private investor and marketing site for the CORTEX event-finance proposal. Spanish is the default. The site is informational, not an investment portal or public securities offering.

## Run

Requires Node 22+. `npm ci`, then `npm run dev`. Open the local Vite address. Run `npm test` for the model checks and `npm run build` for the static export in `dist/`.

Set `VITE_CONTACT_ENDPOINT` in `.env.local` when a reviewed inquiry endpoint exists (see `.env.example`). The browser POSTs validated JSON (`type`, `name`, `organization`, `country`, `role`, `size`, `message`, `consent`, `website`) to that URL. No endpoint is bundled by default: the submit button is disabled and the page says that delivery is unavailable. Protect the endpoint with server-side validation, rate limits, storage and privacy controls; the honeypot and client validation are only first-line measures. Never place credentials in a Vite environment variable.

## Deploy

The static `dist/` tree contains an HTML entry for every Spanish and English route, metadata per page, `sitemap.xml`, and a private-mode `robots.txt`. It can be served by any static host. The included Dockerfile builds the export and runs nginx on port 8080 for Cloud Run. To run locally: `docker build -t cortex-site . && docker run -p 8080:8080 cortex-site`. On Sites the project is private by default. Public launch requires a separate legal and access-control review; update `robots.txt` and sitemap origin then.

## Architecture

- `src/pages/Pages.tsx` contains the route sections.
- `src/components/` contains the interactive lifecycle, closed loop, forecast sample chart, waterfall, settlement paths, and form.
- `src/i18n/{es,en}.json` contains visible copy.
- `src/data/sample-events.json` contains **synthetic** sample curves. `func_id` is the stable mapping key. The Zod schema checks shape, progression, percentile order, and capacity. The example underwriting gate is deliberately illustrative.
- `src/lib/waterfall.ts` computes the ordered cash distribution. It does not value collateral, recoveries, taxes, or credit losses.
- `scripts/generate-pages.mjs` generates localized HTML entries and the sitemap. Any future generated exports belong under `app/static/exports/`.

## Evidence and assumptions

See [SOURCE_MAP.md](SOURCE_MAP.md) and [TODO.md](TODO.md). The source PDFs were supplied for this build; all market, fee and target figures are attributed to company material or labeled illustrative. The site uses no client keys and has no real event forecasts.
