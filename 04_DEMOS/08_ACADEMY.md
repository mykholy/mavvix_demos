# 08 — NOVA LEARNING / نوفا للتعلم — Production-grade interactive demo specification

**Vertical:** Academy & Online Courses | **Mandatory for complete eight-demo release:** YES | **Route prefix:** `/[locale]/preview/academy`

## 0. Delivery contract: this is a REAL WORKING DEMO, not a landing page mockup

This specification is a binding implementation checklist. Build all pages listed below with real routes, coherent localized content, domain-specific data, genuinely interactive controls, working validation, SQLite-backed transactions where required, and functional protected admin workflows. Do not mark complete when only the hero or main page looks good. No fake success state, fake claims, dead anchors, decorative filters, unimplemented navigation or buttons.

**Fictional demo brand:** NOVA LEARNING / نوفا للتعلم — display a discreet bilingual `Concept demo by Mavvix` badge and clearly explain simulated entities/transactions. No pretending this is a genuine paying client. No authentic testimonials, false certifications or unverified case-study outcomes.

**Personas:** Learner looking for fit, career professional comparing syllabi, instructor evaluating a branded course site without building LMS now.
**Primary business outcome:** Explore course syllabus and instructors, complete a real demo lesson quiz with persisted sample progress, submit enrollment interest; no paid registration or certificate.

## 1. Visual direction — must not resemble sibling demos

Thoughtful learning editorial: deep indigo #222A4D, soft periwinkle #E8EBFF, coral #E37E6B. Lesson outline rails, course syllabus accordion, high quality illustrations, instructor storytelling, no generic EdTech dashboard screenshots.

**Five signature differentiators (must be visible in working UI):**

1. Course discovery filters by subject, level, duration, language and price example
2. Curriculum tree with lesson previews and transparent unlocked content
3. Interactive local lesson player substitute (slides/text/video placeholder with transcript), chapter navigation
4. Quiz with scoring, explanations and persisted guest progress in SQLite or local session
5. Enrollment interest request, no actual account/payment/enrollment

**Art direction protocol:** Generate 2 substantially different hero concepts, choose one with a reason. Create a mini design system (spacing scale, background surfaces, main type pair, headings 64/48/36/28, grids, imagery, button/interaction states, section transitions). Distinct sections need visual rhythm and whitespace. Use coherent assets for each individual case/product/property, not random unrelated stock images. Arabic and English are fully composed and visually balanced. No visual cloning across demos.

## 2. Full route-by-route UX & functional acceptance

Each route is required in both languages (`/ar`, `/en`) and must survive direct refresh. Each page needs its own first fold, body content, mobile implementation, purposeful CTA, skeleton/empty/error states and unique metadata. Dynamic detail pages require populated distinct content for EVERY seeded record, not a generic repeated block.

### Screen 01 — `/` — Academy homepage
**Visitor job:** Offer clear learning paths
**Actual visual modules:** Editorial learning track hero, course finder, learning outcomes stated as examples not guarantees, instructor preview, sample lesson CTA
**Interactions, not mockups:** Track tiles lead to filtered catalog
**Page acceptance:** No false job placement guarantees

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 02 — `/courses` — Course catalog
**Visitor job:** Filter for fit
**Actual visual modules:** Subject/level/duration/language/price filters; card/list; sorting
**Interactions, not mockups:** Real filter and search across fixtures
**Page acceptance:** Counts match data

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 03 — `/courses/[slug]` — Course sales page
**Visitor job:** Evaluate real curriculum
**Actual visual modules:** Syllabus tree, skills/prereqs, lesson count, accessible instructor, practical projects, scope, sample course price
**Interactions, not mockups:** Preview module and enrollment interest CTA
**Page acceptance:** Syllabus linked to actual lessons

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 04 — `/learn/[courseSlug]/[lessonSlug]` — Demo lesson player
**Visitor job:** Experience course delivery
**Actual visual modules:** Lesson text/media transcript, chapter outline, exercise, next/previous, quiz and notes local
**Interactions, not mockups:** Next/previous works, progress updates after completion
**Page acceptance:** Never claim enrollment or award credential

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 05 — `/quiz/[lessonSlug]` — Lesson quiz
**Visitor job:** Test knowledge in functional way
**Actual visual modules:** 3–5 questions, answer selection, submission, explanations and result
**Interactions, not mockups:** Score deterministic, retries reset correctly, progress stored per session
**Page acceptance:** Correct answer checks on server or deterministic local data

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 06 — `/learning-paths` — Programs
**Visitor job:** Connect courses in meaningful sequence
**Actual visual modules:** Track map, prerequisites, course order, example outcomes
**Interactions, not mockups:** Navigate step to course
**Page acceptance:** No inaccessible phantom modules

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 07 — `/instructors` — Instructor directory
**Visitor job:** Establish instructor fit
**Actual visual modules:** 8 fictional educator cards with topics and related courses
**Interactions, not mockups:** Filter and profile links
**Page acceptance:** No fabricated academic accreditation

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 08 — `/instructors/[slug]` — Instructor profile
**Visitor job:** Explain teaching method
**Actual visual modules:** Bio as fictional, pedagogy, related courses
**Interactions, not mockups:** Course links
**Page acceptance:** No real person impersonation

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 09 — `/resources` — Learning resources
**Visitor job:** Make academy a resource
**Actual visual modules:** 6 meaningful articles and worksheets
**Interactions, not mockups:** Search, detail routes
**Page acceptance:** No filler posts

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 10 — `/resources/[slug]` — Learning article
**Visitor job:** Provide useful educational material
**Actual visual modules:** 300+ words, concept graphics, related courses
**Interactions, not mockups:** TOC and glossary
**Page acceptance:** AR/EN complete

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 11 — `/enrollment-interest` — Enrollment inquiry
**Visitor job:** Capture interest only
**Actual visual modules:** Selected course, level, target, timeline, sample contact, review
**Interactions, not mockups:** Validation and SQLite interest receipt
**Page acceptance:** Not enrolled, no tuition charged

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

### Screen 12 — `/faq` — Learning FAQ
**Visitor job:** Clarify expectations
**Actual visual modules:** Eligibility, schedule, access, certificates hypothetical
**Interactions, not mockups:** Topic accordion
**Page acceptance:** No claims of accredited certificates

**Implementation standard:** Design this screen at 390px and 1440px, verify correct links from its parent/child routes, show genuine sector-specific copy and illustration/photo choices. Use loading/empty/invalid states wherever the page has data or input.

## 3. Mandatory end-to-end journeys

The following flows must be executable by Playwright and demonstrable by a sales representative in 60–180 seconds. Every CTA/action either changes state or navigates to a real route.

### Journey 1 — Learner tests course and submits interest
**Exact steps:** Home > data analytics track > filter beginner and <8h > course nova-data-01 > syllabus > free preview > chapter > complete 4-question quiz > see score and saved progress > enrollment interest > DEMO request.
**Pass/fail oracle:** Quiz scoring repeatable; progress survives refresh in session; interest not purchase.

### Journey 2 — Learning path discovery
**Exact steps:** Learning paths > design track > prerequisite course > instructor profile > lesson preview
**Pass/fail oracle:** Every syllabus link resolves valid lesson

### Journey 3 — Invalid quiz / enrollment
**Exact steps:** Submit quiz incomplete > errors > complete; submit enrollment with invalid choice > reject
**Pass/fail oracle:** No ghost progress, no fake certificate.

## 4. Domain-specific data, content and consistency

**Seed requirement:** 12 courses across 4 tracks, 8 illustrative instructors, 60 lessons with 2 public demo previews per course, 3+ questions per demo lesson, 6 editorial resources, 8 FAQs, 3 price tiers as examples.

**Writing requirements:** Course outcomes are learning objectives, not guarantees; each syllabus unit includes objective, exercise and prerequisites. Demo lesson needs 400+ words or equivalent substantive interactive transcript; quiz explanations are specific.

Every entity must have immutable unique id and stable slug; AR/EN independent titles and bodies (not duplicated placeholders), coherent region/price/attributes/tags, image-set references, relation ids, visibility, status, dates where meaningful. All filters, counts, detail pages, compare and submissions MUST read the SAME source of truth. Data must never randomly change between renders. Use EGP as examples if prices are displayed and mark them illustrative.

**Seeded scenario fixtures to prove non-happy paths:**

- Course with 6 lessons and 2 previews; one preview has 4 quiz questions
- Quiz result 3/4 is 75%, persisted per session
- Course filter by duration and track matches actual seed
- Progress cannot be used as authentic qualification
- No lesson paywall or billing API unless future signed scope

## 5. Real CMS / protected operator experience for this vertical

Course catalog, lesson blocks, syllabus tree, question bank and correct answers, instructor profiles, learning paths and inquiry queue; admin can publish/unpublish lessons, but public preview only shows released sample lessons.

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

- [ ] Journey 1: Learner tests course and submits interest — works in AR/EN and survives reload where expected
- [ ] Journey 2: Learning path discovery — works in AR/EN and survives reload where expected
- [ ] Journey 3: Invalid quiz / enrollment — works in AR/EN and survives reload where expected
- [ ] Screen 01 `/` is built with complete content and correct interactions
- [ ] Screen 02 `/courses` is built with complete content and correct interactions
- [ ] Screen 03 `/courses/[slug]` is built with complete content and correct interactions
- [ ] Screen 04 `/learn/[courseSlug]/[lessonSlug]` is built with complete content and correct interactions
- [ ] Screen 05 `/quiz/[lessonSlug]` is built with complete content and correct interactions
- [ ] Screen 06 `/learning-paths` is built with complete content and correct interactions
- [ ] Screen 07 `/instructors` is built with complete content and correct interactions
- [ ] Screen 08 `/instructors/[slug]` is built with complete content and correct interactions
- [ ] Screen 09 `/resources` is built with complete content and correct interactions
- [ ] Screen 10 `/resources/[slug]` is built with complete content and correct interactions
- [ ] Screen 11 `/enrollment-interest` is built with complete content and correct interactions
- [ ] Screen 12 `/faq` is built with complete content and correct interactions
- [ ] Domain admin edit → SQLite → public site reflects changes; draft/publish works.
- [ ] Responsive screenshots at 320/390/768/1440px; Arabic long text and RTL icons verified.
- [ ] Every seeded detail entity has unique narrative and coherent visual evidence.
- [ ] Server-side input validation, no fake booking/payment/sale, no leaked PII or fictional claims.
- [ ] E2E happy path + invalid inputs + empty states + refresh + admin permissions pass.

## 8. Commercial demo presentation

At end of journey, small opt-in panel: “Want a website like this for your business?” with specific outcome labels; open REAL Mavvix sales contact or known website, not fictitious merchant communication. Add an unobtrusive return-to-showcase link. Never obscure site content with upsell. Screenshot primary fold and primary conversion flow for ads, including mobile, with demo attribution visible.

## 9. Completion evidence that Gemini must save

- `progress/evidence/08_academy/routes.md` complete route table and implementation status.
- `progress/evidence/08_academy/journeys.md` Playwright command/results and persistence assertions.
- `progress/evidence/08_academy/screenshots/` 390px+1440px screenshots of homepage, deep detail, flow review and admin.
- `progress/evidence/08_academy/design-review.md` concrete differences from previous demos, copy QA, known limitations.

**NO ACCEPTANCE WITHOUT PROOF.** If route missing, functionality decorative-only or tests not run, mark PARTIAL.
