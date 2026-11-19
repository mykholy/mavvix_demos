# MAVVIX — PRODUCTION-GRADE EIGHT-DEMO FACTORY — GEMINI FLASH MASTER CONTRACT (V2)

> You are NOT being asked for mockups, homepages, marketing screenshots, a generic template system or nice-looking front ends with fake functionality. You MUST deliver **eight complete, coherent, distinctive, interactive, responsive, bilingual, content-managed concept websites**, each capable of demonstrating customer-like industry workflows end to end, with persistent SQLite state for transactions and protected content management. All eight are fictional demonstrations, not paying-client case studies, and must never process real payments or promise real bookings.

## 1. Mission and authority
Act as a full agency team: creative director, conversion strategist, frontend principal, backend/SQLite engineer, domain expert for each vertical, UX researcher, Arabic editor, accessibility specialist, SEO lead, quality engineer, security reviewer and technical producer. Your output must be **executable source code** in a connected filesystem and a passing test/build suite. Do not merely write plans, describe page sections or give instructions back to the user.

Use files in this ZIP as strict specifications. This V2 prompt supersedes any legacy wording that calls Restaurant or Academy “optional”, recommends no backend for mandatory flows, or tolerates a visual-only gallery. All 8 are mandatory for the final complete release. You may release completed subsets as **phased previews**, marked partial, while continuing the remaining milestones.

## 2. Precedence and reading order
1. This MASTER_IMPLEMENTATION_PROMPT.md (V2) + `README_START_HERE_AR.md` + `00_AGENT/START_WITH_THIS_PROMPT.txt`.
2. `01_PRODUCT/PRODUCT_REQUIREMENTS.md`, `03_PLAN/BUILD_ORDER.md`, `03_PLAN/DEFINITION_OF_DONE_V2.md`.
3. `02_DESIGN/DESIGN_SYSTEMS.json`, `02_DESIGN/VISUAL_QUALITY_RULES.md`, `02_DESIGN/CONTENT_AND_BRAND_VOICE.md`.
4. Each complete `04_DEMOS/*.md` (eight long files); machine-readable route/flow versions in `04_DEMOS/BLUEPRINTS`.
5. `05_ENGINEERING/ARCHITECTURE_V2.md`, `05_ENGINEERING/sqlite_schema.sql`, `05_ENGINEERING/SQLITE_SEED_AND_CONSISTENCY.md`, `05_ENGINEERING/API_AND_DOMAIN_CONTRACTS.md`, `05_ENGINEERING/ADMIN_STUDIO_REQUIREMENTS.md`, `05_ENGINEERING/BILINGUAL_SEO_MEDIA.md`.
6. `06_QA/ACCEPTANCE_MATRIX.md`, `06_QA/TEST_SCENARIOS.md`, `06_QA/RELEASE_GATE_V2.md`, `06_QA/MATRICES/*`.
7. `07_MARKETING/SHOWCASE_AND_AD_FUNNEL.md`, `07_MARKETING/SHOWCASE_SALES_EXPERIENCE_V2.md`.
8. `08_BRAND/MAVVIX_BRAND_RULES.md` and official files, `09_OPERATIONS/*`.
Do not skip to writing a generic template after reading only the README. When in doubt, a demo-specific requirement overrides shared UI generalization.

## 3. Autonomous execution with honesty
Inspect the repository first. Write a lightweight plan no longer than one pass. Start implementing immediately, make file edits, run builds and tests, review screenshots and fix defects. Continue from milestone to milestone **without asking for permission** for routine changes, until all eight meet acceptance or the session ends. After each milestone save exact progress/next actions to `progress/STATUS.md`, `progress/DECISIONS.md`, `progress/QA_LOG.md`, `progress/NEXT_STEPS.md`, with actual commands/outputs and open issues. If the host terminates or lacks tools, checkpoint; NEVER imply background execution or claim to have run tools that were unavailable. Ask for approval only for production deployment, paid resources, destructive ops, modifying unrelated repos or external integrations.

## 4. Non-negotiable product definition
Build these eight individually branded fictional business websites inside a single coherent full-stack app:
1. Atlas Structures — Construction & Engineering.
2. Ferroline Industries — Industrial & Export.
3. Meridian Residences — Real Estate.
4. Lumen Dental — Dental Clinic.
5. Noria Atelier — E-commerce.
6. Salma Hassan Studio — Portfolio.
7. Saffron Table — Restaurant.
8. Nova Learning — Academy.
Each **must** ship with all route patterns listed in its markdown brief; each route is available in `/ar` and `/en` including detail records. Per-vertical page inventory totals 10–13 route patterns. No route may show a repeated generic hero with three cards in place of substantive content.

## 5. Design originality — professional craft and coherent brands
- Use each vertical's design system in JSON. Different navigation architecture, type scales, image art direction, section rhythm, backgrounds, density, CTA shape and signature interactions. At least FOUR structural aspects visibly differ between any two verticals, not colors alone.
- Every homepage first fold must reveal what the fictional business offers and a meaningful next action. Design 2 above-the-fold alternatives, choose the better with reasoning and document in `progress/evidence/{slug}/design-review.md`. Then build the whole site, not just its hero.
- Layout each important detail page as its own editorial experience with accurate content context, coherent gallery and decision-making blocks. Intentional cards/tables are allowed only where the domain calls for them (ecommerce inventory, specs, properties). Avoid AI clichés: anonymous 3-column feature grids everywhere, giant floating gradients, pointless glowing blobs, endless stat counters, invented award logos, generic company history, lorem ipsum, identical stock photography across unrelated brands.
- AR/EN written idiomatically as actual on-site copy, not awkward literal translations. AR uses RTL-specific layout; EN proper LTR. Test numeric formatting, prices, measurements and punctuation, not just CSS direction.
- No false "made by human" claims. The goal is professionally art-directed results, not concealment of creation process. Use entirely fictional clients for demos, label examples clearly and never call them real projects in Mavvix portfolio.

## 6. End-to-end customer behavior
Every advertised interaction MUST work and be backed by coherent local data. Minimum three sector journeys from its brief, Playwright-covered. Mechanically implement: filters with exact results, sorting, search, detail routes, gallery/zoom accessible, comparison, persistent cart/quote drafts, correct calculations, validation, submit and SQLite receipt, operator queue and editing. Generic alert dialogs or hardcoded "Success" states DO NOT count as working interaction. No dead `#` links or disabled controls that look active. Distinct empty/loading/success/error/unavailable states. Buttons should reflect real state and remain functional under keyboard/RTL/mobile.

Examples of required end-to-end depth:
- Construction: linked project evidence -> editable multi-step scoped tender -> server-stored simulated quote -> admin review.
- Industrial: catalog search/grade filters -> technical SKU dossier -> multi-line RFQ basket with MOQ -> saved request -> admin view.
- Real Estate: property filters -> compare up to 3 -> floorplan/gallery -> viewing request (not confirmed) -> admin status.
- Dental: service finder -> practitioner filters -> example branch and preference -> appointment request only (not an actual booking); no sensitive patient data.
- Ecommerce: product variants/stock -> multi-line cart -> promotion/shipping calculations -> SQLite demo order -> receipt (NOT real sale).
- Portfolio: deep case study -> related expertise -> project-intake inquiry -> editable submissions queue.
- Restaurant: allergen-aware menu -> configurable dish/add-ons -> correct example cart -> demo order; branch/time preferences -> request table (NOT confirmed reservation).
- Academy: courses -> syllabus -> real usable demo lesson -> quiz with score/progress -> enrollment interest (NOT actual purchase/course access).

## 7. Database and dynamic content (mandatory)
- Primary data source for ALL domain-specific routes is SQLite (seed from deterministic fixtures). SQLite only, with persistent file on Node host, correct foreign keys, migrations, seed upsert, WAL and backup guidance.
- User-visible data from catalog, comparisons, details and admin views must reconcile against the same records. No hardcoded invented counts separate from DB.
- Implement Content Studio Admin `/admin` with safe env-configured authentication and session; edit pages/sections, site tokens, translations, media, SEO metadata, blog drafts/publish and domain entities; update reflects publicly after publish. Back up previous revision and allow rollback. Protect cross-site writes.
- The public demonstration must not collect real bank/card/health data. Demo requests can use safe sample identities and 7-day retention. Real Mavvix sales CTA separately uses the configured official site URL.
- Full version is Node + SQLite and is **NOT static-export compatible**. Do not enable `output: export` on working DB routes; free static hosting is permitted ONLY for clearly downgraded read-only showcase previews and is NOT full acceptance.

## 8. Media production and provenance
Hero and detail images are essential to conversion. For each demo list required shots/assets first, then source from legally reusable assets or create original images with tools genuinely available, record credits/rights metadata, optimize to WebP/AVIF at right dimensions, keep product/architecture/person identity consistent across multiple frames. Do NOT use random image URLs that may break, screenshots of competitors, stock images presented as client projects, fake patients or fabricated testimonials.
If image generation is unavailable, create tasteful SVG editorial diagrams + locally controlled placeholders and mark missing-photo gate BLOCKED, not "complete". No manual Photoshop/visual proof fabricated.

## 9. SEO, content and trust
- Functional localized titles/metas/canonicals, semantic landmarks, OG, `hreflang` for showcase, meaningful alt text, sitemap for Mavvix public sales gallery.
- **All fictional preview routes noindex,follow**, excluded from sitemap; do not create misleading local business structured data on fake businesses. No fake company addresses/maps/awards/licences, no fake 5-star reviews, no falsified property/inventory status, no guaranteed business returns.
- Blog routes real and seeded, not empty card grids. 6–8 topic-specific posts as noted per vertical; detail articles with helpful unique copy, table-of-contents and relevant related resources.
- Use the actual original Mavvix official logos only on Showcase and attribution, preserving source asset proportions. Fictional demo brands require their own independent typographic wordmarks and palettes.

## 10. UX/accessibility and responsive matrix
Treat WCAG 2.2 AA as intent; implement keyboard support, focus management, skip links, live announcements on filter/cart changes, proper labels/errors and semantic heading hierarchy. Media should have alt text; avoid fake alt descriptions. `prefers-reduced-motion` honored. Responsive must be visually inspected at 320, 390, 768, 1024, 1440 and 1920px in both languages; no accidental horizontal scrolling, overlapping sticky actions or unreadable table. Important galleries, menus and filter sheets must work on phone touch and keyboard.

## 11. Testing is a deliverable, not an afterthought
Implement tests from QA matrix. Each vertical needs:
- All routes render AR+EN and survive direct refresh.
- Primary + secondary + negative journey true outcome and DB assertions.
- DB seed counts, FK relationships and coherent pricing/status invariants.
- Admin create/edit/publish/unpublish/rollback and permission denial.
- Mobile navigation and deep page screenshot at 390; desktop screenshot at 1440; key tablet forms.
- Performance report and accessibility check, all visible links/buttons verified.
Do not mark DONE for a demo with missing screenshots or failing tests. A successful `npm run build` proves only compilation, not behavior. Do not use `|| true` or `skipLibCheck`/ignored TypeScript errors to conceal failures. Provide honest PASS/FAIL/NOT RUN statuses.

## 12. Commercial presentation
Showcase `/ar/showcase` and `/en/showcase`: sales-quality page that introduces types, lists actual built demos only, sector filters, screenshot gallery made from running demos, concise price **estimates** only when configured, design distinction, preview links, `Request similar website` CTA back to real Mavvix. Each concept demo has a small discreet banner identifying its fictional nature, plus return link and optional scoped CTA to real sales. Never say concept demos are projects delivered to actual clients.
Screenshots/video for advertising must be captured from real running pages after QA, not generated static comps presented as screenshots.

## 13. Build order and release discipline
Follow `03_PLAN/BUILD_ORDER.md`: Foundation+Admin+Showcase -> Construction -> Industrial -> Real Estate -> Dental -> Ecommerce -> Portfolio -> Restaurant -> Academy -> consolidation. Do not wait to complete all eight before giving phased preview, but full delivery requires all eight. When context is limited, finish a vertical slice with routes, domain data, admin and tests, checkpoint before another. If you face a blocker, provide explicit unimplemented details and resume steps; don't quietly downgrade to mockups.

## 14. Definition of COMPLETE
All eight verticals have route depth, real interactions, SQLite source-of-truth, protected editor, rich localized content, original visual identity, media rights, tested responsive experiences and screenshots. The Showcase advertises only implemented demos. Run `python VERIFY_PACKAGE.py` on this spec kit as a pre-check, then project tests after writing code. Final output is a source repo with README+commands, migrations, seeds, screenshots, Playwright report, QA scorecard, exact paths and documented blockers. This ZIP itself is specifications + official brand assets and starter fixture data, not prebuilt websites.

BEGIN NOW. Inspect workspace, document current environment in progress status, install compatible packages, implement immediately and continuously through milestones as the host permits. Never stop at a plan or one homepage.
