# V2 execution order — eight complete full-stack demo vertical slices

Milestone 0: Workspace inspect, node versions, package compatibility, existing code preservation, run baseline checks, write `progress/STATUS.md`, set up lint/typecheck/build and Playwright, implement design and route registry and Docker/local Node guidance.

Milestone 1: V2 SQLite migrations/seed, server-only repositories and domain contracts, persistent disk, secure admin login/bootstrap from env; bilingual layout foundation; legal/demo notice; Showcase scaffold that lists ONLY actually complete demo sites.

Milestone 2: Construction — all routes in `04_DEMOS/01_CONSTRUCTION.md`; 12 real seeded cases, scope form and SQLite submit, admin CRUD+publish, screenshot first fold/detail/form, tests and repair. Add card when passes.

Milestone 3: Industrial — 24 SKUs, filters/compare/spec/RFQ multi-line transaction, admin and tests/screenshot. Add card when passes.

Milestone 4: Real Estate — developments/24 units, filters/favorites/compare/estimator and viewing request, admin and tests/screenshots. Add card when passes. At this point the first three may be previewed to prospects after QA.

Milestone 5: Dental — full services/clinicians/patient guide/appointment requests, no sensitive data, admin/test/screenshots.

Milestone 6: Ecommerce — 24 products/60+ variants, accurate cart & discounts/shipping, simulated checkout, admin and tests/screenshots.

Milestone 7: Portfolio — 12 full case studies and articles, inquiry intake, admin and tests/screenshots.

Milestone 8: Restaurant — 30 dishes with modifiers, allergens, real demo cart/order, example table requests, admin and tests/screenshots. NOT OPTIONAL.

Milestone 9: Academy — 12 courses, 60 lessons, quiz/progress persisted, enrollment interest request, admin and tests/screenshots. NOT OPTIONAL.

Milestone 10: Consolidated showcase: actual screenshots, real links, sales CTAs, 8 cross-demo design differentiation audit, SEO/i18n/RTL performance & a11y matrix, all routes visited, source and license review, simulated submission retention and backups.

## Definition of milestone success
The completed vertical meets ALL routes and 3 flows, SQLite persistence, admin update, bilingual, 320/390/768/1440 responsiveness, E2E screenshots and documented QA. A homepage demo is always PARTIAL. DO NOT "complete" via disabled CTAs, browser alerts or screenshots pretending working behavior.

## Checkpoint protocol
After every milestone update `progress/STATUS.md` with counts and routes, `progress/QA_LOG.md` real command/exit code, `progress/DECISIONS.md`, `progress/NEXT_STEPS.md`, screenshots in `progress/evidence/{demo}`. If tools or time unavailable checkpoint and stop truthfully; use `00_AGENT/RESUME_PROMPT.txt` later.
