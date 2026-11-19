# Design craftsmanship contract

1. Design for a **sector-specific buyer's decision** rather than filling a page. Every above-fold includes a useful promise and next step, not generic agency buzzwords.
2. Different design DNA across the 8 demos: editorial composition, spacing ratios, color temperature, fonts, photography angles and CTA patterns. **Shared technical infrastructure, not shared look.**
3. Prioritize custom editorial decisions: non-centered heroes when justified; varied image crops; deliberate typography rhythm; crafted subsections; realistic data layouts; meaningful whitespace; selective transitions and microinteractions.
4. Do not use fake logos of client brands, stock portraits mislabeled "team", counterfeit manufacturer logos or invented testimonials. If demonstrations use fictitious names/photos, label "Demo data" in an accessible but discreet place.
5. No gratuitous gradients, glowing orbs, same shadcn buttons on every page, random decorative icons, neon-purple "AI look", uniform 3-card layouts, excessive glassmorphism, heavy parallax, endless section repeats, impossible mobile hero compositions.
6. 4-6 hero frames per industry are unnecessary. Instead compose one fully realized hero, one compelling listing/detail view and one meaningful interactive conversion flow.
7. Aesthetic QA: screenshot at 390x844 and 1440x900; inspect headline legibility, visual hierarchy, object-fit and crop, icon weight, footer finish, spacing consistency, button affordance, empty states, Arabic typography, nav overflow.
8. Motion: 120–280ms for most UI; 400–650ms for intentional reveals only; no auto-play critical content; honor prefers-reduced-motion; avoid scroll-triggered content that stays hidden if JS fails.
9. Colors must meet AA contrast for readable content; don't use pale text on light images unless overlay verified.
10. Photography art direction: prefer large honest industrial/process images for factories; lived-in architectural visual for construction; rich but restrained interiors for real estate; patient-neutral clinical images for medical; close-up tactile product visuals for ecom; candid workspace/process imagery for portfolio.
11. Prevent content collisions: realistic names, prices, SKUs, materials, photos and locations cannot conflict across category/list/detail routes. No unbounded lorem ipsum.
12. For demo branding use original fictional brand names from DESIGN_SYSTEMS.json and **do not use Mavvix's logo as the demo company logo**. Mavvix attribution should be subtle but visible near demo frame/footer.
13. For content hierarchy use 1 H1 per page, visible labels, real facts vs illustrative text, meaningful links, non-generic CTA labels, appropriate local formatting (EGP, area m², date locales).
14. Avoid the same nav structure for all: construction project-led, industry mega-category, real estate search-led, medical practitioner-led, commerce collections-led, portfolio narrative-led.
15. Device preview toggle on Showcase should NOT fake browser responsiveness; show actual responsive iframe where safe or provide device links/screenshots with real captured dimensions.

16. The two previously optional verticals (restaurant and academy) are fully mandatory in V2: food menu photography, allergen logic, academy lesson/quiz layouts require same artistic quality as the initial six.
17. All eight sites need 10+ actual routes, fully photographed and authored detail pages. A brilliant homepage does not compensate for thin inner pages.
18. A portfolio gallery must use authentic screenshots of the functioning built sites, not AI-generated designs passed off as deployed UI.
