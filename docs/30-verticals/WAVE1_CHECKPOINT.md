# Wave 1 checkpoint: 2026-11-23

Repository: mykholy/mavvix_demos
Feature branch: feat/mavvix-30-verticals
Draft PR: https://github.com/mykholy/mavvix_demos/pull/2
Initial base main SHA: 1ae79d8c29861c28a3f5ad450c2712a99e4a8361

## Actual implemented scope

Eight original sites preserved without changing their existing table checks or service flows.

1. Auto Service — Torque Garage
- Distinct dark motorsport identity, 11 meaningful homepage sections and 8 domain service guides.
- Eight individual service detail pages, three authored educational articles and detail pages, seven industry guidance routes.
- Vehicle-specific enquiry form, validation + consent, server-side SQLite save, idempotent MVX-AS reference, protected admin review.
- No live workshop, repair, diagnosis or booking confirmation.

2. Home Maintenance — Fixora Care
- Distinct light modular blue/yellow visual treatment and 12 meaningful homepage sections.
- Eight authored home service dossiers, eight service details, three authored educational guides, eight industry guidance routes.
- Three-step enquiry form, safety/coverage/visit preferences, consent, pending-only reference MVX-HM, persisted SQLite data and authorized lead review.
- No real technician dispatch, pricing, physical branches or emergency promise.

Other developments:
- A typed registry lists 30 immutable target slugs: eight existing marked live, these two in progress, and 20 planned.
- The showcase now lists 10 navigable implementations, not invented cards for unbuilt sites.
- Shared Mavvix contact dock, official mobile WhatsApp/call, qualified pending-only intake, admin filtering/notes/status and protected CSV export.
- Additive versioned migrations, removed fixed admin bootstrap, disabled historical default admin accounts.
- Added migrated SQLite unit tests and extended English/Arabic smoke tests for both new sites.
- Two CC0 public photo provenance manifests; live asset loading/optimized file self-hosting still unverified.

## Not completed (hard constraints)
- The other 20 sector websites do NOT exist yet.
- Playwright screenshots and visual browser QA, AR/EN responsive checks, 90+ Lighthouse, media self-hosting and real customer photo rights are not verified.
- Historical exposed secrets require rotation; Next.js 14.2.24 requires a patched upgrade and lockfile compatibility review.
- Owner/operator-specific services, addresses, pricing, professional profiles and live integrations are not available; no fabricated claims.
- No live advertisements, booking or payments.

## Remaining order (verbatim wave plan)
Wave 1: salon-spa, fitness, sports-venues, furniture, interiors-kitchens, nursery.
Wave 2: car-detailing, physiotherapy, veterinary, law-firm, accounting, travel-agency, events, logistics.
Wave 3: skin-clinic, diagnostics-lab, boutique-hotel, solar-energy, recruitment, wholesale.

## Release rules
Every further sector must pass clean migration+seed, unit, typecheck, build, route and workflow smoke, mobile/desktop and AR/EN UI review, data/security permissions, and image provenance. Do not mark planned sites completed, merge PR #2, deploy, buy ads or tell any consumer a hypothetical service is live.

## Verified progress refresh — 2026-11-23 23:57 EET

This section supersedes the earlier **2 in progress / 20 planned** counts above; those earlier paragraphs describe the initial checkpoint, not the current registry.

- Read current PR #2 metadata: **open, draft, not merged**, head `f17784fb1f801088be8e440c16df8bb78419909f`, base `main`. PR body and this older checkpoint are stale; do not treat their counts as current.
- Read the current `src/lib/verticals/registry.ts`: **8 original live, 6 additional in_progress, 16 planned**. The six are `auto-service`, `home-maintenance`, `salon-spa`, `fitness`, `sports-venues`, `furniture`. Registry status does **not** mean production readiness.
- GitHub Actions on the exact head `f17784fb1f801088be8e440c16df8bb78419909f`: [Source & Builds 45264321501](https://github.com/mykholy/mavvix_demos/actions/runs/45264321501) **completed/success** and [Real Browser & Visual QA 45264321907](https://github.com/mykholy/mavvix_demos/actions/runs/45264321907) **completed/success**. These are workflow conclusions, not a manual inspection of screenshots or a license/security sign-off.
- `package.json` still pins `next` and `eslint-config-next` to **14.2.24**. Upgrade both and regenerate the lockfile together, then prove full regressions on the exact upgraded commit. Do not edit only the manifest.
- **Next planned Wave 1 sector:** `interiors-kitchens`, followed by `nursery`; Wave 2 and Wave 3 remain planned. Before release, independently verify media source/rights, responsive visual crops, RTL, axe findings, SQLite/admin authorization, credential rotation and patched framework security.
- This checkpoint is documentation only. No new code, local test execution, merge, deployment or advertising is claimed in this refresh.

## Incremental QA checkpoint — 2026-11-24 01:54 EET
- Registry inspected on feature branch: 8 original `live`, **7 `in_progress`** (`auto-service`, `home-maintenance`, `salon-spa`, `fitness`, `sports-venues`, `furniture`, `interiors-kitchens`), **15 `planned`**. The next planned Wave 1 sector is `nursery`. In-progress does not mean released.
- Strengthened `scripts/verify-vertical-registry.mjs` with explicit bilingual brand metadata uniqueness and prevention of starting Wave 2/3 while earlier-wave sectors remain planned. This gate is already invoked by `npm run test:unit`.
- On previous SHA `68d067e`, [visual QA 45284110669](https://github.com/mykholy/mavvix_demos/actions/runs/45284110669) succeeded, but [Source & Builds 45284110594](https://github.com/mykholy/mavvix_demos/actions/runs/45284110594) was **cancelled**, not passed. Neither proves the new code passed. No local tests were run in this checkpoint.
- Next.js and eslint-config-next remain pinned to 14.2.24; patch upgrade plus lockfile, media rights, security and screenshot signoff remain blocking. No merge/deploy/ads authorized.
