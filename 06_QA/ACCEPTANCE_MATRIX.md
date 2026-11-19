# V2 eight-site acceptance matrix — BLOCKING, evidence required

| Dimension | Must pass for EACH of the 8 sites | Required evidence |
|---|---|---|
| Page coverage | 100% route patterns from vertical document; AR/EN direct refresh and dynamic details | Route table & Playwright route sweep |
| Real interactions | Every visible control works; 3 sector flows including invalid state | E2E video/log and DB assertions |
| Sector expertise | Correct search/filter/units/status and rich domain-specific pages | Screens + data consistency tests |
| Content richness | Seed quotas met; AR and EN unique copy; detail pages not repeated boilerplate; blog articles actually exist | Count queries, copy review |
| Real persistence | SQLite request/order/progress saved with correct type/line items, session ownership; server rejects invalid input | Integration test read-back |
| Admin editing | Login and site-scoped CRUD, drafts, publish, archive, rollback, submissions review | Auth and publish E2E |
| Visual distinction | Distinct page compositions, navigation and images; editorial grade across all screens | Design audit / screenshots |
| Responsiveness | No overflow at 320/390/768/1024/1440/1920px; functioning mobile overlays | Playwright screenshots and viewport assertions |
| Localization | AR/EN locale mapping on deep detail, RTL icons, translated errors/alt/SEO | Locale sweep |
| Accessibility | Keyboard menu/dialog, focus return, proper labels, visible errors, reduced motion | axe and keyboard manual log |
| SEO | Showcase indexable; concept previews noindex; meta OG, semantic landmarks | Metadata tests |
| Authenticity | Demo labelled, no fabricated case clients/reviews/certifications, no false booking/order/medical outcomes | Manual claim audit |
| Security | No public db, no real PIIs, origin/rate limits, proper auth and ownership on admin and demo receipts | API negative tests |
| Runtime | Real Node+SQLite with persistent database, migrations, seed idempotence, build success | Script logs and restart smoke |
| Sales readiness | Accurate preview screenshots and demo CTA to Mavvix, no links to unavailable sites | Marketing walkthrough |

## Strict signoff
PASS only if critical tests=100%, no P0/P1 blockers, all core routes functional, and screenshots visually reviewed. At least 15 meaningful assertions per vertical PLUS the per-route and per-flow cases in machine QA matrix. Do not use fake Lighthouse scores or fabricated screenshots. Any missing admin/write/persist route is PARTIAL, not DONE.

## Realism score (assessed from actual browser, not code appearance)
Per demo 0-5 each: sector relevance, visual identity, detail depth, functional flows, data coherence, mobile RTL, English copy, admin CMS, stability, accessibility. Minimum 4/5 each and >=44/50 total. Scores are internal QA estimates, not external business performance claims. If below gate, iterate.
