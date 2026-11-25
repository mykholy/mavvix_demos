# GlossBay — car-detailing vertical creative and engineering brief
Date: 2026-11-24. Stage: Wave 2, first vertical **pending latest CI & visual QA**.

## Why it is different from Torque Garage
- Torque Garage: orange/industrial service triage and mechanic diagnostics.
- GlossBay: fluorescent ice-blue on ink-blue premium car cosmetics, surface texture and panel-by-panel inspection.
- Typography: Rajdhani condensed/grotesque for English display and IBM Plex Sans Arabic for Arabic; no binary font redistribution. Use locally available system fallback if Google Fonts are inaccessible.
- Art direction: electric detailing bay, chrome reflection, monochrome edges with cyan traces; asymmetric photographic half-hero rather than repeated mechanic engine card; sharp small radius and long, editorial service explanations.
- Palette: ink `#0D1626`, deepest background `#08111F`, accent `#4CCBF4`, readable accent text on light `#09627E`, pearl white `#F4F7FA`, steel surface `#DDECF3`. Text on cyan must use ink, not white.
- Section rhythm: dark hero → filterable surface selector → light technical paint inspection → densely edited care catalogue → dark cabin material story → white protection comparison → full image credit → fleet scope → process → articles → FAQ → Mavvix B2B CTA.
- 12 homepage sections, at least five uniquely about automotive detailing: surface inspection, material care, ceramic/PPF distinction, fleet maintenance, photo attribution and consumer safety questions.
- Responsive: 360, 390, 768, 1440 viewport Chromium; hero image remains editorial and should not obstruct readable text, CTA targets 44px minimum. Mixed-direction content must still use AR RTL/EN LTR at the sector root.
- No real client claims, review counts, paint correction percentages, certification badges, operating address, price/stock, staff, bookings or warranty.
- Photograph: Commons `Exterior Car detailing.png`, Jeffkbookoo, CC0 1.0; remote preview verified by web and verified page license. Not GlossBay customer. Source logged in media manifest. Browser image/crop test is a mandatory release gate.
- Interactive: choose size (compact/sedan/SUV/large-SUV), ten service treatments, four add-ons and condition/time/region; server validates with an allowlist, checks consent, saves reference with idempotency and nonbinding status. No invented price or quote calculation.
- SEO: independently authored bilingual page titles/descriptions and detail metadata. Concept preview uses `noindex` until a verified public portfolio origin and owner-controlled branding policy are set. Commercial client implementation requires canonical/hreflang/OpenGraph and owner-approved LocalBusiness facts.
- Competing buyer patterns reviewed in `research/car-detailing.md`: ClearQ, Obsessive Car Detailing, ESD Riyadh and Repair2Care.
- Alternate directions considered: high-end dark ceramic gallery (too close to automotive product photography), all-white mobile car wash service (too similar to Fixora service utility), chosen low-key cyan automotive-surface editorial language to differentiate from both.

## Acceptance evidence required
- Unit/content test, data migration+seed on fresh DB, typecheck, full build and 34 AR/EN route checks.
- POST JSON validation tests (consent false, vehicle-size invalid, treatment invalid, duplicate add-ons), SQLite save, admin access control, exact idempotent receipt.
- Browser screenshots & axe: 360 / 390 / 768 / 1440, AR & EN; no horizontal scrollbar, broken image, inaccessible contrast or covered form submit.
- Manual imagery and real product licensing validation, performance trace and owner-specific data when delivering commercially.
