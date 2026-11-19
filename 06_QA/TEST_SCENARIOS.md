# V2 executable Playwright + SQLite QA scenarios

1. Full bilingual route sweep generated from `04_DEMOS/BLUEPRINTS/*.json` routes; dynamic routes sampled with 3 distinct seeded IDs, refresh and back/forward. No 404, blank page, console error, dead visible internal links.
2. Screenshot probes at 320x740, 390x844, 768x1024, 1024x768, 1440x900, 1920x1080 for EACH of 8 home and important forms/details; RTL and LTR, 200% zoom, reduced motion. No unexpected horizontal overflow.
3. For each sector three domain journeys in its spec: record data BEFORE, run UI steps, assert UI state, request payload, SQLite record and admin queue after. Negative path checks validation and DB unchanged.
4. Admin: unauthenticated edits denied; a scoped editor cannot change another site; create/edit/draft/preview/publish/unpublish/rollback an entity and confirm public changes on refresh. Audit recorded.
5. Construction: filters sector+area, compare gallery, scope wizard back/review/invalid area, persisted request linked to project and services.
6. Industrial: SKU grades/units, 2 lines in RFQ with pack multiples and MOQ, correct spec comparison, generated datasheet matches source, invalid qty rejected.
7. Real Estate: 24 unit filter, 3 max compare, unavailable unit inaccessible for viewing, instalment estimate exact formula with disclosed rate, viewing is REQUEST only.
8. Dental: 10 services and 6 clinicians, deep locale links, first-visit guide, request future preference but NO actual appointment; sensitive info fields absent and server rejects unsupported input.
9. Ecommerce: select sold-out variant disabled, select available variant and add qty 2, same SKU/variant merges, different variant separate, coupon valid/expired/restricted, shipping pricing server recomputed, simulated checkout creates safe session-protected receipt, no card UI.
10. Portfolio: 12 cases with unique deep case bodies; search+filter+grid/list, image annotation, brief prefills, workflow persisted, back retains filters.
11. Restaurant: allergen filter matches seeded metadata, dish modifiers accurately reprice, restaurant order saved as simulated, unavailable sample table slot rejected, party size validated.
12. Academy: course filter, curriculum links to released preview lessons, navigate chapters, score quiz 3/4 =75%, progress survives session reload, interest request not enrolled/payment.
13. Blog/CMS each vertical: draft post not public, publish appears in index & detail, SEO metadata updates, rollback restores earlier version, no cross-site link corruption.
14. Security: DB private path not accessible from web, static asset references safe, SQL prepared, overlarge form rejected, guest receipt not readable using another token, rate limiting 429, admin cookie HttpOnly, idempotent resubmission no duplicates.
15. Seed: run `db:seed` twice and compare counts, no duplicate IDs, FK check returns no issues; test database reset only explicit DEMO_MODE.

**Evidence:** save test filename, command, stdout/stderr, exit status, screenshot paths, browser version, and actual date. No "passes" based on reading code only.
