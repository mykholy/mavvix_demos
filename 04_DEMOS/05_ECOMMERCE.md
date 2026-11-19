# 05 — NORIA ATELIER / نوريا أتيليه — Production-grade interactive demo specification

**Vertical:** Fashion & Lifestyle Ecommerce Store | **Mandatory for complete eight-demo release:** YES | **Route prefix:** `/[locale]/preview/ecommerce`

## 0. Delivery contract: this is a REAL WORKING DEMO, not a landing page mockup

This specification is a binding implementation checklist. Build all pages listed below with real routes, coherent localized content, domain-specific data, genuinely interactive controls, working validation, SQLite-backed transactions where required, and functional protected admin workflows. Do not mark complete when only the hero or main page looks good. No fake success state, fake claims, dead anchors, decorative filters, unimplemented navigation or buttons.

**Fictional demo brand:** NORIA ATELIER / نوريا أتيليه — display a discreet bilingual `Concept demo by Mavvix` badge and clearly explain simulated entities/transactions. No pretending this is a genuine paying client. No authentic testimonials, false certifications or unverified case-study outcomes.

**Personas:** Shoppers testing products and brand owner assessing UX, merchandising and checkout.
**Primary business outcome:** Discover products, select exact variant, add to cart, apply sample promotion rule, complete SIMULATED COD order with consistent totals; no payment processed.

## 1. Visual direction — must not resemble sibling demos

Modern fashion editorial with warm white, desaturated rose and ink; campaign art direction, bold typography and material details. Avoid default template/store builder demo appearance. Product imagery consistent by SKU/color.

**Five signature differentiators (must be visible in working UI):**

1. Real SKU and variant inventory availability (at least 3 sizes and 3 colors across items)
2. Persistent cart with line merge only for same variant, quantity and stock constraints
3. Pricing engine: subtotal + deterministic sample shipping – valid discount = total
4. Working product search/filter/sort, wish list and recently viewed
5. Simulated checkout and order status read-only viewer with no delivery guarantee

**Art direction protocol:** Generate 2 substantially different hero concepts, choose one with a reason. Create a mini design system (spacing scale, background surfaces, main type pair, headings 64/48/36/28, grids, imagery, button/interaction states, section transitions). Distinct sections need visual rhythm and whitespace. Use coherent assets for each individual case/product/property, not random unrelated stock images. Arabic and English are fully composed and visually balanced. No visual cloning across demos.

## 2. Full route-by-route UX & functional acceptance

Each route is required in both languages (`/ar`, `/en`) and must survive direct refresh. Each page needs its own first fold, body content, mobile implementation, purposeful CTA, skeleton/empty/error states and unique metadata. Dynamic detail pages require populated distinct content for EVERY seeded record, not a generic repeated block.

### Screen 01 — `/` — Brand storefront
**Visitor job:** Enable visual merchandising
**Actual visual modules:** Collection campaign, editorial looks, category grid, trending products, artisan material story, journal teaser
**Interactions, not mockups:** Campaign link, wishlist toggles, product quick view
**Page acceptance:** No fabricated claims or pressure countdown

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 02 — `/collections` — Category overview
**Visitor job:** Surface product categories
**Actual visual modules:** Distinct category art, descriptions, curated products
**Interactions, not mockups:** Category select navigates to category-specific view
**Page acceptance:** Different category content

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 03 — `/collections/[slug]` — Collection listing
**Visitor job:** Filter practical options
**Actual visual modules:** Search bar, size/color/material/price filters, sort, result count, product cards
**Interactions, not mockups:** URL state, search debounced, quick add only if variant unambiguous
**Page acceptance:** Out-of-stock products flagged

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 04 — `/products/[slug]` — Product detail
**Visitor job:** Evaluate exact variant
**Actual visual modules:** Image gallery, swatches, size choice, true variant inventory, quantity, materials, size guide, delivery & care, related items
**Interactions, not mockups:** Variant switching changes image/stock/price, add to cart, size modal
**Page acceptance:** Variant-specific stock server enforced

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 05 — `/search` — Search results
**Visitor job:** Find SKU or product
**Actual visual modules:** Search suggestions, relevance, zero state, filters
**Interactions, not mockups:** Search query persists across nav
**Page acceptance:** Search results correct

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 06 — `/wishlist` — Saved items
**Visitor job:** Revisit favorites
**Actual visual modules:** Saved product cards, empty state, related suggestions
**Interactions, not mockups:** Add/remove and persist locally
**Page acceptance:** No ghost items

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 07 — `/cart` — Cart
**Visitor job:** Understand true order arithmetic
**Actual visual modules:** Line items with variant, image, price, qty, subtotal, promotion code, shipping region
**Interactions, not mockups:** Increment/decrement, remove, apply code, update shipping and totals
**Page acceptance:** Server re-prices in demo checkout; no client price trust

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 08 — `/checkout` — Simulated checkout
**Visitor job:** Complete realistic checkout without payment
**Actual visual modules:** Review basket, example address zone, optional COD method only, promo, demo terms, final action
**Interactions, not mockups:** Validate fields and stock; create SQLite demo order and items; display simulation receipt
**Page acceptance:** Never collect real card data; no real order sent

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 09 — `/orders/[id]` — Demo order summary
**Visitor job:** Verify receipt state
**Actual visual modules:** Order line items, prices, shipping, example address redacted, label SIMULATED
**Interactions, not mockups:** Lookup by session-owned demo order id
**Page acceptance:** No public leak of another session order

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 10 — `/story` — Brand story
**Visitor job:** Explain product positioning
**Actual visual modules:** Materials, process editorial, care policy
**Interactions, not mockups:** Links to product material filters
**Page acceptance:** No counterfeit sustainability certification

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 11 — `/journal` — Style journal
**Visitor job:** Build lifestyle editorial
**Actual visual modules:** 4 posts, editorial images, taxonomy
**Interactions, not mockups:** Article detail routes and related products
**Page acceptance:** No thin stubs

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 12 — `/journal/[slug]` — Editorial article
**Visitor job:** Offer styling detail
**Actual visual modules:** Longform copy, material advice, related collection
**Interactions, not mockups:** TOC, product links
**Page acceptance:** Bilingual original copy

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 13 — `/help` — Policy & FAQ
**Visitor job:** Clarify order example limitations
**Actual visual modules:** Delivery zones, returns example, size/availability help
**Interactions, not mockups:** FAQ accordion and cart links
**Page acceptance:** Label fictional sample policies

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

## 3. Mandatory end-to-end journeys

The following flows must be executable by Playwright and demonstrable by a sales representative in 60–180 seconds. Every CTA/action either changes state or navigates to a real route.

### Journey 1 — Full shopping cart to demo COD
**Exact steps:** Home > collection > size and color filter > product sku-01 > choose M ivory > add qty 2 > cart > set shipping zone > apply valid promo > checkout > server recalculates > create simulated order > order summary route > admin sees DEMO order.
**Pass/fail oracle:** Totals match server and data, stock cannot go negative, receipts session-protected.

### Journey 2 — Out-of-stock handling
**Exact steps:** Product > select sold-out size/color > add disabled with meaningful text > select available > add 1 > return cart.
**Pass/fail oracle:** Variant selection correctly prevents unavailable combinations.

### Journey 3 — Coupon rejection
**Exact steps:** Cart > enter expired or below-minimum coupon > error inline > valid coupon passes > total updated.
**Pass/fail oracle:** Same rule enforced server-side.

## 4. Domain-specific data, content and consistency

**Seed requirement:** 24 products, 4 collections, minimum 60 variants, 5 size charts/material guides, 4 editorial journal articles, 3 demo promo rules incl expired/min-cart, 3 shipping zones/prices, 5 intentionally sold-out variants.

**Writing requirements:** For each product: description 80–150 words; fabric or material, size guidance, care and photo requirements; 4-image story consistent across views; do not insert invented brand reviews. All prices and stock explicitly sample.

Every entity must have immutable unique id and stable slug; AR/EN independent titles and bodies (not duplicated placeholders), coherent region/price/attributes/tags, image-set references, relation ids, visibility, status, dates where meaningful. All filters, counts, detail pages, compare and submissions MUST read the SAME source of truth. Data must never randomly change between renders. Use EGP as examples if prices are displayed and mark them illustrative.

**Seeded scenario fixtures to prove non-happy paths:**

- sku-01 M ivory stock=7; qty 2 works and decrements simulated availability only if order policy says so
- Sold-out combination stock=0; add action disabled
- Promo 10% requires >=1000 EGP, max 200 EGP; expired code rejected
- Cairo shipping 70 EGP, Alexandria 95 EGP, other zone 125 EGP (all illustrative)
- Two distinct variants stay separate in cart; same variant merges
- Session A cannot see Session B demo order

## 5. Real CMS / protected operator experience for this vertical

Product catalog, variants, stock, collections, editorial sections, sample promo rules and shipping zones, demo orders (SIMULATED) with read-only timeline. Changes to stock must appear in product, search, cart and checkout validation.

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

- [ ] Journey 1: Full shopping cart to demo COD — works in AR/EN and survives reload where expected
- [ ] Journey 2: Out-of-stock handling — works in AR/EN and survives reload where expected
- [ ] Journey 3: Coupon rejection — works in AR/EN and survives reload where expected
- [ ] Screen 01 `/` is built with complete content and correct interactions
- [ ] Screen 02 `/collections` is built with complete content and correct interactions
- [ ] Screen 03 `/collections/[slug]` is built with complete content and correct interactions
- [ ] Screen 04 `/products/[slug]` is built with complete content and correct interactions
- [ ] Screen 05 `/search` is built with complete content and correct interactions
- [ ] Screen 06 `/wishlist` is built with complete content and correct interactions
- [ ] Screen 07 `/cart` is built with complete content and correct interactions
- [ ] Screen 08 `/checkout` is built with complete content and correct interactions
- [ ] Screen 09 `/orders/[id]` is built with complete content and correct interactions
- [ ] Screen 10 `/story` is built with complete content and correct interactions
- [ ] Screen 11 `/journal` is built with complete content and correct interactions
- [ ] Screen 12 `/journal/[slug]` is built with complete content and correct interactions
- [ ] Screen 13 `/help` is built with complete content and correct interactions
- [ ] Domain admin edit → SQLite → public site reflects changes; draft/publish works.
- [ ] Responsive screenshots at 320/390/768/1440px; Arabic long text and RTL icons verified.
- [ ] Every seeded detail entity has unique narrative and coherent visual evidence.
- [ ] Server-side input validation, no fake booking/payment/sale, no leaked PII or fictional claims.
- [ ] E2E happy path + invalid inputs + empty states + refresh + admin permissions pass.

## 8. Commercial demo presentation

At end of journey, small opt-in panel: “Want a website like this for your business?” with specific outcome labels; open REAL Mavvix sales contact or known website, not fictitious merchant communication. Add an unobtrusive return-to-showcase link. Never obscure site content with upsell. Screenshot primary fold and primary conversion flow for ads, including mobile, with demo attribution visible.

## 9. Completion evidence that Gemini must save

- `progress/evidence/05_ecommerce/routes.md` complete route table and implementation status.
- `progress/evidence/05_ecommerce/journeys.md` Playwright command/results and persistence assertions.
- `progress/evidence/05_ecommerce/screenshots/` 390px+1440px screenshots of homepage, deep detail, flow review and admin.
- `progress/evidence/05_ecommerce/design-review.md` concrete differences from previous demos, copy QA, known limitations.

**NO ACCEPTANCE WITHOUT PROOF.** If route missing, functionality decorative-only or tests not run, mark PARTIAL.
