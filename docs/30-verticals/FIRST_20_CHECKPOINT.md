# First twenty Mavvix verticals: code milestone, not public release

Snapshot date: 2026-11-24. Milestone branch: `feat/mavvix-30-verticals`; Draft PR [#2](https://github.com/mykholy/mavvix_demos/pull/2).

## Scope counted

Exactly **20 sector web experiences implemented in source**; **8 original** sectors + **12 newly developed** with distinct design, Arabic+English content, domain-specific routes, and recorded request workflows:

| # | slug | brand | status / notable implementation |
|---|---|---|---|
| 01 | construction | Atlas Structures | Legacy preserved |
| 02 | industrial | Ferroline | Legacy preserved |
| 03 | real-estate | Meridian Residences | Legacy preserved |
| 04 | dental | Lumen Dental | Legacy preserved |
| 05 | ecommerce | Noria Atelier | Legacy preserved |
| 06 | portfolio | Salma Studio | Legacy preserved |
| 07 | restaurant | Saffron Table | Legacy preserved |
| 08 | academy | Nova Learning | Legacy preserved |
| 09 | auto-service | Torque Garage | Automotive inspection request |
| 10 | car-detailing | GlossBay | Treatment add-ons/vehicle-size enquiry |
| 11 | fitness | Pulse District | Membership & trial enquiry |
| 12 | salon-spa | Velora Beauty | Speciality & service-duration preference |
| 13 | physiotherapy | Motion Lab | Privacy-first movement assessment |
| 14 | veterinary | PawWell | Pet species & care request |
| 15 | nursery | BloomSteps | Child age-band & parent visit enquiry |
| 16 | sports-venues | Arena Courts | Sport, court and match-time preference |
| 17 | furniture | Oakline Living | Material & furniture RFQ |
| 18 | interiors-kitchens | Forma Atelier | Kitchen configuration and brief |
| 19 | home-maintenance | Fixora Care | Three-stage issue/urgency/coverage intake |
| 20 | law-firm | Lexora Counsel | Confidentiality-minimal legal practice enquiry |

**The registry intentionally keeps twelve new experiences `in_progress` while release gates are pending; this is not 20 live businesses or deployed client sites.** Existing eight are `live` only relative to the original portfolio baseline. No operator has confirmed sample practices, staffing, fees, results, properties, legal services or actual bookings.

## Current final QA
- All build and visual runs must pass on the **exact final head SHA** before PR #2 can merge; note older red CI from mid-implementation must not be confused with the final evaluation.
- Every site has real authored AR/EN pages and API/SQLite persisted pending-only reference. Automatic tests cover major routes and a request; actual external service booking/payments and fulfillment are *not* integrated.
- Lexora: 11 substantive homepage sections; eight original law practice dossiers and details; 3 articles and detail routes; 5 FAQs, 8 major editorial sections, privacy-first form with no case narrative, opposing-party identities, case numbers, documents, jurisdiction-based legal advice or invented lawyer biographies. `MVX-LEX-*` idempotent pending-only receipt.
- Fixed showcase sales WA link to centralized legitimate Mavvix contact (201062015302) and removed unsupported 48-hour delivery claim.
- CC0 law books from Wikimedia Commons, credited David Whelan: accurate description explicitly says *Canadian law books*; image URL loading and crop are separately subject to browser QA.

## PR split on 20 / next ten
Do **not** add further sector implementations to PR #2. Once its exact-head gates pass, merge after review. Work on the ten remaining sectors in a separate feature branch / separate PR based on approved 20-site code:
1. `accounting` (LedgerPoint)
2. `travel-agency` (Nomad Routes)
3. `events` (Luma Events)
4. `logistics` (RouteLine Cargo)
5. `skin-clinic` (Elyra Skin)
6. `diagnostics-lab` (ClearPath Labs)
7. `boutique-hotel` (Oasis & Co)
8. `solar-energy` (VoltEdge Energy)
9. `recruitment` (Talentyx HR)
10. `wholesale` (TradeBridge)

The new PR should target `main` once PR #2 merges. If temporarily stacked, target PR #2 feature branch and retarget only after merge.

## Public launch blockers; no claim of production readiness
- Next.js 14.2.24 is unsupported; upgrade to maintained/patched supported Next.js with updated lockfile and repeat all 20/30 sector test runs.
- Obtain actual mobile/desktop screenshots and inspect broken image URLs, accurate topical rights, legible font and RTL/a11y; no CI claim of visual pass unless artifacts examined.
- Rotate historical exposed credentials and review data privacy/consent/retention in real deployments, security of public API, proxy-safe rate limit, storage backups and production webhook integrations.
- Verified public portfolio origin and canonical/SEO gate, real business client-approved content, actual licensed photos.
- Do not publish ads or live provider claims. Client work needs provisioned independent DB/domain and owner-approved operator facts.
