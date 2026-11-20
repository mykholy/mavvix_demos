# 07 — SAFFRON TABLE / سفرة زعفران — Route Acceptance Table

**Vertical:** Restaurant & Culinary Digital Experience  
**Mandatory for complete eight-demo release:** YES  
**Route prefix:** `/[locale]/preview/restaurant`  
**Brand Identity:** SAFFRON TABLE / سفرة زعفران (EST. 2021)  
**Palette:** `#FAF3E6` (warm parchment), `#321F18` (deep clove/espresso), `#BA5C34` (saffron terracotta), `#8B8B52` (olive herbal)

---

## Complete Route Audit

| Screen | Route Path | Title (AR / EN) | Status | Key Interactive Features Verified |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `/` | الرئيسية / Home | **DONE** | Dual conversion (Order vs Book Table), 4 seasonal highlights, 3 branch cards with sample hours, kitchen philosophy snippet, menu category shortcuts, discrete Mavvix concept disclosure. |
| **02** | `/menu` | قائمة الطعام / Menu | **DONE** | 6 category tabs, live ingredient/title search, dietary filter (Vegetarian), allergen exclusion filters (No Nuts, No Dairy, No Gluten, No Eggs), live matching count, reset button, quick add and customize links. |
| **03** | `/menu/[slug]` | تفاصيل الطبق / Dish Detail | **DONE** | Full dish dossier, recipe heritage story, preparation window, 0-3 spice scale indicator, portion size selector (Regular/Large), optional add-ons customizer with delta pricing, live line total calculation, quantity stepper, pair suggestion, add to order bag. |
| **04** | `/order` | حقيبة الطلب / Order Bag | **DONE** | Review ordered items, portion sizes and extras badges, quantity steppers, item removal, copyable formatted order preview text with clipboard feedback, sample takeaway packaging fee (15 EGP), simulated pickup form, server recalculation and SQLite persistence as `flow_type = 'restaurant_order'`. |
| **05** | `/locations` | الفروع والمواعيد / Locations | **DONE** | 3 fictional branch profiles (Garden Pavilion in Zamalek, Corniche Terrace in Maadi, Historic Downtown on Talaat Harb), regular hours, special Friday schedule notice, amenities, direct table request button with branch prefilled. |
| **06** | `/locations/[slug]` | تفاصيل الفرع / Branch Dossier | **DONE** | Architectural and spatial atmosphere, full weekly opening schedule, table capacity, preview of sample time windows from SQLite, direct CTA to reserve a table at this branch. |
| **07** | `/reserve` | حجز طاولة / Table Reservation | **DONE** | 3-step interactive booking wizard: Step 1 (Branch, party size 1-8, seating preference: indoor/courtyard/salon), Step 2 (Date picker, sample time slots from SQLite with unavailable slots disabled e.g. `r-slot-04`, `r-slot-10`), Step 3 (Guest details, special allergy notes), server validation, SQLite persistence as `flow_type = 'restaurant_table'`, simulated REQUESTED receipt. |
| **08** | `/story` | قصة المطبخ / Kitchen Story | **DONE** | Sourcing manifesto (100% pure mountain saffron, first-press cold olive oil, daily stone-ground spices, clay tagines), 4 seasonal menu cycles, ethical demo disclosure. |
| **09** | `/journal` | يوميات المطبخ / Journal | **DONE** | 6 long-form culinary essays, category filter tabs, search, reading time indicators. |
| **10** | `/journal/[slug]` | تفاصيل المقال / Article Detail | **DONE** | 300+ words in AR and EN across 3 structured sections, table of contents, author note, related dishes to try. |
| **11** | `/faq` | الأسئلة الشائعة / FAQ | **DONE** | 10 interactive FAQs covering kitchen allergen protocols, vegetarian options, saffron/oil sourcing, table party size limit (max 8), Friday prayer opening windows, Halal standards, and concept demo disclosure. |

---

## Database Integrity & Seeded Entities

- **demo_sites**: `site-restaurant` (published, theme: `#FAF3E6`, `#321F18`, `#BA5C34`, `#8B8B52`).
- **restaurant_dishes**: 30 seeded dishes across `breakfast` (5), `starters` (4), `mains` (9), `desserts` (4), `drinks` (8).
- **dish_modifiers**: 72 modifiers (portion size options + extras add-ons with delta pricing).
- **demo_time_slots**: 14 sample dining slots across 3 branches with 2 disabled fixture slots (`r-slot-04`, `r-slot-10`).
- **editorial_posts**: 6 rich culinary articles with complete Arabic and English localized bodies (250+ words each).
- **demo_submissions**: Relational SQLite persistence supporting `restaurant_order` and `restaurant_table`.

