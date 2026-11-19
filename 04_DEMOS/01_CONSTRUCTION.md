# 01 — ATLAS STRUCTURES / أطلس للبناء — Production-grade interactive demo specification

**Vertical:** Construction & Engineering | **Mandatory for complete eight-demo release:** YES | **Route prefix:** `/[locale]/preview/construction`

## 0. Delivery contract: this is a REAL WORKING DEMO, not a landing page mockup

This specification is a binding implementation checklist. Build all pages listed below with real routes, coherent localized content, domain-specific data, genuinely interactive controls, working validation, SQLite-backed transactions where required, and functional protected admin workflows. Do not mark complete when only the hero or main page looks good. No fake success state, fake claims, dead anchors, decorative filters, unimplemented navigation or buttons.

**Fictional demo brand:** ATLAS STRUCTURES / أطلس للبناء — display a discreet bilingual `Concept demo by Mavvix` badge and clearly explain simulated entities/transactions. No pretending this is a genuine paying client. No authentic testimonials, false certifications or unverified case-study outcomes.

**Personas:** مالك شركة مقاولات يعرض خبراته؛ مدير مشتريات أو مالك مشروع يقارن عروض تنفيذ؛ مهندس يبحث عن أعمال مماثلة.
**Primary business outcome:** تكوين نطاق مشروع محدد وطلب عرض سعر تجريبي من بيانات مشروع مرتبط؛ CTA مبيعات Mavvix منفصل.

## 1. Visual direction — must not resemble sibling demos

Architectural journal, ink #162327 / limestone #F2EFE9 / rust #D26A3B. Bold architecturally cropped hero with measured grid and vertical project rail; image-led detail, project index typography and annotated plan-like drawings. Avoid generic 3-card hero and blue gradients. AR IBM Plex Sans Arabic; EN Manrope. Mobile uses visual timeline and collapsible spec sheets.

**Five signature differentiators (must be visible in working UI):**

1. Project Atlas Explorer: sector x service x 6 area bands; URL-searchParams synced
2. Immersive before/after comparison on illustrative projects, keyboard accessible
3. Tender Scope Wizard with dependencies, review screen and persistent DEMO RFQ receipt
4. Technical service packages with clear deliverables/exclusions and related work
5. Project cross-references based on sector and work type

**Art direction protocol:** Generate 2 substantially different hero concepts, choose one with a reason. Create a mini design system (spacing scale, background surfaces, main type pair, headings 64/48/36/28, grids, imagery, button/interaction states, section transitions). Distinct sections need visual rhythm and whitespace. Use coherent assets for each individual case/product/property, not random unrelated stock images. Arabic and English are fully composed and visually balanced. No visual cloning across demos.

## 2. Full route-by-route UX & functional acceptance

Each route is required in both languages (`/ar`, `/en`) and must survive direct refresh. Each page needs its own first fold, body content, mobile implementation, purposeful CTA, skeleton/empty/error states and unique metadata. Dynamic detail pages require populated distinct content for EVERY seeded record, not a generic repeated block.

### Screen 01 — `/` — Homepage
**Visitor job:** Make capability and fit evident in first 5 seconds
**Actual visual modules:** Hero with rotating editorial project index; four core service pathways; selected case studies with sector and area; deliverables timeline; materials/process story; editorial journal; quote CTA
**Interactions, not mockups:** Hero projects link to correct case; tabs change project imagery; sticky inquiry preselects service; skip animation accessibility
**Page acceptance:** Above-fold screenshot AR+EN reads as a construction company, not SaaS

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 02 — `/projects` — Project atlas
**Visitor job:** Let buyer narrow references comparable to own project
**Actual visual modules:** Featured project; sidebar multi-filter sector, scope, city, area; reset; sort newest/area; results count; masonry/list switch; empty state
**Interactions, not mockups:** Filtering AND across dimensions; filters URL deep-linkable, back/forward working; project cards link
**Page acceptance:** Filtered count and content match source dataset after refresh

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 03 — `/projects/[slug]` — Project case study
**Visitor job:** Demonstrate breadth of an example project without false claims
**Actual visual modules:** Project identity; objective; constraints; scope and phases; annotated gallery; materials spec; design intent; download demo brief; related projects
**Interactions, not mockups:** Keyboard zoom gallery; before/after draggable; project-level contact prefill; gallery touch swipes
**Page acceptance:** No unsupported completion stats or client names; all images coherent to same fictional property

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 04 — `/services` — Services index
**Visitor job:** Help compare actual service packages
**Actual visual modules:** Service navigator; work type selector; deliverable comparisons; typical inputs; exclusions; sectors; related cases
**Interactions, not mockups:** Select service to detail; request quote prefill
**Page acceptance:** Each service has different deliverables and tailored copy

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 05 — `/services/[slug]` — Service dossier
**Visitor job:** Describe specific work for informed purchase
**Actual visual modules:** Overview; suitability; included/excluded scope; engagement sequence; dependencies; FAQs; 3 applicable cases
**Interactions, not mockups:** Scope CTA passes service and optional project; accordion keyboard usable
**Page acceptance:** Refreshing deep link retains selected service

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 06 — `/process` — Project methodology
**Visitor job:** Make realistic tender and handover stages concrete
**Actual visual modules:** Discovery intake; site survey; BOQ planning; procurement coordination; execution; QC/handover; illustrative artefact thumbnails
**Interactions, not mockups:** Phase accordion, scope checklist download or print
**Page acceptance:** No promise of licensing or certification not provided

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 07 — `/journal` — Insights
**Visitor job:** Show long-form editorial capability
**Actual visual modules:** Topic archive; search; category cards; related services
**Interactions, not mockups:** Search and pagination, article cards lead to real routes
**Page acceptance:** All six articles unique Arabic/English substantive content

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 08 — `/journal/[slug]` — Article
**Visitor job:** Demonstrate editorial detail
**Actual visual modules:** Intro, sections with diagram/table as relevant, glossary, related cases, next article
**Interactions, not mockups:** In-page TOC anchors, related links
**Page acceptance:** Structured hierarchy and reading progress functional

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 09 — `/request-quote` — Tender scope wizard
**Visitor job:** Capture demonstrative structured inquiry
**Actual visual modules:** Step 1 building sector and project stage; 2 scope services and approximate area; 3 constraints/timeline/budget band; 4 file checklist; 5 review; 6 receipt
**Interactions, not mockups:** Validate cross-fields; retain draft; back and edit; persist anonymized demo submission in SQLite; print summary
**Page acceptance:** Completing journey creates scoped record, no real contractor contacted

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 10 — `/about` — Studio profile
**Visitor job:** Support trust without inventing history
**Actual visual modules:** Work philosophy; team roles as illustrative; fieldwork methods; detailed FAQ
**Interactions, not mockups:** Process links and quote CTA
**Page acceptance:** No fake ISO, awards, years or authentic testimonials

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 11 — `/contact` — Contact & offices
**Visitor job:** Provide transparent intent
**Actual visual modules:** Sample contact routes; inquiry guide; Mavvix cross-site inquiry
**Interactions, not mockups:** Only Mavvix CTA leaves demo; fictional contact routes do not submit outbound
**Page acceptance:** No fictional phone dial / address pin that pretends physical office

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

## 3. Mandatory end-to-end journeys

The following flows must be executable by Playwright and demonstrable by a sales representative in 60–180 seconds. Every CTA/action either changes state or navigates to a real route.

### Journey 1 — Tender for an office renovation
**Exact steps:** Home > Projects > filter commercial+interiors > project atlas-office-01 > review gallery+constraints > Similar scope > wizard prefilled > add area and required works > review > DEMO request receipt > admin sees request tagged construction.
**Pass/fail oracle:** Required area positive; 2+ compatible services; demo-only confirmation and DB record visible in operator area.

### Journey 2 — Compare finishing packages
**Exact steps:** Services > Fit-out > Deliverables > Browse related references > share permalink > request-scope, selected package remains.
**Pass/fail oracle:** Service selection and referral context survive refresh, deep-link and language switch.

### Journey 3 — Project search failure path
**Exact steps:** Projects > choose conflicting filters > purposeful zero-state > clear one dimension > results return > open relevant project.
**Pass/fail oracle:** No fake count, no dead end or unresponsive reset.

## 4. Domain-specific data, content and consistency

**Seed requirement:** 12 projects (at least 3 sectors, 4 scope families, diverse size/location), 7 service packages, 6 journal posts, 12 gallery sets (minimum 3 images each), 6 FAQs, 2 featured case deep dives, 2 downloadable DEMO scope-checklist sheets.

**Writing requirements:** Write concrete regional project narratives: why loading access constrained logistics, facade material alternatives, deliverables per stage, design-versus-build boundaries. For each case: 180–350 AR words and an independently written EN variant, 4 labeled media slots, 3 constraints, 4 decisions, 3 scope deliverables.

Every entity must have immutable unique id and stable slug; AR/EN independent titles and bodies (not duplicated placeholders), coherent region/price/attributes/tags, image-set references, relation ids, visibility, status, dates where meaningful. All filters, counts, detail pages, compare and submissions MUST read the SAME source of truth. Data must never randomly change between renders. Use EGP as examples if prices are displayed and mark them illustrative.

**Seeded scenario fixtures to prove non-happy paths:**

- A 420 m² villa scope, two service packages, future requested start
- Office fit-out 850 m², constrained access, filtered using city+sector
- Archived project should disappear publicly but remain in admin
- RFQ with 0 m² / invalid category is rejected
- Same quote form submitted twice via rapid taps must not duplicate confirmation

## 5. Real CMS / protected operator experience for this vertical

Manage project records, multilingual cases, gallery order and alt text, service packages, FAQs and articles; update visibility/featured ordering; see demo RFQ submissions by scope/sector and status (new/reviewed/archived), never send an external quotation. Changing project visibility updates index, filters, home and sitemap previews.

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

- [ ] Journey 1: Tender for an office renovation — works in AR/EN and survives reload where expected
- [ ] Journey 2: Compare finishing packages — works in AR/EN and survives reload where expected
- [ ] Journey 3: Project search failure path — works in AR/EN and survives reload where expected
- [ ] Screen 01 `/` is built with complete content and correct interactions
- [ ] Screen 02 `/projects` is built with complete content and correct interactions
- [ ] Screen 03 `/projects/[slug]` is built with complete content and correct interactions
- [ ] Screen 04 `/services` is built with complete content and correct interactions
- [ ] Screen 05 `/services/[slug]` is built with complete content and correct interactions
- [ ] Screen 06 `/process` is built with complete content and correct interactions
- [ ] Screen 07 `/journal` is built with complete content and correct interactions
- [ ] Screen 08 `/journal/[slug]` is built with complete content and correct interactions
- [ ] Screen 09 `/request-quote` is built with complete content and correct interactions
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

- `progress/evidence/01_construction/routes.md` complete route table and implementation status.
- `progress/evidence/01_construction/journeys.md` Playwright command/results and persistence assertions.
- `progress/evidence/01_construction/screenshots/` 390px+1440px screenshots of homepage, deep detail, flow review and admin.
- `progress/evidence/01_construction/design-review.md` concrete differences from previous demos, copy QA, known limitations.

**NO ACCEPTANCE WITHOUT PROOF.** If route missing, functionality decorative-only or tests not run, mark PARTIAL.
