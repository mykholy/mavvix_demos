# Luma Events — implementation checkpoint (2026-11-25)

Independent sector #23, based on merged main 0a9fe78cb1151486df4ed3c33faed1ce592e92b9. PR #2 and #3 are merged. One new sector per PR; do not add other sectors here. Registry remains planned until the routes and flow are implemented and verified.

## Art direction and next implementation
Original visual identity: deep plum #291C2D, champagne #DCB8A6, cream #FCF7F1, dark rose #874F63. Editorial layout, strong Arabic typography and event-production visual language. Real photo sourcing and three comparator operator reviews are still required; no unverified media is included yet.

Homepage: event-type selector, featured experiences, guest-journey timeline, venue/guest brief, production phases, scope comparison, event dossier grid, editorial guide, FAQ and commercial CTA. Page families: experiences, experience detail, event types, planning, production, venue brief, guides, guide detail, enquiry, FAQ and about.

Implement strict event enquiry with allowlisted service slug, country, date preference, guest band, venue status, event type, budget band, consent, minimal contact fields, UTM and idempotency key. Persist pending-only reference in existing portfolio tables and protected queue. No guest lists, IDs, payment details, confirmed venue bookings, unverified capacity, price, testimonials or supplier claims.

## Acceptance
Complete competitor research and actual licensed image validation, then all UI/API/seed/registry/gallery/ContactDock changes. Extend tests for prior 22 sites plus new sector: AR/EN, desktop/mobile/tablet, navigation open/close, axe, image loads, SEO metadata, persistence, duplicate and invalid payload checks. Full security audit and exact-head checks before merge; screenshot review. No deployment or ads authorized.
