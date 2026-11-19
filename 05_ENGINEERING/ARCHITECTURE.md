# Next.js + SQLite reference architecture

## Decision
This kit is for an interactive demo gallery, not yet a production site-builder. Default use typed local fixtures for public catalogs. Add minimal server-side SQLite only for demonstrable **saved** quote/request/order flows, where persistence benefits the experience; do not build a universal CMS yet. Production CMS/tenancy intentionally out of scope.

## Technology
Next.js App Router, React + TypeScript strict, Tailwind CSS, CSS variables per design theme, small accessible UI primitives, icon library, minimal motion, Playwright end-to-end, a11y checks. Use currently stable compatible versions verified in actual package docs. Prefer pinned lockfile after installation. SQLite with Drizzle ORM or simple SQLite prepared statements, migrations and seed script on a **persistent Node runtime**. For demonstration traffic the SQLite file should be in a private writable volume; never under `/public` or versioned in Git.

## Critical static-vs-SQLite distinction
**Path A (recommended for complete interaction):** Node-hosted Next app + server route handlers + private SQLite file. Host on persistent filesystem, restrict file permissions, backups, no real PII collected in demo. Use input validation, rate limit public demo requests and retention cleanup. This requires runtime server and persistent volume.
**Path B (zero-ops static hosting):** pre-render public pages from local fixture files, use client localStorage for cart/favorites/compare and **clearly simulated, non-persisted** requests; NO SQLite / server APIs / dynamic runtime routes. Static export requires generated routes with `generateStaticParams` and does not support arbitrary writable APIs. Document trade-offs.
Don't tell the visitor a request was submitted to a real business; public demo forms should show simulation mode in either path. Keep actual Mavvix sales link separate.

## Suggested source tree (Gemini should create)
```text
src/
  app/
    [locale]/
      demos/page.tsx                     # Mavvix gallery
      preview/
        construction/...                # home, services, projects, request-quote
        industrial/...                  # products, sku detail, rfq
        real-estate/...                 # listings, compare, request-viewing
        dental/...                      # doctors, services, appointment request
        ecommerce/...                   # collections, product, cart, checkout
        portfolio/...                   # work, project, contact
    api/demo-requests/route.ts          # ONLY in Node + SQLite mode
  components/
    mavvix/                               # brand-safe showcase UI
    accessibility/
    forms/
  demos/
    construction/                          # genuinely independent theme components
    industrial/
    real-estate/
    dental/
    ecommerce/
    portfolio/
  lib/
    i18n/
    db/                                   # server-only SQLite helpers
    demo-fixtures/
    validation/
    media/
  styles/
    themes.css
  types/
  tests/e2e/
public/
  mavvix/                                 # copied official logo assets from kit
  demo-assets/
progress/
```

## Separation rules
- One shared host app with per-demo layout shells/route groups, not 6 independent build chains unless benchmarking shows necessity.
- A theme registry maps demo slug to palette/typography, nav architecture, canonical URLs, default locale and required content modules. Data fixtures have strongly typed fields rather than arbitrary invented content.
- Shared i18n, form validation, media optimization, accessibility components; **sector-specific content and meaningful structural components stay inside each demo package**.
- Client-only for interactivity; server components for list/detail content where feasible. Avoid making the entire site one giant client component.

## Data flow
UI -> typed domain query -> local fixture (read-only), OR API route -> Zod validation -> SQLite prepared query/ORM -> success/error result. `demo` mode must be clear in response. Read-only seed fixtures are the source of truth. No hidden outbound email/WhatsApp/Stripe/Meta.

## Security
Input min/max, enums, email syntactic validation where demo forms include it, string normalization, server rate limiting, basic anti-abuse/honeypot, no external file uploads by public visitors, SQL parameterization, CSRF/origin controls for state-changing requests where applicable, no real payment/patient info, CORS not wildcard by default. Don't store medical symptoms, actual addresses, national IDs. Logs must not dump raw form content.

## SEO and locale
- For each public Showcase route: localized metadata, sitemap and canonical.
- For all fictional demo routes: `noindex,follow` and do not include in public sitemap; allow actual demo visits. Don't add contradictory robots.txt blocking preventing noindex processing.
- Avoid fictional Google Business or reviews structured data.
- `lang=ar` / `lang=en`, `dir=rtl` / `dir=ltr`, locale switch preserving compatible current route. Test bidirectional numbers/currency. Proper title/description for each section.

## Deploy / ops
- Node.js runtime with writable disk for SQLite mode. Database path environment variable `SQLITE_DB_PATH=./data/mavvix-demo.sqlite` in local dev, use persistent mounted directory on deployment. `./data/` gitignored.
- Set `NEXT_PUBLIC_MAVVIX_SALES_URL=https://mavvix.com/` initially or owner's verified direct service URL; never use guessed WhatsApp or phone numbers.
- Build process must include migration/seed, check current migrations safely, and have restart/backup plan; use WAL when appropriate for concurrency and ensure backup consistency.
- Traffic or concurrent writes beyond SQLite comfort: architect upgrade later; not necessary for concept demos.

## Common failure patterns and guardrails
- Using SQLite in browser: prohibited.
- Enabling `output: export` with writable API: impossible; choose one clear path.
- Running on stateless hosting without persistent volume and asserting data remains saved: prohibited.
- Shipping public SQLite database with real visitor PII: prohibited.
- Treating clicks as working when only an alert displays: for full-feature demos, implement meaningful state changes and appropriate route transitions.
- `rendered` or `visually nice` is not the same as `tested`; run E2E.
