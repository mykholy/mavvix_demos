# 02 — FERROLINE INDUSTRIES / فيرولاين للصناعات — Production-grade interactive demo specification

**Vertical:** Industrial, Manufacturing & Export | **Mandatory for complete eight-demo release:** YES | **Route prefix:** `/[locale]/preview/industrial`

## 0. Delivery contract: this is a REAL WORKING DEMO, not a landing page mockup

This specification is a binding implementation checklist. Build all pages listed below with real routes, coherent localized content, domain-specific data, genuinely interactive controls, working validation, SQLite-backed transactions where required, and functional protected admin workflows. Do not mark complete when only the hero or main page looks good. No fake success state, fake claims, dead anchors, decorative filters, unimplemented navigation or buttons.

**Fictional demo brand:** FERROLINE INDUSTRIES / فيرولاين للصناعات — display a discreet bilingual `Concept demo by Mavvix` badge and clearly explain simulated entities/transactions. No pretending this is a genuine paying client. No authentic testimonials, false certifications or unverified case-study outcomes.

**Personas:** B2B procurement manager needing downloadable specs, manufacturing buyer checking MOQ, distributor comparing finishing and packing variants.
**Primary business outcome:** Build a multi-item request for quotation with coherent quantities and technical attributes, then submit DEMO RFQ.

## 1. Visual direction — must not resemble sibling demos

Steel-blue precision instrument aesthetic. Navy #12243C / neutral #F4F6F6 / ochre #DE9E37. Clear dense tables, precise grid, macro material imagery, integrated spec sheet look, catalog-first mega-menu. Technical English typography paired to formal Arabic. No large luxury real-estate imagery.

**Five signature differentiators (must be visible in working UI):**

1. Multi-SKU quote basket with persisted draft and quantity units/MOQ validation
2. Spec comparison up to 3 SKUs across consistent attributes
3. Interactive process and surface-treatment guide
4. Technical datasheet export generated from selected local data
5. Export inquiry with target region, packaging unit and requested volume

**Art direction protocol:** Generate 2 substantially different hero concepts, choose one with a reason. Create a mini design system (spacing scale, background surfaces, main type pair, headings 64/48/36/28, grids, imagery, button/interaction states, section transitions). Distinct sections need visual rhythm and whitespace. Use coherent assets for each individual case/product/property, not random unrelated stock images. Arabic and English are fully composed and visually balanced. No visual cloning across demos.

## 2. Full route-by-route UX & functional acceptance

Each route is required in both languages (`/ar`, `/en`) and must survive direct refresh. Each page needs its own first fold, body content, mobile implementation, purposeful CTA, skeleton/empty/error states and unique metadata. Dynamic detail pages require populated distinct content for EVERY seeded record, not a generic repeated block.

### Screen 01 — `/` — Industrial landing
**Visitor job:** Communicate capability by product class and sourcing workflow
**Actual visual modules:** Technical split hero; categories rail; production process strip; material grade quick selector; sample industrial applications; RFQ steps
**Interactions, not mockups:** Category tile opens filtered catalog; product selector updates spec quickview
**Page acceptance:** First fold communicates B2B procurement value

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 02 — `/products` — Engineering catalog
**Visitor job:** Discover correct SKU efficiently
**Actual visual modules:** Search by code/name; category, grade, dimension, finish filters; price disclosure as request quote; card/table switch; sort
**Interactions, not mockups:** Intersection filters; URL persistence; table accessible and horizontally scroll contained
**Page acceptance:** Counts/units accurate after filters

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 03 — `/products/[slug]` — SKU dossier
**Visitor job:** Answer buyer spec checklist
**Actual visual modules:** Product photo set; unique identifier; dimensional drawings; gauge, material, finish; packing; lead-time example caveat; use cases; downloads; related SKUs
**Interactions, not mockups:** Variant/grade selection changes exact specs; add correct variant and MOQ to RFQ
**Page acceptance:** SKU detail matches quote basket and downloaded sheet

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 04 — `/compare` — Spec comparison
**Visitor job:** Compare material/size variants fairly
**Actual visual modules:** 3-column comparison with grouped attributes and missing values marked
**Interactions, not mockups:** Add/remove SKU; compare URLs; export print view
**Page acceptance:** Each column matches selected SKU, no mismatched units

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 05 — `/rfq` — Quotation basket
**Visitor job:** Prepare a multi-item quote
**Actual visual modules:** Line items, grades, quantities and units, MOQ messaging, notes and region, validation, review summary
**Interactions, not mockups:** Update remove items, save draft, submit SQLite, produce demonstrative receipt
**Page acceptance:** Duplicate SKU merges only when variant identical

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 06 — `/industries` — Applications
**Visitor job:** Connect specification to real buying context
**Actual visual modules:** Construction, packaging, machinery, architectural and HVAC example use cases
**Interactions, not mockups:** Filter products by use case and link to matching detail
**Page acceptance:** No unrelated products shown

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 07 — `/process` — Production capabilities
**Visitor job:** Explain possible production workflow honestly
**Actual visual modules:** Material input, forming/cutting/finishing, quality checks, packing workflow, tolerance explanation
**Interactions, not mockups:** Interactively choose process and see compatible SKUs
**Page acceptance:** No false certifications or ISO claims

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 08 — `/resources` — Technical library
**Visitor job:** Make knowledge useful
**Actual visual modules:** Materials glossary, tolerances, finishes, FAQ and resources
**Interactions, not mockups:** Search resources; article/datasheet route
**Page acceptance:** Resources have actual detail

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 09 — `/resources/[slug]` — Technical article
**Visitor job:** Give procurement education
**Actual visual modules:** Specification example tables, application checklist, download CTA, related products
**Interactions, not mockups:** TOC anchors, named relevant links
**Page acceptance:** Article at least 300 words each language for key resources

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 10 — `/about` — Company profile
**Visitor job:** Represent hypothetical operation clearly
**Actual visual modules:** Manufacturing overview, process diagram, service coverage, philosophy, contact intent
**Interactions, not mockups:** RFQ and catalog navigation
**Page acceptance:** No false factory capacity or export permits

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 11 — `/contact` — Business inquiry
**Visitor job:** Move visitor to right process
**Actual visual modules:** Sales vs technical routes, RFQ link, example response steps
**Interactions, not mockups:** Contact demo request and actual Mavvix sales link separate
**Page acceptance:** No unverified phone/address

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

## 3. Mandatory end-to-end journeys

The following flows must be executable by Playwright and demonstrable by a sales representative in 60–180 seconds. Every CTA/action either changes state or navigates to a real route.

### Journey 1 — Buyer builds export RFQ
**Exact steps:** Home > profiles category > filter 304 stainless and size > SKU ferro-304-40 > datasheet > add 500 m > select second SKU > RFQ basket > adjust quantity > set packaging and export destination > review > DEMO receipt > admin review queue.
**Pass/fail oracle:** Qty unit correct; MOQ enforce; receipt item rows equal basket; preserved across refresh.

### Journey 2 — Technical side-by-side selection
**Exact steps:** Catalog > add two compatible fasteners + one profile to compare > compare grade/diameter/finish > remove one > printable spec summary.
**Pass/fail oracle:** Missing attributes shown as n/a; no false equivalence.

### Journey 3 — Bad MOQ rejection
**Exact steps:** Select quantity below pack multiple > inline error > adjust to 200 > add successfully.
**Pass/fail oracle:** Server rejects invalid MOQ independently of client UI.

## 4. Domain-specific data, content and consistency

**Seed requirement:** 24 SKUs across 5 coherent families, 4 material grades, 3 finish types, 5 use cases, 5 process records, 7 FAQ, 6 technical articles, 3 downloadable datasheets whose tables match source records.

**Writing requirements:** Specify exact units (mm, kg, m, pcs), technical tolerance caveats, material grade definitions. Every SKU: overview 80–120 words, 6+ attributes, 3 use cases, 1 packing rule, 2 compatible alternatives. No fabricated certificates, manufacturing capacity or customs approvals.

Every entity must have immutable unique id and stable slug; AR/EN independent titles and bodies (not duplicated placeholders), coherent region/price/attributes/tags, image-set references, relation ids, visibility, status, dates where meaningful. All filters, counts, detail pages, compare and submissions MUST read the SAME source of truth. Data must never randomly change between renders. Use EGP as examples if prices are displayed and mark them illustrative.

**Seeded scenario fixtures to prove non-happy paths:**

- 500 m profiles from source SKU with exact pack of 10
- Product with incompatible grade missing from another SKU comparison
- SKU with no image uses designed placeholder without broken icon
- Quote basket survives restart in local guest session
- Qty negative or non-integer pack multiplier rejected
- Versioned spec sheet matches current seeded material values

## 5. Real CMS / protected operator experience for this vertical

Product families, SKUs, grade/finish variants, datasheet files, technical articles and translation; RFQ requests and line item status; CSV export demo-only; publish/unpublish item. A product update must be reflected in detail, compare, search and RFQ selection.

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

- [ ] Journey 1: Buyer builds export RFQ — works in AR/EN and survives reload where expected
- [ ] Journey 2: Technical side-by-side selection — works in AR/EN and survives reload where expected
- [ ] Journey 3: Bad MOQ rejection — works in AR/EN and survives reload where expected
- [ ] Screen 01 `/` is built with complete content and correct interactions
- [ ] Screen 02 `/products` is built with complete content and correct interactions
- [ ] Screen 03 `/products/[slug]` is built with complete content and correct interactions
- [ ] Screen 04 `/compare` is built with complete content and correct interactions
- [ ] Screen 05 `/rfq` is built with complete content and correct interactions
- [ ] Screen 06 `/industries` is built with complete content and correct interactions
- [ ] Screen 07 `/process` is built with complete content and correct interactions
- [ ] Screen 08 `/resources` is built with complete content and correct interactions
- [ ] Screen 09 `/resources/[slug]` is built with complete content and correct interactions
- [ ] Screen 10 `/about` is built with complete content and correct interactions
- [ ] Screen 11 `/contact` is built with complete content and correct interactions
- [ ] Domain admin edit → SQLite → public site reflects changes; draft/publish works.
- [ ] Responsive screenshots at 320/390/768/1440px; Arabic long text and RTL icons verified.
- [ ] Every seeded detail entity has unique narrative and coherent visual evidence.
- [ ] Server-side input validation, no fake booking/payment/sale, no leaked PII or fictional claims.
- [ ] E2E happy path + invalid inputs + empty states + refresh + admin permissions pass.

## 8. Commercial demo presentation

At end of journey, small opt-in panel: “Want a website like this for your business?” with specific outcome labels; open REAL Mavvix sales contact or known website, not fictitious merchant communication. Add an unobtrusive return-to-showcase link. Never obscure site content with upsell. Screenshot primary fold and primary conversion flow for ads, including mobile, with demo attribution visible.

## 9. Completion evidence that Gemini must save

- `progress/evidence/02_industrial/routes.md` complete route table and implementation status.
- `progress/evidence/02_industrial/journeys.md` Playwright command/results and persistence assertions.
- `progress/evidence/02_industrial/screenshots/` 390px+1440px screenshots of homepage, deep detail, flow review and admin.
- `progress/evidence/02_industrial/design-review.md` concrete differences from previous demos, copy QA, known limitations.

**NO ACCEPTANCE WITHOUT PROOF.** If route missing, functionality decorative-only or tests not run, mark PARTIAL.
