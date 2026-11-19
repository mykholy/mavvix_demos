# 04 — LUMEN DENTAL / لومِن لطب الأسنان — Production-grade interactive demo specification

**Vertical:** Dental Clinic & Patient Service Discovery | **Mandatory for complete eight-demo release:** YES | **Route prefix:** `/[locale]/preview/dental`

## 0. Delivery contract: this is a REAL WORKING DEMO, not a landing page mockup

This specification is a binding implementation checklist. Build all pages listed below with real routes, coherent localized content, domain-specific data, genuinely interactive controls, working validation, SQLite-backed transactions where required, and functional protected admin workflows. Do not mark complete when only the hero or main page looks good. No fake success state, fake claims, dead anchors, decorative filters, unimplemented navigation or buttons.

**Fictional demo brand:** LUMEN DENTAL / لومِن لطب الأسنان — display a discreet bilingual `Concept demo by Mavvix` badge and clearly explain simulated entities/transactions. No pretending this is a genuine paying client. No authentic testimonials, false certifications or unverified case-study outcomes.

**Personas:** Potential patient seeking service explanation, parent evaluating child-friendly visit and clinic owner assessing modern site UX.
**Primary business outcome:** Choose a service/doctor and send a DEMO appointment request (never actual medical scheduling).

## 1. Visual direction — must not resemble sibling demos

Calm specialist editorial. Sage #EDF5F2 / teal #193A39 / muted clay #A67A6D. Intentional personal portrait crops, accessible readability, reassuring patient guide layouts; no fake before/after patient images or fabricated treatment outcomes.

**Five signature differentiators (must be visible in working UI):**

1. Service finder via concern categories (non-diagnostic) and plain language
2. Filter clinicians by service focus and available example consultation windows
3. Appointment request form with preferred day/time and honest non-confirmation
4. First-visit practical preparation guide with dynamic checklist
5. Long-form clinical content subject to expert review before production

**Art direction protocol:** Generate 2 substantially different hero concepts, choose one with a reason. Create a mini design system (spacing scale, background surfaces, main type pair, headings 64/48/36/28, grids, imagery, button/interaction states, section transitions). Distinct sections need visual rhythm and whitespace. Use coherent assets for each individual case/product/property, not random unrelated stock images. Arabic and English are fully composed and visually balanced. No visual cloning across demos.

## 2. Full route-by-route UX & functional acceptance

Each route is required in both languages (`/ar`, `/en`) and must survive direct refresh. Each page needs its own first fold, body content, mobile implementation, purposeful CTA, skeleton/empty/error states and unique metadata. Dynamic detail pages require populated distinct content for EVERY seeded record, not a generic repeated block.

### Screen 01 — `/` — Welcome
**Visitor job:** Provide clear care navigation
**Actual visual modules:** Clear consultation CTA; service finder; patient journey intro; practice values; sample team; accessibility details; FAQ
**Interactions, not mockups:** Click concern category filters service cards and navigates
**Page acceptance:** No medical outcome guarantee

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 02 — `/services` — Treatments
**Visitor job:** Browse services without self-diagnosis
**Actual visual modules:** Service categories, estimated visit type not medical claim, service overview, FAQs, possible evaluation questions
**Interactions, not mockups:** Category/filter/search; service routes
**Page acceptance:** No risky self-diagnosis suggestion

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 03 — `/services/[slug]` — Service information
**Visitor job:** Explain service boundaries
**Actual visual modules:** What service is, who evaluates suitability, expected visit flow, common questions, safety note, associated professionals
**Interactions, not mockups:** Request appointment preselects service
**Page acceptance:** Medical information reviewed placeholder flagged

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 04 — `/team` — Practitioner directory
**Visitor job:** Navigate by focus
**Actual visual modules:** Profile cards with fictional illustrations, categories, clinic location labels
**Interactions, not mockups:** Filter specialty, details links
**Page acceptance:** No invented licenses or degrees

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 05 — `/team/[slug]` — Practitioner profile
**Visitor job:** Introduce hypothetical staff role
**Actual visual modules:** Focus areas, philosophy, linked services, consultation approach
**Interactions, not mockups:** Appointment request preselect practitioner
**Page acceptance:** No impersonation of real physician

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 06 — `/patient-guide` — Preparing for visit
**Visitor job:** Remove logistical doubts
**Actual visual modules:** First visit checklist, what to bring in general, hygiene overview, example policies, FAQs
**Interactions, not mockups:** Checklist saved locally (non-sensitive)
**Page acceptance:** No storage of symptoms or medical histories

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 07 — `/patient-guide/[slug]` — Patient article
**Visitor job:** Offer accurate content caveated for review
**Actual visual modules:** 300+ words general informational content, related service links, sources placeholder requiring review
**Interactions, not mockups:** TOC; reading progress; related links
**Page acceptance:** No fake medical references or diagnosis

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 08 — `/locations` — Example branches
**Visitor job:** Demonstrate multi-branch design
**Actual visual modules:** Three fictional branch cards with general access/amenity descriptions, map as labeled illustration only
**Interactions, not mockups:** Select branch prepopulates request
**Page acceptance:** No invented phone or precise map pins

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 09 — `/request-appointment` — Request appointment
**Visitor job:** Capture simple interest only
**Actual visual modules:** Choose service; optional practitioner; branch; preferred date/time; sample contact; review; request receipt
**Interactions, not mockups:** Server validation; no medical symptoms or DOB; SQLite demo request
**Page acceptance:** Explicit not a confirmed booking

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 10 — `/faq` — Patient FAQ
**Visitor job:** Answer access/policy questions
**Actual visual modules:** Topic filters and service-linked questions
**Interactions, not mockups:** Accessible accordion, search
**Page acceptance:** Safety caveat on medical-specific FAQs

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 11 — `/contact` — Contact intent
**Visitor job:** Guide real Mavvix prospect separately
**Actual visual modules:** Clinic info demonstrative; Mavvix commercial CTA
**Interactions, not mockups:** Clear demo boundary
**Page acceptance:** No fake patient login or medical record

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

## 3. Mandatory end-to-end journeys

The following flows must be executable by Playwright and demonstrable by a sales representative in 60–180 seconds. Every CTA/action either changes state or navigates to a real route.

### Journey 1 — Service discovery to appointment request
**Exact steps:** Home > service finder preventative > cleaning service > team filter > select doctor > example branch > time preference > review > request only receipt; admin sees new demo request.
**Pass/fail oracle:** All prefills correct and request clearly nonconfirmed.

### Journey 2 — Parent explores first visit
**Exact steps:** Patient guide > first visit checklist > FAQs > linked service > request branch selection.
**Pass/fail oracle:** Content actually informative; checklist local no PII.

### Journey 3 — Invalid sensitive data path
**Exact steps:** User enters symptoms or medical record-like notes > copy discourages health details; server rejects restricted fields > safe error.
**Pass/fail oracle:** No medical notes saved or logged; no fake clinician credential.

## 4. Domain-specific data, content and consistency

**Seed requirement:** 10 services, 6 fictitious practitioner profiles without real credentials, 3 example clinic locations clearly fictional, 8 patient guides, 10 FAQs, 12 sample appointment preferences (non-confirmed).

**Writing requirements:** Plain-language Arabic not generated health advice; each service 150+ words describing purpose and consultation steps; each guide 250+ words, no fabricated patient success or percentages. Professional medically safe and neutral tone.

Every entity must have immutable unique id and stable slug; AR/EN independent titles and bodies (not duplicated placeholders), coherent region/price/attributes/tags, image-set references, relation ids, visibility, status, dates where meaningful. All filters, counts, detail pages, compare and submissions MUST read the SAME source of truth. Data must never randomly change between renders. Use EGP as examples if prices are displayed and mark them illustrative.

**Seeded scenario fixtures to prove non-happy paths:**

- Prefilled service and clinician match only appropriate services
- Future slot preference must be future; no booking guarantee
- Invalid email rejected but demo guest mode possible
- No fields for diagnosis, images, patient history or DOB
- All medical articles flagged as example subject to clinician review

## 5. Real CMS / protected operator experience for this vertical

Services and clinics editorial content, practitioners (fictional), locations and availability examples, guides, FAQ and appointment request queue (requested/reviewed/archived). Public admin read-only tour available; full edits require auth.

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

- [ ] Journey 1: Service discovery to appointment request — works in AR/EN and survives reload where expected
- [ ] Journey 2: Parent explores first visit — works in AR/EN and survives reload where expected
- [ ] Journey 3: Invalid sensitive data path — works in AR/EN and survives reload where expected
- [ ] Screen 01 `/` is built with complete content and correct interactions
- [ ] Screen 02 `/services` is built with complete content and correct interactions
- [ ] Screen 03 `/services/[slug]` is built with complete content and correct interactions
- [ ] Screen 04 `/team` is built with complete content and correct interactions
- [ ] Screen 05 `/team/[slug]` is built with complete content and correct interactions
- [ ] Screen 06 `/patient-guide` is built with complete content and correct interactions
- [ ] Screen 07 `/patient-guide/[slug]` is built with complete content and correct interactions
- [ ] Screen 08 `/locations` is built with complete content and correct interactions
- [ ] Screen 09 `/request-appointment` is built with complete content and correct interactions
- [ ] Screen 10 `/faq` is built with complete content and correct interactions
- [ ] Screen 11 `/contact` is built with complete content and correct interactions
- [ ] Domain admin edit → SQLite → public site reflects changes; draft/publish works.
- [ ] Responsive screenshots at 320/390/768/1440px; Arabic long text and RTL icons verified.
- [ ] Every seeded detail entity has unique narrative and coherent visual evidence.
- [ ] Server-side input validation, no fake booking/payment/sale, no leaked PII or fictional claims.
- [ ] E2E happy path + invalid inputs + empty states + refresh + admin permissions pass.

## 8. Commercial demo presentation

At end of journey, small opt-in panel: “Want a website like this for your business?” with specific outcome labels; open REAL Mavvix sales contact or known website, not fictitious merchant communication. Add an unobtrusive return-to-showcase link. Never obscure site content with upsell. Screenshot primary fold and primary conversion flow for ads, including mobile, with demo attribution visible.

## 9. Completion evidence that Gemini must save

- `progress/evidence/04_dental/routes.md` complete route table and implementation status.
- `progress/evidence/04_dental/journeys.md` Playwright command/results and persistence assertions.
- `progress/evidence/04_dental/screenshots/` 390px+1440px screenshots of homepage, deep detail, flow review and admin.
- `progress/evidence/04_dental/design-review.md` concrete differences from previous demos, copy QA, known limitations.

**NO ACCEPTANCE WITHOUT PROOF.** If route missing, functionality decorative-only or tests not run, mark PARTIAL.
