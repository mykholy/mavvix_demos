# Release blockers & current truth — 2026-11-24

## What is actually in the repository
- Wave 0: 8 existing vertical websites.
- Wave 1: all 8 additional industries implemented with persisted request flows. These currently have registry status `in_progress` pending release/business verification.
- Wave 2: `car-detailing` (GlossBay) is now authored and wired for API/database and storefront. **Do not count as QA-complete until CI on its final commit is green.**
- Remaining after the GlossBay code addition: 13 planned sector implementations (7 other Wave 2, 6 Wave 3); total 17 structurally represented designs and 13 unbuilt.
- Open PR #2 remains Draft, **not merged**. Latest tested CI before GlossBay: `c957a36` passed 50 unit tests, 532 generated pages, extended route/flow smoke and Chromium screenshots.

## Hard gates before merging, exposing real leads, or publishing ads
1. Finish GlossBay 17th tests; fix typecheck, build, smoke and visual/a11y failures and run on exact latest SHA.
2. Implement and test the remaining 13 original sector experiences. Never mark planned content built or render fake showcase placeholders.
3. Migrate Next.js 14.2.24 to a supported patched release; update `next` and `eslint-config-next` with a freshly generated npm lockfile and match React 19/App Router asynchronous request APIs where required. Use codemod, migrate Next 16 `middleware`→`proxy`, update `next lint` script, and rerun the complete suite. Do not only change package.json.
4. Rotate any credentials historically committed to Git and coordinate history cleanup; test admin/read/write permissions, CSRF origin, consent, retention/deletion and rate limiting behind a trusted proxy.
5. Verify original source and rights of every external photo, whether thumbnail renders and remains expressive on mobile. **No media manifests were found for furniture and interiors-kitchens** in the last inspected Git tree; generate proper evidence or replace unsafe/unlicensed photos. Never infer real showroom ownership from a Commons image.
6. Browser visual QA on all sector home and representative detail pages, manual 360/390/768/1024/1440 RTL/LTR screenshot review, keyboard focus, mixed-direction text and safe-area CTA; record actual a11y violations and repair them.
7. Production SEO: verify public origin, canonical/hreflang, robots index policy, sitemaps, Article/Service structured data where facts are verified. Concept brands must not masquerade as real operators.
8. Production handoff: owner-owned media/product data and policies, isolated per-client DB and credentials, domain/SSL, backups, deployment secret management, real booking/CRM/payment connections only if contracted. Mavvix showcase test data is not real customer orders.
9. Finishing pack: source facts matrix, 30-sector URL directory, 30 marketing briefs and 3–5 sector ad pilot, `FINAL_AUDIT.md` with test links/screenshots and unresolved owner-provided data.

## Main release rule
No automatic merging or ads while any security/visual/quality blockers remain. The user granted general merge approval, but release acceptance is contingent on actual tests and source-backed evidence. The PR being technically mergeable does not establish production readiness.
