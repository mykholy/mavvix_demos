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
