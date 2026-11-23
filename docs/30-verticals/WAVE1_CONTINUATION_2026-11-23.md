# Gate 0 / Wave 1 checkpoint — 2026-11-23 (latest manual continuation)

Repository: `mykholy/mavvix_demos`
Branch: `feat/mavvix-30-verticals`; review PR: https://github.com/mykholy/mavvix_demos/pull/2
Original branch base `main`: `1ae79d8c29861c28a3f5ad450c2712a99e4a8361`.

## Verified existing source
Eight pre-existing verticals kept intact. Do not replace their specialized flows with a generic template.

## Built source, not yet approved for live commercial deployment
| # | Vertical | Real authored data | Dedicated sector UX | Persistent enquiry |
|---|---|---|---|---|
| 09 | `auto-service` Torque Garage | 8 service dossiers, 3 guides | 11 sections, 7 subject routes, make/model intake | `MVX-AS`, pending |
| 26 | `home-maintenance` Fixora Care | 8 service dossiers, 3 guides | 12 sections, AC/plumbing/electrical and three-step intake | `MVX-HM`, pending |
| 12 | `salon-spa` Velora Beauty | 10 service dossiers, 3 guides | 11 quiet-luxury sections, practitioner-specialty preference | `MVX-VLR`, pending |
| 11 | `fitness` Pulse District | 9 authored class dossiers, 3 guides | 11 kinetic sections, class-level chooser, illustrative timetable | `MVX-PUL`, pending |

The API validates sector-specific values, consent and UUID idempotency, saves to an isolated `portfolio_requests` table and uses protected admin view. The visitor receipt does not confirm actual operating activity. These are branded Mavvix website CONCEPTS, not real consumer service businesses, client results, memberships or confirmed bookings.

**Progress:** 8 previously existing + 4 additional coded = 12 source site experiences; **18 new sector websites not built**. The central roster keeps the original 8 `live`, four new `in_progress`, and remaining 18 `planned`. Plans must not appear as live gallery entries.

## Evidence-driven quality work
- GitHub Actions source/unit/TypeScript/build/SQLite smoke checks: `Verify Mavvix Source & Builds`.
- Actual Chromium visual tests across AR/EN, widths 360/390/768/1440, with screenshots and axe, overflow, broken image and missing contact checks. QA for 8 original and first three new sites previously passed on [45198048804](https://github.com/mykholy/mavvix_demos/actions/runs/45198048804). The fourth sector must pass an updated latest-head run.
- Wave 1 has documented public sources in `research/{auto-service,home-maintenance,salon-spa,fitness}.md` and image licensing in matching `media/*.media-manifest.json` files.
- Mavvix official contact dock is shared and mobile fixed; all sample requests remain distinct from real Mavvix sales contact.
- Localized Mavvix `/ar/showcase` and `/en/showcase` now have explicit description, social sharing metadata and safe canonical/hreflang configuration. A robots/sitemap release switch indexes only a verified owner-approved showcase HTTPS origin; sample businesses stay noindex.

## Current release-blocking tasks
1. **Next.js security:** repository still pins `next@14.2.24` and `eslint-config-next@14.2.24`, unsupported and affected by published advisories in Nov 2026. Need a compatibility-reviewed upgrade to supported patched Next v16 LTS with a rewritten lockfile, migration of async App Router APIs, all route tests and fresh build. Do NOT merge publicly deployable code while this remains unpatched.
2. Source photos use licensed real Wikimedia Commons equipment/interior images but hotlink original sources. Before public deployment, validate HTTP bytes/dimensions/artist/license and self-host optimized responsive WebP/AVIF where possible; substitute owner-owned actual location and staff media for sold clients.
3. Fix any latest-head axe failures and review screenshots manually for AR/EN, sticky CTA overlaps, direction, font loading and subject accuracy. Don't claim Lighthouse 90/100 unless measured.
4. Need privacy/legal release review: operator terms, data retention & deletion, consent-driven Analytics/Meta events, production lead separation, domain/SSL/tenant provisioning runbook.
5. Owner did not authorize publishing ads or messaging customers. PR #2 is still Draft and unmerged. User has asked for code review/merge when verified; never merge a failing or unsupported release branch.

## Remaining factory sequence
Wave 1: `sports-venues`, `furniture`, `interiors-kitchens`, `nursery`.
Wave 2: `car-detailing`, `physiotherapy`, `veterinary`, `law-firm`, `accounting`, `travel-agency`, `events`, `logistics`.
Wave 3: `skin-clinic`, `diagnostics-lab`, `boutique-hotel`, `solar-energy`, `recruitment`, `wholesale`.

For every further site: 3 cited real providers, 8+ independently authored entities and original details, 3 original resource pieces, no invented owner facts, distinct art direction and fonts, >=9 meaningful homepage sections, >=7 inner route families, full AR/EN, sanitized/validated server flow, persisted idempotent receipt, authorized admin, real browser/a11y/SEO/media checks.

## Source hierarchy
Master: `Mavvix_30_Premium_Verticals_COPY_PASTE_2026-11-22 (1).txt`, the user-provided BEGIN/END MASTER PROMPT. No developer/automation should override its anti-fabrication and quality constraints.
