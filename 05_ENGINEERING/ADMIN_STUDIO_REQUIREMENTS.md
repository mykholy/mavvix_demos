# Client-grade Content Studio / protected admin: actual behavior, no cosmetic dashboard

## Scope
A single codebase, eight independently branded client demos, each with site-specific content and domain modules. A protected multi-site operator can preview and publish; ordinary demo visitor cannot edit. The admin UI is not the primary marketing screenshot, but it must demonstrate that the sites are practical, dynamic products, not static mockups.

## Required global screens
1. **Login**: valid/invalid state, secure session cookie and logout, lock/rate-limit repeated failures, password hashed. Test access denied to unauthorized users, no credentials in repo. Configure bootstrap owner via env, not fixed email/password.
2. **Workspace switcher**: selected demo/site, count of draft pages, items and simulated submissions derived from DB. Never allow cross-site mutation using changed URL id.
3. **Dashboard**: count published pages, posts, catalog records, requests; last updates and draft warnings; charts optional but never random numbers.
4. **Pages & sections**: list by locale/visibility; create route key; reorder sections; choose from predefined safe section variants per sector; edit AR/EN fields; preview draft and publish; rollback revision. Do not allow arbitrary HTML/JS injection.
5. **Brand Settings**: name/logo references and safe theme tokens; contrast check, font choices with proper glyph coverage, preview in AR/EN and at mobile width; changes reflected in site-specific layout without cloning sibling identities.
6. **Media Library**: upload or select prebundled assets; type/size limits, filename sanitization, alt AR+EN, license/source metadata, crop/focal point selection; no third-party hotlinks by default.
7. **Blog/Journal**: posts, categories, author label, SEO metadata, schedule/status, formatted blocks, related entities, draft/publish. Published index and details read same source.
8. **SEO Manager**: title/description and slug by locale, OG image, canonical preview, sitemap inclusion for Mavvix Showcase only; sector previews remain noindex.
9. **Submissions**: by vertical and type, filter status/time, view redacted records/lines, mark reviewed/archived. Never trigger real fulfillment, booking, medical action, shipping, email or billing.
10. **Revision history**: diff summary and restore previous version with confirmation and audit log.
11. **Settings/Diagnostics**: demo-only banner, database/runtime mode, current migrations, seed dataset version, all known limitations.

## Domain-specific menus
- Construction: Projects, Services, Tender enquiries, Processes, Project galleries.
- Industrial: Product categories, SKUs & variants, technical documents, RFQ line items, process profiles.
- Real Estate: Developments, Units, gallery/floorplan assets, unit statuses, viewing enquiries.
- Dental: Services, team, example branches/time preferences, guides, enquiries; no patient chart.
- Ecommerce: Collections, Products, variants/stock, sample promotions, shipping rules, simulated orders.
- Portfolio: Cases, case sections, services, journal, project briefs.
- Restaurant: Menu/categories, ingredients/allergens, modifiers/prices, locations/slots, sample orders/table requests.
- Academy: Courses/tracks, lessons, preview/quiz editor, instructors, progress (aggregated only), interest requests.

## Must-pass workflow, not just buttons
Start with a published construction project and an image asset. Admin updates bilingual title, changes cover image, marks feature, saves draft: public remains unchanged until Publish. Preview shows draft. Publish updates project page and listing; browser refresh confirms. Restore prior revision returns original. Audit logs identify editor and action. Similar at least one domain record in each other vertical.

## Authorization & visibility
Role owner can edit all concept sites; editor may edit specified sites; viewer read only. Scoped queries must validate site id on server. Prohibit mass assignment and require action-level auth checks. No public admin auto-login credentials included in images, README or repo. Sales tour is static guide or read-only sample, never writable.

## UX requirements
Responsive at 390px, keyboard-editable, autosave draft not auto-publish, unsaved changes guard, optimistic UI only with rollback on request error, deterministic toasts and inline form errors, safe delete confirmation, plain-language bilingual copy. Support site content draft/preview and user-friendly empty-state instructions.
