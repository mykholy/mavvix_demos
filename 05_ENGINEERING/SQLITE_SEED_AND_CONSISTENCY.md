# SQLite data + seed protocol — cross-screen integrity

## Golden rule
Every filter and detail view, comparator, admin edit, request and receipt uses persisted domain records from one DB/read-model contract. JSON starter seed files are inputs to `db:seed`, not a second live database. No random data on render and no duplicate record lookup from inconsistent files.

## Seed quotas — MUST PASS before demo release
| Vertical | Domain data | Supporting editorial | Workflows |
|---|---|---|---|
| Construction | 12 projects, 7 services, 4 media per major project | 6 posts, 6 FAQs | 3 RFQ requests sample |
| Industrial | 24 SKUs, 5 categories, 4 grades, min/MOQ/variants | 6 technical posts, 3 datasheets | 3 RFQ with line items |
| Real Estate | 5 developments, 24 units, mixed status/price/area | 6 neighborhood guides | 3 viewing requests |
| Dental | 10 services, 6 practitioners, 3 concept branches | 8 guides, 10 FAQs | 3 appointment preferences |
| Ecommerce | 24 products, ≥60 variants, ≥5 out-of-stock | 4 stories, 3 promotions, 3 shipping rules | 3 example orders |
| Portfolio | 12 case studies with image galleries, 7 services | 6 articles, 8 FAQs | 3 briefs |
| Restaurant | 30 dishes, 6 categories, 12 modifiers, 3 branches, 14 sample slots | 4 food articles, 10 FAQs | 3 orders, 3 table requests |
| Academy | 12 courses, 8 instructors, 60 lessons, ≥24 previews, ≥72 quiz questions | 6 resources, 8 FAQs | demo progress and interest requests |

## Identity/localization
For every record used on screen, material localized text in Arabic and English: name, descriptions, all error labels and alt text. Detail records need multi-paragraph copy and coherent illustrations. No lorem ipsum, 10 identical descriptions or headings with only category replaced.

## Reference invariants
- Every catalog item references existing category and image; every listing references existing development; every lesson references existing course, quiz references existing lesson.
- Property listed price, compare price and viewing form price display identical. If admin marks unit unavailable, detail/search/request respect that immediately.
- Product selected variant stock/price must match cart and server checkout receipt; expired promo code rejected server-side; shipping zone total deterministic.
- Industrial SKU grade, packing unit and MOQ match detail/spec PDF and RFQ basket; compare handles missing field as n/a.
- Restaurant allergens/dietary attributes are not guessed from images; dish price + modifier cost * qty = sample subtotal.
- Academy syllabus and preview routes point to actual published lessons; quiz score and progress persist; public content cannot reveal unreleased lessons.
- Test reset is isolated; no leaking demo submissions across guest sessions, sites or runs.

## Database details
- SQLite PRAGMAs enforced per connection (foreign_keys, busy_timeout); migrations safe/idempotent; WAL, private path from env and persistent Node volume.
- Use prepared statements/Drizzle with transaction for multi-item submissions and publish workflow. Unique constraints, indices and input whitelisting. Never write data under `public`.
- Use TTL 7 days for guest sample submissions. Avoid collecting real health info or actual payment info. Prefer generated sample identities and explain demo-only purpose.
- Seed command supports repeat: `db:seed` upserts by immutable id and does not wipe admin edits or simulated requests without explicit `db:reset --demo-only` approval.
- Provide at least 3 scenario-fixture IDs per vertical with expected filter count/receipt result in `tests/fixtures`; use concrete known IDs after seed generation.

## Image treatment
All images are actual licensed files/generated assets, not HTML gradient rectangles masquerading as product photography. Log missing assets and prevent demo release until hero, listing and detail image sets are complete. A product's same SKU/color needs a consistent image series, industrial diagrams need coherent dimensions, property plans match area labels. Collect source/rights metadata.
