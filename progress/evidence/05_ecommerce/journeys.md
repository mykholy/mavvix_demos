# Ecommerce (Noria Atelier) — Journey & Oracle Verification

## Journey 1: Full Shopping Cart to Demo COD Order
- **Path:** Storefront → Collections (`apparel`) → Product (`product-01`) → Choose size M & color black (stock=6) → Add qty 2 → Go to Cart → Select Cairo shipping (70 EGP) → Apply coupon `DEMO10` → Proceed to Checkout → Complete simulated recipient address → Place simulated COD order → Order summary receipt (`/orders/[id]`).
- **Oracle Result:** PASS.
- **Database Verification:** Record stored in `demo_submissions` with `flow_type = 'ecommerce_order'`, status `'simulated'`, and associated lines in `demo_submission_lines`. Totals verified server-side.

## Journey 2: Out-of-Stock Variant Handling
- **Path:** Product (`product-01`) → Select size S & color ivory (sold-out combination with `stock_qty = 0`) → Add to Bag button disabled with clear notice: "Sold Out for this combination".
- **Oracle Result:** PASS. Prevents impossible ordering combinations.

## Journey 3: Promotional Coupon Validation
- **Test Matrix:**
  - `OLD20`: Rejected server-side as expired (Status 422: "This promotion code has expired").
  - `HUGE`: Rejected server-side if cart subtotal < 5000 EGP (Status 422: "Minimum order subtotal of 5000 EGP required").
  - `DEMO10`: Accepted when subtotal >= 1000 EGP, applying 10% discount up to 200 EGP cap.
- **Oracle Result:** PASS. Server-side authoritative validation and price recalculation.

