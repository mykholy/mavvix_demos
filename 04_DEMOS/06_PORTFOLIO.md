# 06 — SALMA HASSAN STUDIO / سلمى حسن ستوديو — Production-grade interactive demo specification

**Vertical:** Professional / Creative Portfolio | **Mandatory for complete eight-demo release:** YES | **Route prefix:** `/[locale]/preview/portfolio`

## 0. Delivery contract: this is a REAL WORKING DEMO, not a landing page mockup

This specification is a binding implementation checklist. Build all pages listed below with real routes, coherent localized content, domain-specific data, genuinely interactive controls, working validation, SQLite-backed transactions where required, and functional protected admin workflows. Do not mark complete when only the hero or main page looks good. No fake success state, fake claims, dead anchors, decorative filters, unimplemented navigation or buttons.

**Fictional demo brand:** SALMA HASSAN STUDIO / سلمى حسن ستوديو — display a discreet bilingual `Concept demo by Mavvix` badge and clearly explain simulated entities/transactions. No pretending this is a genuine paying client. No authentic testimonials, false certifications or unverified case-study outcomes.

**Personas:** Senior architect or independent consultant prospect; clients reviewing detailed delivery examples; agency evaluating its personal site offering.
**Primary business outcome:** Understand practice and project approach, filter relevant cases, submit qualified project inquiry and optionally request sample discovery call without fake booking.

## 1. Visual direction — must not resemble sibling demos

Swiss-Editorial typographic expression, off-white black and electric lime accents, oversized grid/typographic hierarchy, photo/typography cadence and unusually beautiful long-form project writing. Not templated resume or small card list.

**Five signature differentiators (must be visible in working UI):**

1. Rich case storytelling with problem, constraints, process, decisions and deliverables
2. Portfolio filters by sector/service and a true grid/list mode
3. Interactive image annotations and before/after concept rationale
4. Project brief intake with scope/budget/timeline and matching service preselection
5. Bilingual opinionated essays linked to services and work

**Art direction protocol:** Generate 2 substantially different hero concepts, choose one with a reason. Create a mini design system (spacing scale, background surfaces, main type pair, headings 64/48/36/28, grids, imagery, button/interaction states, section transitions). Distinct sections need visual rhythm and whitespace. Use coherent assets for each individual case/product/property, not random unrelated stock images. Arabic and English are fully composed and visually balanced. No visual cloning across demos.

## 2. Full route-by-route UX & functional acceptance

Each route is required in both languages (`/ar`, `/en`) and must survive direct refresh. Each page needs its own first fold, body content, mobile implementation, purposeful CTA, skeleton/empty/error states and unique metadata. Dynamic detail pages require populated distinct content for EVERY seeded record, not a generic repeated block.

### Screen 01 — `/` — Home
**Visitor job:** Express distinctive creative practice
**Actual visual modules:** Hero identity, moving type strip optional, flagship cases, capabilities, writing excerpt, project inquiry CTA
**Interactions, not mockups:** Project reveal interactions; content links to case
**Page acceptance:** Different from contractor despite both having projects

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 02 — `/work` — Work index
**Visitor job:** Find relevant case
**Actual visual modules:** Filter discipline/year/type; grid/table layout; visible tags; project count
**Interactions, not mockups:** Filter retained in URL; toggle view; sort if supported
**Page acceptance:** Counts/data correct

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 03 — `/work/[slug]` — Long case study
**Visitor job:** Teach the craft of real deliverables
**Actual visual modules:** Context, research, constraint, moodboard, iterations, chosen direction, what changed, final asset gallery, deliverable inventory
**Interactions, not mockups:** Annotation toggles, zoom gallery, project inquiry preselects case
**Page acceptance:** Each case 6+ distinct content sections and 5+ consistent images

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 04 — `/services` — Engagements
**Visitor job:** Define offers and prerequisites
**Actual visual modules:** Strategy/design/consultancy scopes, deliverables, sample phases, exclusions
**Interactions, not mockups:** Select service in intake
**Page acceptance:** Not vague service tiles

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 05 — `/services/[slug]` — Offer detail
**Visitor job:** Answer buyer intent
**Actual visual modules:** Who suited, discovery inputs, scope options, timeline variables, sample outputs and related projects
**Interactions, not mockups:** CTA prefilled to intake
**Page acceptance:** Each offer distinct

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 06 — `/about` — Practice story
**Visitor job:** Communicate character and trust without fakery
**Actual visual modules:** Ethos, sample process, editorial portrait illustration, values and tools
**Interactions, not mockups:** Contact CTA, bio downloads sample
**Page acceptance:** Not actual unverified credentials

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 07 — `/journal` — Essays
**Visitor job:** Show expertise
**Actual visual modules:** Article categories, archives and search
**Interactions, not mockups:** Search and article route
**Page acceptance:** 6 articles written intentionally

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 08 — `/journal/[slug]` — Essay detail
**Visitor job:** Go beyond blog stub
**Actual visual modules:** 300+ words, annotations and references where appropriate
**Interactions, not mockups:** TOC, related links
**Page acceptance:** Text readable AR EN

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 09 — `/contact` — Project brief
**Visitor job:** Qualify scope
**Actual visual modules:** Brief type, goal, project size, deliverables, start window, sample contact, review
**Interactions, not mockups:** Validate and persist DEMO inquiry; CTA to hire Mavvix clearly separate
**Page acceptance:** No fake calendar booking confirmation

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 10 — `/now` — Working now
**Visitor job:** Humanizing editorial panel
**Actual visual modules:** Current conceptual focus, methods, available engagement types
**Interactions, not mockups:** Internal links, update through admin
**Page acceptance:** No false statement of real schedule

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

## 3. Mandatory end-to-end journeys

The following flows must be executable by Playwright and demonstrable by a sales representative in 60–180 seconds. Every CTA/action either changes state or navigates to a real route.

### Journey 1 — Agency client studies brand work
**Exact steps:** Home > work > filter branding > detailed case > toggle annotations > inspect decisions > request similar scope > prefilled inquiry > DEMO receipt > admin queue.
**Pass/fail oracle:** Query and service prefill consistent.

### Journey 2 — Visitor reads editorial article
**Exact steps:** Journal > article about brand constraints > jump to headings > relevant case > linked service.
**Pass/fail oracle:** Related items semantically linked

### Journey 3 — No results
**Exact steps:** Work > conflicting filters > clear controls > navigate case > back retains filter
**Pass/fail oracle:** Responsive, no dead end

## 4. Domain-specific data, content and consistency

**Seed requirement:** 12 projects with 4 unique discipline narratives, 7 service packages, 6 thought articles, 12 galleries, 8 FAQs, 3 inquiry scenarios.

**Writing requirements:** Every case must demonstrate an actual hypothetical design decision, at least one rejected alternative, a constraints section, named outputs and a coherent visual journey; no fabricated client logos or invented KPI uplifts.

Every entity must have immutable unique id and stable slug; AR/EN independent titles and bodies (not duplicated placeholders), coherent region/price/attributes/tags, image-set references, relation ids, visibility, status, dates where meaningful. All filters, counts, detail pages, compare and submissions MUST read the SAME source of truth. Data must never randomly change between renders. Use EGP as examples if prices are displayed and mark them illustrative.

**Seeded scenario fixtures to prove non-happy paths:**

- Filter by brand strategy leaves correct case subset
- Grid/list mode accessible at 320 px
- Project gallery annotations follow correct image
- Inquiry form retains selected case and service after language switch
- Draft article does not appear publicly

## 5. Real CMS / protected operator experience for this vertical

Cases, services, asset annotations, journals, pages and inquiry queue; editor can reorder case sections and preview AR/EN before publishing. All public claims marked concept.

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

- [ ] Journey 1: Agency client studies brand work — works in AR/EN and survives reload where expected
- [ ] Journey 2: Visitor reads editorial article — works in AR/EN and survives reload where expected
- [ ] Journey 3: No results — works in AR/EN and survives reload where expected
- [ ] Screen 01 `/` is built with complete content and correct interactions
- [ ] Screen 02 `/work` is built with complete content and correct interactions
- [ ] Screen 03 `/work/[slug]` is built with complete content and correct interactions
- [ ] Screen 04 `/services` is built with complete content and correct interactions
- [ ] Screen 05 `/services/[slug]` is built with complete content and correct interactions
- [ ] Screen 06 `/about` is built with complete content and correct interactions
- [ ] Screen 07 `/journal` is built with complete content and correct interactions
- [ ] Screen 08 `/journal/[slug]` is built with complete content and correct interactions
- [ ] Screen 09 `/contact` is built with complete content and correct interactions
- [ ] Screen 10 `/now` is built with complete content and correct interactions
- [ ] Domain admin edit → SQLite → public site reflects changes; draft/publish works.
- [ ] Responsive screenshots at 320/390/768/1440px; Arabic long text and RTL icons verified.
- [ ] Every seeded detail entity has unique narrative and coherent visual evidence.
- [ ] Server-side input validation, no fake booking/payment/sale, no leaked PII or fictional claims.
- [ ] E2E happy path + invalid inputs + empty states + refresh + admin permissions pass.

## 8. Commercial demo presentation

At end of journey, small opt-in panel: “Want a website like this for your business?” with specific outcome labels; open REAL Mavvix sales contact or known website, not fictitious merchant communication. Add an unobtrusive return-to-showcase link. Never obscure site content with upsell. Screenshot primary fold and primary conversion flow for ads, including mobile, with demo attribution visible.

## 9. Completion evidence that Gemini must save

- `progress/evidence/06_portfolio/routes.md` complete route table and implementation status.
- `progress/evidence/06_portfolio/journeys.md` Playwright command/results and persistence assertions.
- `progress/evidence/06_portfolio/screenshots/` 390px+1440px screenshots of homepage, deep detail, flow review and admin.
- `progress/evidence/06_portfolio/design-review.md` concrete differences from previous demos, copy QA, known limitations.

**NO ACCEPTANCE WITHOUT PROOF.** If route missing, functionality decorative-only or tests not run, mark PARTIAL.
