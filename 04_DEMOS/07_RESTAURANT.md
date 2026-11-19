# 07 — SAFFRON TABLE / سفرة زعفران — Production-grade interactive demo specification

**Vertical:** Restaurant & Café Digital Experience | **Mandatory for complete eight-demo release:** YES | **Route prefix:** `/[locale]/preview/restaurant`

## 0. Delivery contract: this is a REAL WORKING DEMO, not a landing page mockup

This specification is a binding implementation checklist. Build all pages listed below with real routes, coherent localized content, domain-specific data, genuinely interactive controls, working validation, SQLite-backed transactions where required, and functional protected admin workflows. Do not mark complete when only the hero or main page looks good. No fake success state, fake claims, dead anchors, decorative filters, unimplemented navigation or buttons.

**Fictional demo brand:** SAFFRON TABLE / سفرة زعفران — display a discreet bilingual `Concept demo by Mavvix` badge and clearly explain simulated entities/transactions. No pretending this is a genuine paying client. No authentic testimonials, false certifications or unverified case-study outcomes.

**Personas:** Diner scanning categories/ingredients and restaurant manager evaluating a mobile-first menu and table-request workflow.
**Primary business outcome:** Find appropriate dishes, compose a sample meal and either produce a DEMO order summary or submit a table request; no real kitchen order.

## 1. Visual direction — must not resemble sibling demos

Tactile warm food editorial; cream #F6F0E4, burnt cinnamon #AC5239, deep olive #3C4A35. Rich food photography, handwritten-like small markers, oversized menu typography, playful menu sheet transitions. Different from fashion store, less catalog-grid more menu-list.

**Five signature differentiators (must be visible in working UI):**

1. Category/dietary/allergen filter with accurate ingredient metadata
2. Dish customization (size, protein, extras) tied to item pricing and availability
3. Demo order builder with calculated total and copyable sample order text
4. Table request with party size, future preference and available sample slots
5. Location/hours and editorial sourcing story without fabricated reviews

**Art direction protocol:** Generate 2 substantially different hero concepts, choose one with a reason. Create a mini design system (spacing scale, background surfaces, main type pair, headings 64/48/36/28, grids, imagery, button/interaction states, section transitions). Distinct sections need visual rhythm and whitespace. Use coherent assets for each individual case/product/property, not random unrelated stock images. Arabic and English are fully composed and visually balanced. No visual cloning across demos.

## 2. Full route-by-route UX & functional acceptance

Each route is required in both languages (`/ar`, `/en`) and must survive direct refresh. Each page needs its own first fold, body content, mobile implementation, purposeful CTA, skeleton/empty/error states and unique metadata. Dynamic detail pages require populated distinct content for EVERY seeded record, not a generic repeated block.

### Screen 01 — `/` — Restaurant landing
**Visitor job:** Establish venue identity and two primary tasks
**Actual visual modules:** Cinematic cuisine imagery, order menu CTA, season menu highlights, chef story, venue cards, menu shortcuts
**Interactions, not mockups:** Dish cards open menu/detail; branches link to request
**Page acceptance:** No pretend real customer ratings

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 02 — `/menu` — Menu
**Visitor job:** Choose suitable dishes
**Actual visual modules:** Category tabs, ingredient search, dietary/allergen filter, price and tags, availability, category lists
**Interactions, not mockups:** URL filter persistence and accurate count
**Page acceptance:** Allergen warnings consistent and nonmedical

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 03 — `/menu/[slug]` — Dish detail
**Visitor job:** Know ingredients and customize sample meal
**Actual visual modules:** Gallery, ingredients, allergen list, sample calories omitted unless sourced, sizes/extras, cost breakdown
**Interactions, not mockups:** Modifier controls affect valid price; add to demo order
**Page acceptance:** Cannot add unavailable dish/option

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 04 — `/order` — Sample order
**Visitor job:** See coherent order choices
**Actual visual modules:** Ordered items, modifiers, quantities, subtotal, optional sample packaging fee
**Interactions, not mockups:** Edit, remove, copy formatted order preview; simulate receipt SQLite
**Page acceptance:** No connection to real kitchen or WhatsApp

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 05 — `/locations` — Branches & hours
**Visitor job:** Plan in-person visit
**Actual visual modules:** Three clearly fictional branch profiles with example opening windows and services
**Interactions, not mockups:** Select location for table request
**Page acceptance:** No real map pins

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 06 — `/locations/[slug]` — Branch detail
**Visitor job:** Explain branch specifics
**Actual visual modules:** Menu offerings, sample hours, seating styles, location illustration
**Interactions, not mockups:** Request table with branch prefilled
**Page acceptance:** Hours/slots consistent

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 07 — `/reserve` — Table request
**Visitor job:** Select date/size preference
**Actual visual modules:** Party size, branch, future date/time, seating preference; review and DEMO request
**Interactions, not mockups:** Validate capacity and disabled sample slots, persist as REQUESTED only
**Page acceptance:** Not confirmed reservation

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 08 — `/story` — Kitchen story
**Visitor job:** Make restaurant credible through details
**Actual visual modules:** Ingredient sourcing style, food prep philosophy, menu seasonality example
**Interactions, not mockups:** Related menu links
**Page acceptance:** Not invented supplier endorsements

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 09 — `/journal` — Food editorial
**Visitor job:** Offer meaningful content
**Actual visual modules:** 4 food stories and guides
**Interactions, not mockups:** Article routes
**Page acceptance:** No duplicate generic copy

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 10 — `/journal/[slug]` — Article
**Visitor job:** Explain single food topic
**Actual visual modules:** Recipe inspiration/ingredient insight, related menu
**Interactions, not mockups:** TOC and tags
**Page acceptance:** 250+ words AR and EN

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 11 — `/faq` — FAQ
**Visitor job:** Clarify allergens and sample logistics
**Actual visual modules:** Menu, ingredients, group dining, reservation guidelines
**Interactions, not mockups:** Accordion search and links
**Page acceptance:** No unsupported allergy-free claims

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

## 3. Mandatory end-to-end journeys

The following flows must be executable by Playwright and demonstrable by a sales representative in 60–180 seconds. Every CTA/action either changes state or navigates to a real route.

### Journey 1 — Guest chooses meal
**Exact steps:** Menu > filter vegetarian/no-nuts tag > dish details > choose size and extras > add to demo order > edit qty > see totals > create DEMO order copy > admin sees simulated order.
**Pass/fail oracle:** Modifiers, availability, sum and currency exact.

### Journey 2 — Group table preference
**Exact steps:** Locations > branch > choose party size 6 > view sample times > choose available slot > request table > REQUESTED receipt.
**Pass/fail oracle:** Unavailable slots do not accept new requests.

### Journey 3 — Allergen conflict
**Exact steps:** Dish tagged nuts visible > no-nuts filter hides it > reset reveals item
**Pass/fail oracle:** No wrong allergen tags or dangerous safety promises.

## 4. Domain-specific data, content and consistency

**Seed requirement:** 30 dishes across 6 menu categories, 12 modifiers, 3 fictional branches, 14 sample time slots with some unavailable, 4 food editorial stories, 10 FAQs, 4 dietary tags; per-dish allergen fields.

**Writing requirements:** Each dish has meaningful ingredients, servings, dietary flags and honest allergen disclaimers. Photos must match dish. Branch descriptions are fictional and cannot mislead as actual venues.

Every entity must have immutable unique id and stable slug; AR/EN independent titles and bodies (not duplicated placeholders), coherent region/price/attributes/tags, image-set references, relation ids, visibility, status, dates where meaningful. All filters, counts, detail pages, compare and submissions MUST read the SAME source of truth. Data must never randomly change between renders. Use EGP as examples if prices are displayed and mark them illustrative.

**Seeded scenario fixtures to prove non-happy paths:**

- Large dish 220 EGP + extras 35 and quantity 2 = 510 EGP before fees
- No-nuts filter excludes an explicit nuts dish
- Example branch Friday opening hours differ and slots follow schedule
- Party size max 8 and 0 invalid
- Restaurant demo order receipt says no kitchen submission

## 5. Real CMS / protected operator experience for this vertical

Menu categories/dishes/ingredients/allergen metadata, pricing/modifiers, branch hours/sample slots, example orders and table requests, editorial articles. Updating a dish price recalculates cart server-side.

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

- [ ] Journey 1: Guest chooses meal — works in AR/EN and survives reload where expected
- [ ] Journey 2: Group table preference — works in AR/EN and survives reload where expected
- [ ] Journey 3: Allergen conflict — works in AR/EN and survives reload where expected
- [ ] Screen 01 `/` is built with complete content and correct interactions
- [ ] Screen 02 `/menu` is built with complete content and correct interactions
- [ ] Screen 03 `/menu/[slug]` is built with complete content and correct interactions
- [ ] Screen 04 `/order` is built with complete content and correct interactions
- [ ] Screen 05 `/locations` is built with complete content and correct interactions
- [ ] Screen 06 `/locations/[slug]` is built with complete content and correct interactions
- [ ] Screen 07 `/reserve` is built with complete content and correct interactions
- [ ] Screen 08 `/story` is built with complete content and correct interactions
- [ ] Screen 09 `/journal` is built with complete content and correct interactions
- [ ] Screen 10 `/journal/[slug]` is built with complete content and correct interactions
- [ ] Screen 11 `/faq` is built with complete content and correct interactions
- [ ] Domain admin edit → SQLite → public site reflects changes; draft/publish works.
- [ ] Responsive screenshots at 320/390/768/1440px; Arabic long text and RTL icons verified.
- [ ] Every seeded detail entity has unique narrative and coherent visual evidence.
- [ ] Server-side input validation, no fake booking/payment/sale, no leaked PII or fictional claims.
- [ ] E2E happy path + invalid inputs + empty states + refresh + admin permissions pass.

## 8. Commercial demo presentation

At end of journey, small opt-in panel: “Want a website like this for your business?” with specific outcome labels; open REAL Mavvix sales contact or known website, not fictitious merchant communication. Add an unobtrusive return-to-showcase link. Never obscure site content with upsell. Screenshot primary fold and primary conversion flow for ads, including mobile, with demo attribution visible.

## 9. Completion evidence that Gemini must save

- `progress/evidence/07_restaurant/routes.md` complete route table and implementation status.
- `progress/evidence/07_restaurant/journeys.md` Playwright command/results and persistence assertions.
- `progress/evidence/07_restaurant/screenshots/` 390px+1440px screenshots of homepage, deep detail, flow review and admin.
- `progress/evidence/07_restaurant/design-review.md` concrete differences from previous demos, copy QA, known limitations.

**NO ACCEPTANCE WITHOUT PROOF.** If route missing, functionality decorative-only or tests not run, mark PARTIAL.
