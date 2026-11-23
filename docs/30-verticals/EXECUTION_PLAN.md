# 30-vertical execution plan — authoritative staged checkpoints

Source of truth: uploaded **Mavvix 30 Premium Verticals Master Prompt 2026-11-22** (BEGIN/END MASTER PROMPT) and immutable current `main` baseline.

## Completed baseline
- Original eight already built: `construction`, `industrial`, `real-estate`, `dental`, `ecommerce`, `portfolio`, `restaurant`, `academy`.
- This branch starts from `1ae79d8c29861c28a3f5ad450c2712a99e4a8361`. Audit precedes significant changes.

## Delivery sequence (exact 22 additions)
- Wave 1: `auto-service`, `home-maintenance`, `salon-spa`, `fitness`, `sports-venues`, `furniture`, `interiors-kitchens`, `nursery`.
- Wave 2: `car-detailing`, `physiotherapy`, `veterinary`, `law-firm`, `accounting`, `travel-agency`, `events`, `logistics`.
- Wave 3: `skin-clinic`, `diagnostics-lab`, `boutique-hotel`, `solar-energy`, `recruitment`, `wholesale`.

## Gates per site
1. Real research: at least three public comparable operators; cite dated URLs, strengths, uncertainties, and local search intent. No invented market numbers or ad screenshots.
2. Domain and art direction: individual palette, typography, original editorial voice, real photo provenance, custom hero/section rhythm; at least nine substantial home sections, four industry-only.
3. At least seven substantial inner page families, three+ authored detail dossiers, eight useful products/services (unless specialist category justified), five FAQs, three original resource pieces per locale.
4. Fully functional enquiry: explicit nonconfirmed status, validated typed payload (no dangerous data), trustworthy rate limit layer, SQLite persistence, reference, authorized admin, error/duplicate handling, anti-CSRF where session applies.
5. Test clean migration on new and already populated DBs, AR/EN HTTP, unit + abuse + admin permissions, mobile and desktop visual QA, a11y/RTL; publish actual logs/screens.
6. Complete one sector, run CI, then advance. No generic template farm, no fake photos/real-world business assertions.

## Architecture direction
- `src/lib/verticals/registry.ts`: 30 records; launch state reflects real implementation; never display a placeholder as functional.
- Versioned SQLite migration for additional verticals and requests; preserve existing schema CHECK constraints for original sectors.
- Per-sector `src/lib/verticals/<slug>/data.ts` with AR/EN domain content, independent visual tokens and authored articles; bespoke page implementations under `src/app/[locale]/preview/<slug>`.
- Shared input/repository/auth/rate primitives, not cloned surface layouts.
- Expand Mavvix contact labels, admin queue and showcase only when a vertical has routes and a tested workflow.
- Canonical test fixture identifiers use `.invalid` addresses and isolated DB. Never contact sample businesses.
- At full completion, only then enable final 30-site catalogue, marketing pack and final audit; this plan is not a claim of completion.

## Checkpoints
| Gate | State | Evidence |
|---|---|---|
| 0 / GitHub source baseline | complete | `BASELINE_AUDIT.md` |
| 0 / versioned migration | code complete and CI green | 0001–0004 migrations + populated SQLite unit test |
| Wave 1 / auto-service | code complete, automated gates green; visual QA pending | 11 sections, 8 services, AR/EN routes and persisted enquiry; [CI 45093752728](https://github.com/mykholy/mavvix_demos/actions/runs/45093752728) |
| Wave 1 / home-maintenance | code complete, automated gates green; visual QA pending | 12 sections, 8 services, AR/EN routes, persisted enquiry; [CI 45093752728](https://github.com/mykholy/mavvix_demos/actions/runs/45093752728) |
| Wave 1 / six remaining | not implemented | independent designs, domain research, photos, business request tests |
| Wave 2 / eight | pending | none |
| Wave 3 / six | pending | none |
| patched supported Next.js | blocked pending lockfile and upgrade regression | existing Next 14.2.24 |
| media provenance | two CC0 source page/licenses verified, actual image response unverified | media manifests for auto-service and home-maintenance |
| browser screenshots / responsive audit | not performed | require real browser screenshots and human review |

## Commercial intent
The portfolio sells websites built **by Mavvix**, not actual mechanical/clinical/hotel appointments or fictional business services. Real Mavvix contact 01062015302, but the sample-site technical workflow should **not** push fictional requests into genuine live sales CRM.

## Automated checkpoint 2026-11-23
- GitHub Actions [45093752728](https://github.com/mykholy/mavvix_demos/actions/runs/45093752728) finished successfully on code SHA 4d9b108bce6beef823a0ed7cea2f4bd5a9b65b2a: **47/47 unit tests**, **240/240 generated static pages**, old **180 bilingual routes** and **8 legacy request flows**, plus **28 automotive and 30 Fixora AR/EN route checks** and persisted idempotent new-sector requests.
- Important: two newly implemented sectors remain tagged `in_progress` until real responsive visual/a11y/photography and patched Next security gate have passed. The other twenty remain `planned`.
- Draft PR #2 is unmerged, no public deployment/ads.
