# Nomad Routes — travel agency sector research and implementation brief
Checked 2026-11-25. Original Mavvix portfolio concept; not a tour operator, ticket seller or confirmed booking engine.

## Verified comparator journeys
| Provider | Public source | Observed feature | Original design response |
|---|---|---|---|
| Memphis Tours (Egypt) | https://www.memphistours.com/plan-your-trip?source=google | Destination, details and finalize sequence for bespoke trips | Build a destination-led brief with explicit travel preferences and review step |
| Almosafer (Saudi Arabia) | https://sa.almosafer.com/en/packages | Domestic, international and cruise package categories, customizable travel | Distinguish destination, travel style and inclusions; do not imply live inventory |
| Mosook Travel (Saudi Arabia) | https://mosooktravel.com/en | Day-by-day package descriptions, destination browse and quote request | Show meaningful route dossiers, exclusions, and a scoped enquiry instead of fake availability |

No verified traffic, acquisition cost, lead volume, prices, ad performance or conversion data. Do not copy provider content or credentials.

## Brand and experience
Nomad Routes: a travel-editorial art direction, ink forest #18352E, sand #F4EBDD, terracotta #A4492D, ivory #FFF9F0; use available self-hosted typography or editorial serif English + legible Arabic, not generic gradients. Hero image: genuine Luxor landscape. Design homepage with 9+ substantive sections: destination map/list, travel styles, featured itineraries, day-by-day journey ribbon, pace and transfer guide, explicit inclusion/exclusion comparison, country selector, custom trip planner, original travel notes, FAQ and Mavvix CTA. Four domain-only interaction patterns minimum: trip duration/category filter, itinerary steps, pace/inclusions comparison, preference-based planning brief.

## Scope and data
Authored bilingual trip catalogue at data/verticals/travel-agency.json: eight distinct route concepts, three editorial guides, five FAQs, CC0 media manifest. Planned route families: destinations, journeys, journeys/[slug], travel-styles, planning, inclusions, guides, guides/[slug], quote, FAQ/about. Add dedicated validation with permitted journey slug, country, duration/date window, group size, budget band, pace, contact and consent, optional allowlisted UTM, UUID idempotency. No passport, identity, card, visa documents, payment, or real availability. Persist pending-only reference MVX-NOM-* with role-protected admin. Country/journey compatibility must be checked server-side.

## Media
- Mustang Joe / Joe deSousa, Floating over the Valley of the Kings, Luxor, Egypt (photograph), https://commons.wikimedia.org/wiki/File:Floating_over_the_Valley_of_the_Kings,_Luxor,_Egypt_(54480104477).jpg — CC0 1.0, file page and 1280px preview inspected 2026-11-25. No balloon activity is sold or included by this portfolio concept.
- Warren LeMay, Nile River, Luxor, LG, EGY (48009685371), https://commons.wikimedia.org/wiki/File:Nile_River,_Luxor,_LG,_EGY_(48009685371).jpg — CC0 1.0, license/source checked; actual image response and crop must be verified before use.
- All imagery must be independently licensed and accurately captioned; no operator ownership claims. Do not use Luxor media to illustrate Saudi locations.

## Release gates
Registry remains planned until routes, validated API, seed, admin integration, and tests are implemented. Run AR/EN route, DB persistence, idempotency, malicious input, admin access, responsive browser/axe, image load and SEO checks. No operator licence, availability, booking, visa, price or testimonial claims; no indexing as a real agency. Real public operator requires verified identity and terms. Keywords are hypotheses: شركة سياحة، رحلات الأقصر وأسوان، برامج سياحية مصر، باقات سفر السعودية، tailor-made Egypt tours.
