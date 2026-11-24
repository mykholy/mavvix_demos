# Release blockers & current truth — 2026-11-24

## Verified GitHub snapshot at 2026-11-24
- Main branch is still `1ae79d8c29861c28a3f5ad450c2712a99e4a8361`. Draft PR [#2](https://github.com/mykholy/mavvix_demos/pull/2) is open and **not merged**; current feature head at audit `cf285ee009d1289abf7599464037272243facfbb` (subsequent fix commits may advance it).
- The actual Git tree contains **18 industry homepage directories** and the typed registry contains exactly **8 `live` original sites, 10 `in_progress` added sites and 12 `planned` sites**. Counts below supersede all historical 17/13, 8/2/20 and stale descriptions in other checkpoint documents.
- **Eight original sites:** construction, industrial, real-estate, dental, ecommerce, portfolio, restaurant, academy.
- **Ten additional source implementations, pending release gates:** auto-service, home-maintenance, salon-spa, fitness, sports-venues, furniture, interiors-kitchens, nursery, car-detailing, physiotherapy.
- **Twelve not implemented:** veterinary, law-firm, accounting, travel-agency, events, logistics (Wave 2) plus skin-clinic, diagnostics-lab, boutique-hotel, solar-energy, recruitment, wholesale (Wave 3).
- GitHub Actions on source SHA `cf285ee`: [Source & Builds 45340391309](https://github.com/mykholy/mavvix_demos/actions/runs/45340391309) **success**; [Real Browser & Visual QA 45340391405](https://github.com/mykholy/mavvix_demos/actions/runs/45340391405) **failure** for: color contrast on AR/EN physiotherapy privacy mobile/desktop; missing image on EN furniture gallery mobile/desktop. No release signoff.
- A replacement CC0 editorial living-room image URL was committed to `src/lib/verticals/furniture/data.ts` at SHA `1d966025`, and actionable a11y failure selectors were added to `scripts/visual-qa.mjs` at SHA `f57ab962`. Both need passing CI/browser evidence on their exact head before they are accepted.
- The historical top-of-PR title and older `WAVE1_CHECKPOINT.md` contain earlier counts and are not an authoritative latest-status source.

## Hard gates before merging, exposing real leads, or publishing ads
1. Close exact-current Chromium/axe/furniture-image failures and rerun complete CI, then manually inspect screenshots for all ten new industry verticals.
2. Implement and test the remaining **12** original sector experiences (6 Wave 2, 6 Wave 3). Never mark planned content built or render fake showcase placeholders.
3. Migrate Next.js 14.2.24 to a supported patched release; update `next` and `eslint-config-next` with a freshly generated npm lockfile and match React 19/App Router asynchronous request APIs where required. Use codemod, migrate Next 16 `middleware`→`proxy`, update `next lint` script, and rerun the complete suite. Do not only change package.json.
4. Rotate any credentials historically committed to Git and coordinate history cleanup; test admin/read/write permissions, CSRF origin, consent, retention/deletion and rate limiting behind a trusted proxy.
5. Verify original source and rights of every external photo, whether thumbnail renders and remains expressive on mobile. **No media manifests were found for furniture and interiors-kitchens** in the last inspected Git tree; generate proper evidence or replace unsafe/unlicensed photos. Never infer real showroom ownership from a Commons image.
6. Browser visual QA on all sector home and representative detail pages, manual 360/390/768/1024/1440 RTL/LTR screenshot review, keyboard focus, mixed-direction text and safe-area CTA; record actual a11y violations and repair them.
7. Production SEO: verify public origin, canonical/hreflang, robots index policy, sitemaps, Article/Service structured data where facts are verified. Concept brands must not masquerade as real operators.
8. Production handoff: owner-owned media/product data and policies, isolated per-client DB and credentials, domain/SSL, backups, deployment secret management, real booking/CRM/payment connections only if contracted. Mavvix showcase test data is not real customer orders.
9. Finishing pack: source facts matrix, 30-sector URL directory, 30 marketing briefs and 3–5 sector ad pilot, `FINAL_AUDIT.md` with test links/screenshots and unresolved owner-provided data.

## Main release rule
No automatic merging or ads while any security/visual/quality blockers remain. The user granted general merge approval, but release acceptance is contingent on actual tests and source-backed evidence. The PR being technically mergeable does not establish production readiness.
