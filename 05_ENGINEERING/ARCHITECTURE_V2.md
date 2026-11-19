# V2 actual-working-demo architecture — binding technical choices

## 1. Product boundary
The deliverable is an eight-sector showcase + eight **real functional example websites** + protected editing/admin experience. Each looks and behaves like a completed bespoke client website with coherent data, but is visibly fictional and does not contact real third parties. Not just screenshots; not merely React prototypes; not a production multi-tenant SaaS.

## 2. Runtime recommendation and trade-offs
- One Next.js App Router workspace, React/TypeScript strict, server components for read pages and client islands for complex controls. Tailwind design tokens, accessible primitives, Motion only for purposeful movement.
- Node server with persistent private SQLite on a mounted disk; Drizzle or SQLite prepared statements. Stable migrations, safe seed idempotence, read models, indexes, atomic writes. `output: export` PROHIBITED for full working mode.
- Public pages use DB-backed content for verticals, and typed fixtures for seed/bootstrap; no single giant frontend JSON that ignores subsequent admin edits. SSR/ISR/revalidate safely on admin publish.
- Guest draft state may use localStorage; finalized demo quote/order/interest persists to SQLite in demo mode. Session token random, stored hashed in DB. Never expose another guest's private demo receipt by predictable id.
- Admin `/admin` requires credential verification and secure HttpOnly SameSite cookies and CSRF/origin protection. Seed credentials supplied at runtime in env and hash password using established library; NEVER use hardcoded public admin login. Public guided admin tour uses read-only sanitized records.
- No real payments, dispatch, booking confirmation, email/SMS/Meta/WhatsApp integration. No actual phone for fictional companies; no medical treatment advice or data collection.

## 3. Folder layout
```
src/app/[locale]/showcase/..       # commercial Mavvix catalogue
src/app/[locale]/preview/[vertical]/... # route groups with separate layouts per demo
src/app/admin/[vertical]/...       # protected editor/requests
src/app/api/demo/[vertical]/...    # real validated demo-only writes
src/domains/{construction,industrial,real-estate,dental,ecommerce,portfolio,restaurant,academy}/
  features/ components/ services/ repositories/ schemas/ seed/
src/components/shared/         # ONLY invisible primitives and accessibility
src/lib/{db,i18n,security,seo,media}/
src/styles/themes/            # separate tokens; prevent brand leakage
migrations/ seeds/ tests/{unit,integration,e2e,visual}/
public/assets/{mavvix,concept}/
progress/evidence/{vertical}/
```

## 4. Media and identity
Provide a per-vertical image plan covering every hero, gallery item, product and article. Use licensed or genuinely generated assets, record sources/rights, no broken hotlinks. Film-like art direction varies by sector. No fake staff portraits presented as licensed people, no unverified before/after clinical photos, no fake testimonials. Showcase uses authentic official Mavvix logo files only; concept demos use unique fictional wordmarks.

## 5. Page structure and localization
`/[locale]/preview/{slug}/...` where `[locale] in {ar,en}`. Each demo gets sector-specific route structure listed in `04_DEMOS`. Strict AR/EN editorial content on every detail page, menus, modals, forms, SEO and errors. `hreflang` pairing for gallery, `noindex,follow` for fictional preview routes; exclude previews from public sitemap. Locale switch preserves route params/query when possible; verify translated slug mapping if slugs differ.

## 6. Layering and service contracts
- Domain services handle filtering/quoting/booking/order arithmetic; React never directly mutates DB.
- Server Zod validation covers positive quantities, enums, dates, enabled status, and linked records; client validation matches but never replaces server rules.
- Transactions use SQLite for multi-line order/quote operations and request status. SQLite `WAL`, foreign keys ON, lock/busy timeout, safe migrations. Guest data TTL 7 days with purge command and no PII retention by default.
- Admin create/update/archive/publish modifies same records public queries use. Cache invalidation or dynamic reads ensures edit visibility. No decorative dashboard counts that aren't computed from DB.
- Audit mutation with admin actor/action; soft delete/publish safety; editorial revisions for rollback.

## 7. Security and deployment reality
Private SQLite not in `public`; persistent runtime volume, backups, file permissions. Never deploy SQLite to ephemeral serverless and claim persistence. Use rate limiting and CAPTCHA/honeypot if necessary without invasive tracking, safe URL handling, security headers, slug sanitization, protected admin routes. No screenshots/external vendors automatically uploaded. Production custom CMS/real-world integrations are separate scoped work.

## 8. Testable claims / no shortcuts
Implementation must provide `npm run db:migrate`, `npm run db:seed`, `npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint`, `npm run test:unit`, `npm run test:e2e`, `npm run test:a11y` (or documented equivalents). No `|| true` bypass; record real CLI output. Each main journey must have integration tests confirming SQLite write, read, status, and ownership. Every admin-edit acceptance must test resulting public page. Screenshots from actual running app — never image-only mockups.
