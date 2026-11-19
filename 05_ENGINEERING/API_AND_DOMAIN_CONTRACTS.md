# Domain API & transactions contract

## Mandatory API semantics
| Method | Endpoint pattern | Auth | Invariants |
|---|---|---|---|
| GET | `/api/demo/:vertical/catalog` | public | Validated filter/sort; public/published only; pagination |
| GET | `/api/demo/:vertical/items/:slug` | public | Stable detail id, public status only |
| POST | `/api/demo/:vertical/requests` | guest | Zod schema per domain, generated opaque reference, demo-only status, idempotency key |
| POST | `/api/demo/ecommerce/checkout` | guest | Reprice from DB; stock and promo; simulate only; atomic order+lines |
| POST | `/api/demo/restaurant/order` | guest | Reprice dish and modifiers, reject unavailable; simulate only |
| POST | `/api/demo/academy/quiz` | guest | Validate lesson/question choices; deterministic score; store guest hashed progress |
| GET | `/api/demo/requests/:id` | guest-owner or admin | Guard by opaque session or token hash; redact sample contact |
| POST | `/api/admin/:vertical/:entity` | editor/owner | Strict authorization and site scope; safe create/update/archive/publish; audit record |

App Router route handlers may use different physical filenames, but semantics and tests must match; document final routes. Real market integrations are out of scope and forbidden by default.

## Response JSON pattern
```
{ "ok":true, "mode":"demo", "status":"simulated", "reference":"D-XXXXX", "persisted":true, "message":"Example only — nothing was sent" }
```
Do not invent reference if `persisted:false`. Never return "confirmed", "paid", "sent to clinic", "order dispatched". The action may be `submitted_demo` but not executed externally.

## Strong transaction guards
- Validate all `id`, `slug`, `quantity`, `variant`, `amount`, `slot`, `service` with DB lookup; no arbitrary client price or stock accepted.
- Guest rate limit, request body size cap, anti-automation controls with no marketing trackers, CSRF/origin protections as applicable, no raw SQL injection, no HTML from untrusted fields.
- Date/time store ISO UTC and display with region locale; future dates only for viewing/table preferences; do not imply real availability.
- An optional guest token is randomly generated client/session and stored only hashed server-side to protect receipts/progress. Session expiry and retention cleanup tested.
- Use 409 for conflicting/unavailable variant or booking preference, 422 for invalid input, 429 rate-limit, 401/403 admin denial; meaningful bilingual error states.
- GET catalog pagination/sort must be deterministic, not mutate data; filters URL-deep-linked and server/client aligned.

## Pricing formula examples
Ecommerce: `line_total = server_variant_price_cents × qty`; `subtotal = sum(lines)`; `discount = min(configured cap, eligible_amount × rate)`; `delivery = configured zone cost`; `total = max(0, subtotal − discount + delivery)`. All amounts integers in minor units; show EGP for Egyptian sample context.
Restaurant: `line = (dish_base_cents + sum(allowed_modifier_delta_cents)) × qty`; fees separately labeled. No arithmetic on strings in UI.
Industrial: RFQ may not have price: quantities must respect `min_qty` and `pack_multiple`; `NULL` price means request pricing, not zero EGP.
Real estate: monthly instalment calculator uses disclosed inputs and a pure formula (assumption based, no preapproved lender). Avoid hidden fees or lender logos.
