# Schema and fixture contract

## Common domain types
```ts
type Locale = 'ar' | 'en';
type LocalizedText = { ar: string; en: string };
type DemoSlug = 'construction' | 'industrial' | 'real-estate' | 'dental' | 'ecommerce' | 'portfolio';
type DemoAction = 'request_quote' | 'request_viewing' | 'request_appointment' | 'order_simulation' | 'portfolio_inquiry';
type DisplayMedia = { id: string; src: string; alt: LocalizedText; license?: string; isConcept: boolean };
type DemoListingBase = { id: string; slug: string; name: LocalizedText; summary: LocalizedText; mediaIds: string[]; isDemo: true };
```

## Provenance and validation
- Fixture content explicitly illustrative, `isDemo:true`; domain objects keep IDs stable and translations keyed by same ID.
- `src` paths for media must exist in project; missing image must be a conscious designed fallback, never broken image element.
- Per-sector spec fields in `04_DEMOS/*.md` are mandatory. Numeric filters calculate on numeric fields, not on translated strings.
- All money values numeric integer EGP, round in display only; no currency conversion guesses.
- Product cart keys include SKU + variant ID to avoid merging unlike variants.
- Property compare IDs limited to three; on refresh preserve via client store where relevant.
- Request record is **demo-only**; should never imply communication or fulfillment. Prefer no real contact fields stored on a public concept site.
- A reset/seed script should produce deterministic results without duplicate IDs. No dependence on external web APIs.

## Forms
Quote: company alias (demo), project type, scope tags, area m², timeframe (broad), notes (bounded). Industrial RFQ: lines (sku, quantity, unit), country, notes. Real-estate viewing: listing id, preferred date/time, alias. Dental: service id, practitioner optional, preferred slot, alias. Ecommerce: line items and simulated totals, no payment. Portfolio: service type and project synopsis. In all cases use request `mode='demo'` and clear response text.

## SQLite guidance
Use `sqlite_schema.sql` as conceptual schema, not a promise of final production architecture. Apply migrations, enforce `CHECK` constraints and foreign keys, use proper prepared statements, avoid exposing `.sqlite` file and clear demo records during resets. The seed content is primarily fixture JSON; SQLite only for persisting simulated user flows and repeatable tests.
