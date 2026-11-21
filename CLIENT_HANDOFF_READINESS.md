# Mavvix — Independent Sector Handoff Readiness Gate
**Date:** 20 November 2026  
**Scope:** Eight bilingual interactive commercial concepts, private repository `mykholy/mavvix_demos`, feature branch `feat/premium-production-hardening-20261120`.

## Important classification
**Technical presentation candidate ≠ live client website.** Every vertical contains purpose-built routes, at least eight source-level homepage sections including bespoke domain editorial and FAQ sections, verified Mavvix contact widgets on all inner pages, and persistent industry-specific lead flows. These features can support sales demonstrations. A site is **not eligible for handoff as a real operating business** until the real business owner supplies and approves its identity, imagery, pricing, factual claims, legal obligations and integrations.

## Evidence from executed CI
- Full clean npm install, schema migration and seed: PASS.
- Unit tests: **42/42** PASS; TypeScript compilation: PASS.
- Production build: **147/147 generated pages** PASS.
- Production HTTP smoke: **180 bilingual routes/detail pages** returned 200; eight sector-specific form submissions were persisted and returned references. Admin auth, Academy persistence and ecommerce price authority / private receipts were also exercised.
- Source-level check `npm run qa:handoff` now asserts key static routes, >=6 homepage sections, hero H1, editorial media and localization. **This is structural coverage only, not screenshots or product acceptance.**
- CI evidence: https://github.com/mykholy/mavvix_demos/actions/runs/44749590222

## Vertical acceptance matrix
| Sector / brand | Routes | Home sections after fixes | Primary transaction exercised | What needs real owner-backed information |
|---|---:|---:|---|---|
| Construction / Atlas Structures | 11 | 6 | 6-stage tender scope enquiry | Registered business identity, delivered project photography, scope certifications, verified case studies, service price terms and contact data |
| Industrial / Ferroline | 11 | 6 | Multi-line RFQ with SKU and MOQ validation | Original approved product specs/datasheets, stock and minimum order rules, factory/certification evidence, lead times, logistics terms and procurement contact |
| Real Estate / Meridian Residences | 12 | 6 | Unit viewing preference + comparison | Actual inventory/ownership, legal permits, floorplans and unit-specific photos, financing terms, availability and estate agent response process |
| Dental / Lumen Dental | 11 | 6 | Appointment interest request | Licensed clinicians, real clinic addresses/hours/phones, verified regulatory/clinical claims, appointment calendar, patient information/privacy and medical review |
| Ecommerce / Noria Atelier | 13 | 6 | Server-priced checkout preview + tokenized receipt | **Actual SKU-level product photos**, current variants/stock, approved catalog/price, shipping contracts, customer service, genuine order dispatch and legal return policy |
| Portfolio / Salma Hassan Studio | 10 | 6 | Structured creative project brief | Actual owner identity, permissioned client case studies and source assets, approved testimonials if any, real engagement contract and consultation contact |
| Restaurant / Saffron Table | 11 | 6 | Menu order request and table preference | Actual menus/ingredients/allergens/food photography, branches/hours/contact, kitchen/POS integration and reservation confirmation mechanism |
| Academy / Nova Learning | 12 | 6 | Enrollment interest + Academy quiz/progress | Actual instructors, **subject-specific full lessons**, training assets, structured graded assessments, certificate/accreditation wording and tuition/payment terms |

## Sector-by-sector content and functionality notes
### 1. Construction
Pages include Projects, project detail, Services, service detail, Methodology, Journal, Contact, About and a multi-step RFQ. The current projects are concept case studies in SQLite; actual works and client testimonials cannot be inferred from them. Verify exact services versus independent hardcoded service dossiers before client launch. Real contractor handoff additionally needs registration, procurement contacts, approved scope exclusions and tender pricing methodology.

### 2. Industrial
Six seeded product groups are now represented with counts driven from the database, not fictional category totals. The catalogue's Quick Add now persists SKU selections to a basket, which no longer prepopulates unrelated products. Request forms capture buyer details and validate MOQ on the server. Certification and manufacturing capability text must be checked against genuine factory documentation; no ISO/ASTM certification should be implied without evidence. Signed specification sheets and real packaging units are outstanding.

### 3. Real Estate
The homepage now covers residences, communities, a four-step buyer journey, buyer guidance and decision FAQ. Development detail listings now filter on the correct `development_id`. Example installment calculations are **not binding financing offers**; mock 120-unit masterplan and invented handover date claims were removed from development cards. Exact per-unit ownership documents, permits, photos and calendars still require a real operator.

### 4. Dental
Services, doctors, clinic locations, first-visit guidance, FAQ and appointment preference are implemented, and the form payload field mismatch was repaired. Synthetic clinician profiles **must not appear as credential-verified doctors**. Collect real registration/licensing data, real contact/working hours, patient privacy wording and clinical approval before representing the entity as a real clinic. The current form is a contact preference, not a medical booking engine.

### 5. Ecommerce
Category listings, product/variant selection, search, wishlist, cart, checkout preview, receipts, story, articles and care policies are present. Server recomputes price/stock independent of the submitted cart price. Catalogue photos currently use **shared lifestyle editorial references rather than verified photos of the exact item**; this blocks a genuine store launch. No real payments or dispatch are processed. Correct product images, refund terms, customer-service channels, and order handling are required.

### 6. Portfolio
Flagship cases, service dossiers, project brief, journal, About and Now now have a clearly articulated discovery-to-handoff design process and final conversion section. The case studies and sample outputs are fictional editorial compositions; do not label them delivered work or attach fabricated outcomes. Supply actual owner portfolio rights, real project permission and tailored contact details before launch.

### 7. Restaurant
Dish categories, item detail, custom options, order summary, branch pages, reservation requests, journal and FAQ are implemented. Both order and table-request APIs can persist records, but **no kitchen/POS or reservation provider is connected**. The seed uses generic ingredient examples for numerous dishes; allergies and labels must be approved by the food operator. Menus, food photos, hours and kitchen operations need owner verification.

### 8. Academy
The course catalogue, course detail, learning paths, instructor pages, textual lesson player, scored quiz, persisted guest progress, resources and enrollment requests work structurally. **60 distinct subject-specific bilingual lessons with separate titles, extended explanations and applied exercises** now seed from an authored curriculum file across 12 programs. A professional training product still requires independent academic review, full instructional assets, real instructor credentials, final quiz validation and certification/tuition approval. Require an author-approved lesson-by-lesson syllabus, actual exercises and answers, course assets, real instructor bios and proper non-accredited certificate disclosures until credentials are verified.

## Mandatory production handoff gates
1. **Identity/content evidence:** real company name/registration, logo ownership, licensed location/contact, permitted public claims and complete AR+EN copy approved by the client.
2. **Visual assets:** actual project/unit/dish/product/doctor imagery as appropriate, verified rights, correct mapping to each record, local optimized delivery, real device screenshots and visual regression review.
3. **Functional depth:** test every route, all form states, errors, duplicate submissions, mobile AR/EN, RTL, keyboard controls, empty/loading states, CRUD/admin workflows and transaction aftercare. Current HTTP smoke is not a replacement for browser-based E2E.
4. **Integrations:** transaction-specific booking confirmation, operational stock/orders, lead routing, email/WhatsApp notifications, CRM, payment/dispatch as contracted; current form persistence does not equal a fulfilled business transaction.
5. **Legal/compliance:** sector-appropriate privacy, cookies, consent, Terms/Returns, medical review, property permits, real certification evidence, electronic commerce obligations and data retention.
6. **Infrastructure/security:** rotate historically committed secrets, purge exposed history through an owner-coordinated process, move away from unsupported Next.js 14, set up production DB backups and retention jobs, HTTPS, edge rate limits, monitoring, secure deployments and role-based CMS.
7. **SEO/launch:** owner-approved indexability, sitemap/robots, metadata/hreflang, analytics events, real domains, social previews, accessibility and performance auditing.
8. **Business acceptance:** owner signs off assets, text, journeys, pricing, messages, emergency contact and publication permissions; only then mark the specific site Client Handoff Approved.

**Verdict as of this audit:** Eight strong, testable **commercial concept websites** on a private PR; **not eight production-operational client websites**. Keep PR Draft until these gates are met.

## 21 November conversion improvements
- The official Mavvix phone and WhatsApp **01062015302** are now exposed consistently through a fixed desktop/mobile contact dock in every sector layout and industry-prefilled WhatsApp deep links. Business enquiry entry pages link to the verified localized Mavvix contact site.
- Every industry homepage contains two additional sector-specific content sections, and distracting top notices have been replaced by a premium bilingual utility bar with deep-path language switching.
- Production smoke checks assert the exact WhatsApp/call URLs in both AR and EN; 60 Academy lesson plans have a machine-checkable content-quality gate.
- Localized descriptions and open-graph metadata now describe the website-development experience, not falsely verified real operators. Ads must promote **Mavvix building similar websites**.
- The documented route/form and Next.js build pass do not replace live browser visual regression, verified photography-to-product matching, consent/Pixel testing or real client-content acceptance.
