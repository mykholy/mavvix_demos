# 07 — SAFFRON TABLE / سفرة زعفران — Tested User Journeys

**Vertical:** Restaurant & Culinary Digital Experience  
**Test Suite:** `tests/unit/restaurant.test.mjs` (10/10 passing assertions)  
**Persistence Engine:** SQLite WAL mode (`data/mavvix-demo.sqlite`)

---

## Journey 1 — Guest chooses meal & customizes order

- **Trigger / Starting Point:** Visitor arrives on `/[locale]/preview/restaurant/menu`.
- **Steps Executed:**
  1. Filter by category or search "Burger" / "Mains".
  2. Select dish `dish-13` (Mushroom Burger, base price 220 EGP / 22,000 cents).
  3. Navigate to `/[locale]/preview/restaurant/menu/dish-13`.
  4. Select Portion Size: "Large Feast Portion" (+35 EGP / 3,500 cents) or add extras.
  5. Select Extras: "Extra mushrooms" (+35 EGP / 3,500 cents).
  6. Set quantity = 2.
  7. Calculation: `(220 + 35) * 2 = 510 EGP` (51,000 cents) before packaging fees.
  8. Click "Add to Demo Order Bag" -> Line item saved in `OrderContext` (`localStorage` + state).
  9. Open `/[locale]/preview/restaurant/order` -> Review line items, quantity, subtotal, and 15 EGP packaging fee. Total = 525 EGP.
  10. Click "Copy Formatted Order Preview" -> Plain text preview generated with clipboard feedback.
  11. Submit Simulated Pickup Order -> POST `/api/demo/restaurant` with `flowType = 'restaurant_order'`.
  12. Server recalculates order line totals and stores submission in SQLite `demo_submissions`.
  13. Simulated order receipt rendered with reference code (e.g. `DEMO-REST-XXXX`).
- **Pass/Fail Oracle:**
  - `dish-13` base price = 22000 cents.
  - Extras +3500 cents * 2 = 51000 cents.
  - Packaging = 1500 cents.
  - Total = 52500 cents.
  - Matches specification fixtures to the exact cent.

---

## Journey 2 — Group table reservation preference

- **Trigger / Starting Point:** Visitor navigates to `/[locale]/preview/restaurant/locations`.
- **Steps Executed:**
  1. Select branch "Garden Pavilion (Zamalek)" -> click "Reserve Table".
  2. Navigates to `/[locale]/preview/restaurant/reserve?branch=rest-branch-1` with branch preselected.
  3. Wizard Step 1:
     - Select party size = 6 guests.
     - Select seating preference = "Shaded botanical courtyard".
     - Click "Proceed to Date & Slot".
  4. Wizard Step 2:
     - Select tomorrow's date.
     - View sample time slots loaded from SQLite `demo_time_slots`.
     - Verify unavailable slots (`r-slot-04` at 15:00, `r-slot-10` at 21:00) are disabled, line-through, and cannot be selected.
     - Select available slot `r-slot-06` (17:00).
     - Click "Proceed to Guest Details".
  5. Wizard Step 3:
     - Enter guest contact name and phone number.
     - Review booking summary.
     - Click "Submit Demo Table Request".
     - POST `/api/demo/restaurant` with `flowType = 'restaurant_table'`.
     - Server validates `partySize >= 1 && partySize <= 8` and checks `verifyRestaurantSlotAvailable`.
     - Request logged in SQLite with status `'requested'`.
     - Renders simulated confirmation receipt with clear disclaimer: "SIMULATED TABLE REQUEST — Pending host review, not a confirmed reservation".
- **Pass/Fail Oracle:**
  - Party size 0 or > 8 is rejected with `INVALID_PARTY_SIZE`.
  - Unavailable slot is rejected with `SLOT_UNAVAILABLE`.
  - Valid request persists to SQLite as `flow_type = 'restaurant_table'`.

---

## Journey 3 — Allergen conflict & transparency filter

- **Trigger / Starting Point:** Visitor opens `/[locale]/preview/restaurant/menu`.
- **Steps Executed:**
  1. Inspect menu: `dish-20` (Date Pudding) is displayed with badge `Contains: nuts` and `data-has-nuts="true"`.
  2. Click allergen filter button: "No Nuts / خالٍ من المكسرات".
  3. The menu instantly updates: `dish-20` is hidden from the rendered DOM.
  4. Matching dish count updates dynamically.
  5. Click "Reset Filters / إعادة ضبط الفلاتر".
  6. Filter resets: `dish-20` is restored and visible again with explicit allergen warnings.
- **Pass/Fail Oracle:**
  - `dish-20` has `allergens_json = '["nuts"]'`.
  - Filter reliably excludes `dish-20` without hiding safe dishes.
  - No false claims of clinical isolation or medical allergy immunity.

