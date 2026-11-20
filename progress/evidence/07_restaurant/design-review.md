# 07 — SAFFRON TABLE / سفرة زعفران — Art Direction & Design Review

**Vertical:** Restaurant & Culinary Digital Experience  
**Brand:** SAFFRON TABLE / سفرة زعفران  
**Design System Verification:** Complete  

---

## 1. Palette & Surface Hierarchy

- **Surface:** `#FAF3E6` (warm tactile parchment / unbleached flour).
- **Ink:** `#321F18` (deep roasted clove / espresso beans).
- **Accent:** `#BA5C34` (burnt mountain saffron / terracotta clay).
- **Secondary:** `#8B8B52` (wild sage & cold-press olive leaf).
- **Paper:** `#FFFFFF` (clean dining plates and recipe cards).

## 2. Typographic Rhythm & Differentiators

- **Arabic Typography:** Tajawal font with warm balanced line heights and natural diacritical breathing room.
- **English Typography:** Fraunces for editorial headings + Inter for high-density menu prices, ingredients, and allergen badges.
- **Visual DNA Distinction from Sibling Verticals:**
  - Distinct from E-commerce (Noria): Not a fashion grid; employs a menu-list hierarchy with ingredients, prep windows, spice indicators, and portion delta pricing.
  - Distinct from Dental (Lumen): Warm terracotta and olive tones instead of clinical sage and teal.
  - Distinct from Industrial/Construction: Handwritten badge accents, tactile earthenware motifs, and culinary narratives.

## 3. Interaction & State Feedback

- **Order Bag Counter:** Live badge on navigation ribbon updating instantly when dishes are customized.
- **Ingredient & Allergen Filter:** Client-side filtering with zero-lag search and dynamic dish counters.
- **Live Dish Customizer:** Real-time formula calculates unit price and line total when size modifiers or extra add-ons are toggled.
- **Table Booking Wizard:** 3-step progressive intake with real-time validation, capacity checking, and sample slot availability.
- **Persistent State:** Order bag drafts persist in `localStorage` without PII.
- **Server-Side Enforcement:** Server recalculates order line totals, applies standard packaging fees, enforces party size limits (1-8), and verifies slot status in SQLite before issuing receipts.

## 4. Ethical Commercial Demo Transparency

- Unobtrusive top banner explains that this is a simulated hospitality platform engineered by Mavvix.
- Order and table confirmation receipts explicitly state: "SIMULATED DEMO — Not submitted to kitchen or point of sale".
- Commercial CTA invites restaurant operators and hospitality chains to deploy a custom mobile-first ordering engine powered by Mavvix.

