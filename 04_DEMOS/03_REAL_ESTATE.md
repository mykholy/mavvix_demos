# 03 — MERIDIAN RESIDENCES / ميريديان العقارية — Production-grade interactive demo specification

**Vertical:** Property Discovery & Real Estate | **Mandatory for complete eight-demo release:** YES | **Route prefix:** `/[locale]/preview/real-estate`

## 0. Delivery contract: this is a REAL WORKING DEMO, not a landing page mockup

This specification is a binding implementation checklist. Build all pages listed below with real routes, coherent localized content, domain-specific data, genuinely interactive controls, working validation, SQLite-backed transactions where required, and functional protected admin workflows. Do not mark complete when only the hero or main page looks good. No fake success state, fake claims, dead anchors, decorative filters, unimplemented navigation or buttons.

**Fictional demo brand:** MERIDIAN RESIDENCES / ميريديان العقارية — display a discreet bilingual `Concept demo by Mavvix` badge and clearly explain simulated entities/transactions. No pretending this is a genuine paying client. No authentic testimonials, false certifications or unverified case-study outcomes.

**Personas:** Home buyer comparing budget, area and lifestyle; investor screening projects; property marketing agency owner evaluating a website.
**Primary business outcome:** Find and compare properties, estimate budget, request a viewing (NOT a confirmed reservation).

## 1. Visual direction — must not resemble sibling demos

Luxury but legible editorial property publication. Stone #F5F0E6 / forest-charcoal #25312D / bronze #A8764F. Landscape visual edge, map/list rhythm, restrained serif accents, project identity panels; not generic cards or unsupported ROI badges.

**Five signature differentiators (must be visible in working UI):**

1. Linked project/unit taxonomy with persistent multi-filters and query URL
2. Compare up to 3 properties including price/area/layout and exact differences
3. Mortgage/instalment estimator clearly labeled illustrative and non-financial advice
4. Photo gallery and floorplan viewer with true example dimensions labels
5. Request viewing with preference picker, status REQUESTED in operator console

**Art direction protocol:** Generate 2 substantially different hero concepts, choose one with a reason. Create a mini design system (spacing scale, background surfaces, main type pair, headings 64/48/36/28, grids, imagery, button/interaction states, section transitions). Distinct sections need visual rhythm and whitespace. Use coherent assets for each individual case/product/property, not random unrelated stock images. Arabic and English are fully composed and visually balanced. No visual cloning across demos.

## 2. Full route-by-route UX & functional acceptance

Each route is required in both languages (`/ar`, `/en`) and must survive direct refresh. Each page needs its own first fold, body content, mobile implementation, purposeful CTA, skeleton/empty/error states and unique metadata. Dynamic detail pages require populated distinct content for EVERY seeded record, not a generic repeated block.

### Screen 01 — `/` — Showcase home
**Visitor job:** Make developer experience concrete
**Actual visual modules:** Immersive project hero; search bar; featured development; property types; district journal; featured unit matrix; consultation CTA
**Interactions, not mockups:** Search submits supported filters; featured units open correct details
**Page acceptance:** No unsupported guaranteed returns claims

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 02 — `/developments` — Developments
**Visitor job:** Choose project before specific unit
**Actual visual modules:** Project cards with area, location, unit types, sample plan, amenities, progress labeled demo
**Interactions, not mockups:** Filter by area and project type; open project details
**Page acceptance:** All projects contain linked units

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 03 — `/developments/[slug]` — Development story
**Visitor job:** Explore real-estate choice context
**Actual visual modules:** Editorial masterplan; amenities map illustration; unit mix table; location guide; photos; sample payment explanation
**Interactions, not mockups:** Switch unit mix tab; filter available unit listings by project
**Page acceptance:** Unit list matches development id

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 04 — `/properties` — Search listings
**Visitor job:** Find budget-appropriate units
**Actual visual modules:** Search and filters price/area/type/beds/district/status; sort price/size; list/grid and optional illustrative map
**Interactions, not mockups:** Filter URL sync; saved favorites; compare toggle
**Page acceptance:** No filter offers out-of-range results

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 05 — `/properties/[slug]` — Property details
**Visitor job:** Determine feasibility
**Actual visual modules:** Structured spec sheet; price; beds; baths; area; floor; finishing; status; floorplan; photos; project context; similar units
**Interactions, not mockups:** Gallery zoom, share, favorite, add to compare, request viewing prefilled
**Page acceptance:** No sale of unavailable unit; demo availability clear

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 06 — `/compare` — Compare listings
**Visitor job:** Support choice across candidates
**Actual visual modules:** 3 columns specs, price/m² calculation, difference emphasis, strengths, printing
**Interactions, not mockups:** Remove/add and persist selection; responsive mobile comparison layout
**Page acceptance:** No horizontal overflow on 320px

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 07 — `/saved` — Saved properties
**Visitor job:** Return to shortlist
**Actual visual modules:** Saved items with empty state and CTA to search
**Interactions, not mockups:** Toggle favorite consistent with list/detail
**Page acceptance:** No phantom favorites

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 08 — `/viewing` — Viewing request
**Visitor job:** Submit meaningful preference
**Actual visual modules:** Select property, preferred slot/time, mode in-person/video, short note, review and receipt
**Interactions, not mockups:** Validate unavailable property; persist demo request in SQLite; no actual hold created
**Page acceptance:** Confirmation says REQUEST ONLY, not appointment booked

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 09 — `/journal` — Neighborhood guides
**Visitor job:** Explain decision factors
**Actual visual modules:** Guide archive; neighborhood highlights; budget/stage explainers
**Interactions, not mockups:** Articles links and related listings
**Page acceptance:** No fabricated demographic/price market data

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 10 — `/journal/[slug]` — Buyer guide
**Visitor job:** Support informed comparison
**Actual visual modules:** Localized long-form; practical checklist and considerations
**Interactions, not mockups:** In-page links back to filtered listings
**Page acceptance:** No investment guarantee

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 11 — `/about` — Company
**Visitor job:** Present editorial service identity
**Actual visual modules:** Process, publishing ethics, fictional team roles, FAQ
**Interactions, not mockups:** Consultation CTA
**Page acceptance:** No invented developer license or partnerships

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 12 — `/contact` — Request help
**Visitor job:** Find next step
**Actual visual modules:** Inquiry category, sample request or Mavvix CTA
**Interactions, not mockups:** Clear distinction fictional developer vs Mavvix provider
**Page acceptance:** No real-world address claims

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

## 3. Mandatory end-to-end journeys

The following flows must be executable by Playwright and demonstrable by a sales representative in 60–180 seconds. Every CTA/action either changes state or navigates to a real route.

### Journey 1 — Buyer filters and books viewing inquiry
**Exact steps:** Home filter apartment+max 3m > 12+ listing candidates > open unit prop-01 > inspect images and plan > save/compare two alternatives > request a Tuesday preference > receipt request id (not confirmation) > admin view queue.
**Pass/fail oracle:** Numeric filter and compare correct; unit ID bound to viewing request.

### Journey 2 — Investor compares options
**Exact steps:** Developments > explore development > choose listing > add 3 compare > attempt 4th shows limit > print summary with sample disclaimers.
**Pass/fail oracle:** No more than 3; compare list persists on refresh.

### Journey 3 — Out of stock viewing rejected
**Exact steps:** Mark one seed unit unavailable > details show unavailable > request viewing action disabled/indicates alternative.
**Pass/fail oracle:** Server refuses request for unavailable unit.

## 4. Domain-specific data, content and consistency

**Seed requirement:** 5 fictional developments; 24 units across 5 types, 4 neighborhoods; 3 size ranges; 6 editorial location guides; 2 illustrative plans per development; 4+ visual assets per detail; some units unavailable and transparently flagged.

**Writing requirements:** Every property needs type, illustrative location, total area, beds, baths, finishing, floor, availability, photos, floorplan, sample fee transparency. Guides discuss neighborhood decision factors without invented price forecasts or ROI.

Every entity must have immutable unique id and stable slug; AR/EN independent titles and bodies (not duplicated placeholders), coherent region/price/attributes/tags, image-set references, relation ids, visibility, status, dates where meaningful. All filters, counts, detail pages, compare and submissions MUST read the SAME source of truth. Data must never randomly change between renders. Use EGP as examples if prices are displayed and mark them illustrative.

**Seeded scenario fixtures to prove non-happy paths:**

- Apartments <=3m EGP returns deterministic subset
- One 135 m² property with 2 beds and 1 bath, all contexts consistent
- One unit status unavailable; viewing request blocked
- Compare 3 then add fourth shows helpful feedback
- Estimated monthly instalment formula displayed with input assumptions and disclaimers

## 5. Real CMS / protected operator experience for this vertical

Projects/developments, unit listings, prices, statuses, floor plans, galleries, neighborhood articles and incoming viewing requests. Admin changing property status immediately updates filters, comparison and request eligibility.

Minimum protected admin screens in `/admin/[demo]` for this domain: Overview KPI counts generated from real SQLite data (label DEMO and avoid fake revenue); Manage core entities (list, search, view, create, update, archive, publish); Localized content editor (AR+EN), images/alt/order, SEO fields, versions/draft-publish; Review demo transactions; settings for theme logo/color and editor preview. Use actual persisted DB changes and validation. No unauthenticated public write endpoints. Read-only sales tour may show sanitized screenshot/example records; do not expose editing creds.

Admin quality gates: entity edit persists across restart and changes real public read output; duplicate slugs rejected per site/locale; unpublishing removes public access; delete uses confirmation and safe archive rather than cascading data loss; journal draft not publicly reachable; role checks enforced server-side, not just hidden buttons.

## 6. Deep interaction and failure-state requirements

- Forms have distinct `idle → editing → validating → submitting → success/error` states with field-specific validation, top-level error summary and accessible focus. Server validation authoritative. If demo form includes names/email, use fictional examples and strongly discourage real personal information on a public demo.
- Search is debounced and keyboard accessible; filters combine predictably; browser back/forward and locale switch preserve supported route and filters.
- Dialogs and zoomed galleries trap focus, close on Escape and restore focus; motion respects reduced-motion.
- Every actionable card links to correct detail; breadcrumb and next steps are contextual.
- Persist demonstrative transactional flows (and admin edits) in SQLite on a Node runtime; localStorage is only for non-sensitive guest state such as filters/favorites/cart drafts.
- If private SQLite storage is unavailable during static deployment, no claim of persistence is allowed; show an explicitly labelled demonstration and document downgrade as NOT meeting the full-site criterion.
- Keep Mavvix purchase enquiry separate from fictional service requests. CTA is `NEXT_PUBLIC_MAVVIX_SALES_URL`, never an invented personal phone.

## 7. Acceptance checklist unique to this demo

- [ ] Journey 1: Buyer filters and books viewing inquiry — works in AR/EN and survives reload where expected
- [ ] Journey 2: Investor compares options — works in AR/EN and survives reload where expected
- [ ] Journey 3: Out of stock viewing rejected — works in AR/EN and survives reload where expected
- [ ] Screen 01 `/` is built with complete content and correct interactions
- [ ] Screen 02 `/developments` is built with complete content and correct interactions
- [ ] Screen 03 `/developments/[slug]` is built with complete content and correct interactions
- [ ] Screen 04 `/properties` is built with complete content and correct interactions
- [ ] Screen 05 `/properties/[slug]` is built with complete content and correct interactions
- [ ] Screen 06 `/compare` is built with complete content and correct interactions
- [ ] Screen 07 `/saved` is built with complete content and correct interactions
- [ ] Screen 08 `/viewing` is built with complete content and correct interactions
- [ ] Screen 09 `/journal` is built with complete content and correct interactions
- [ ] Screen 10 `/journal/[slug]` is built with complete content and correct interactions
- [ ] Screen 11 `/about` is built with complete content and correct interactions
- [ ] Screen 12 `/contact` is built with complete content and correct interactions
- [ ] Domain admin edit → SQLite → public site reflects changes; draft/publish works.
- [ ] Responsive screenshots at 320/390/768/1440px; Arabic long text and RTL icons verified.
- [ ] Every seeded detail entity has unique narrative and coherent visual evidence.
- [ ] Server-side input validation, no fake booking/payment/sale, no leaked PII or fictional claims.
- [ ] E2E happy path + invalid inputs + empty states + refresh + admin permissions pass.

## 8. Commercial demo presentation

At end of journey, small opt-in panel: “Want a website like this for your business?” with specific outcome labels; open REAL Mavvix sales contact or known website, not fictitious merchant communication. Add an unobtrusive return-to-showcase link. Never obscure site content with upsell. Screenshot primary fold and primary conversion flow for ads, including mobile, with demo attribution visible.

## 9. Completion evidence that Gemini must save

- `progress/evidence/03_real-estate/routes.md` complete route table and implementation status.
- `progress/evidence/03_real-estate/journeys.md` Playwright command/results and persistence assertions.
- `progress/evidence/03_real-estate/screenshots/` 390px+1440px screenshots of homepage, deep detail, flow review and admin.
- `progress/evidence/03_real-estate/design-review.md` concrete differences from previous demos, copy QA, known limitations.

**NO ACCEPTANCE WITHOUT PROOF.** If route missing, functionality decorative-only or tests not run, mark PARTIAL.
