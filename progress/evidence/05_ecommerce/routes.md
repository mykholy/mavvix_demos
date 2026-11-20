# Ecommerce (Noria Atelier / نوريا أتيليه) — Route Verification Table

| Route | Purpose | Interactions | Validation & SQLite Persistence | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/[locale]/preview/ecommerce` | Brand Storefront | Campaign hero, category grid, trending products, material story | Reads SQLite products, collections, articles | DONE |
| `/[locale]/preview/ecommerce/collections` | Category Overview | 4 collection cards with item counts | Direct links to filtered collection views | DONE |
| `/[locale]/preview/ecommerce/collections/[slug]` | Collection Listing | Search bar, size/color filters, sort, result count | Variant availability indicators | DONE |
| `/[locale]/preview/ecommerce/products/[slug]` | Product Detail | Swatches, size selector, real stock, quantity, size modal | Disables add if variant stock=0 | DONE |
| `/[locale]/preview/ecommerce/search` | Product Search | Real-time query search across 24 products | Persistent query state & category filters | DONE |
| `/[locale]/preview/ecommerce/wishlist` | Saved Items | Wishlist cards, remove & move to cart | LocalStorage persistence, zero-ghost state | DONE |
| `/[locale]/preview/ecommerce/cart` | Persistent Bag | Line items with variant, qty increment/decrement, shipping zone | Pricing arithmetic + Coupon verification | DONE |
| `/[locale]/preview/ecommerce/checkout` | Simulated Checkout | Address zone, simulated COD only, terms agreement | Server-side re-pricing, creates SQLite order + lines | DONE |
| `/[locale]/preview/ecommerce/orders/[id]` | Demo Order Receipt | Line items, recalculated totals, redacted address | Session-owned ID lookup, SIMULATED badge | DONE |
| `/[locale]/preview/ecommerce/story` | Brand Story | Fabric heritage, tailoring philosophy, ethical craft | Links to product collections | DONE |
| `/[locale]/preview/ecommerce/journal` | Style Journal Index | 4+ editorial articles on slow fashion & styling | Links to editorial details | DONE |
| `/[locale]/preview/ecommerce/journal/[slug]` | Editorial Article Detail | Longform text (300+ words), related atelier items | Bilingual original copy | DONE |
| `/[locale]/preview/ecommerce/help` | Help & Care Policies | Shipping zones (Cairo, Alex, Other), return policy, FAQ | Fictional sample policies disclosure | DONE |

