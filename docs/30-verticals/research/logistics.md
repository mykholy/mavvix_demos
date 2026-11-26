# RouteLine Cargo — sector 24 / competitor research
Reviewed 2026-11-26. No competitor affiliation or independently verified performance.

| Comparator | Public source | Observed approach | RouteLine response |
|---|---|---|---|
| DHL Global Forwarding Egypt | https://www.dhl.com/eg-en/home/global-forwarding/mydhli/explore-mydhli.html | Quote, tracking, documents and modal comparison | Separate enquiry references from actual carrier tracking; mode-based comparison and privacy-safe freight brief. |
| Egytrans | https://egytrans.com/en/about-us | Integrated sea, air, land, clearance and warehousing | Eight distinct freight and support service dossiers with explicit scope boundaries. |
| Almajdouie Logistics | https://www.mlc.sa/service-freight-forwarding.php | Road, air, ocean and FCL/LCL offering | Expose full vs shared-load considerations and a route-aware structured enquiry. |
| Green Point Logistics | https://gpl.com.eg/quote | Quote by route, direction, mode and service scope | Scope-aware form, avoid fabricated pricing, separate charge categories. |

## Art direction
Industrial editorial: ink #102A3A, steel #31566C, signal amber #F3B43F, warm paper #F5F3ED. Technical route diagrams, cargo scope, mode comparisons, freight milestone timeline and a compact bilingual brief. No invented assets, offices, clients, statistics, shipping events, live tracking or rates.

## Media
Singapore terminal photograph by chuttersnap, published 2017-05-10 under CC0 per https://commons.wikimedia.org/wiki/File:Shipping_terminal_in_Singapore_(Unsplash).jpg. Source page confirms author, subject and 3991×2661 original. Source page checked; image bytes still need retrieval, decoding, visual inspection and local WebP storage. Never present the pictured port as a RouteLine facility.

## Engineering gates
Implement eight service dossiers, three guides, five FAQs, nine+ substantive home sections, domain-specific modal comparison, shipping scope and milestones, enquiry reference explanation. Dedicated strictly validated freight enquiry: allowlisted mode/service, origin and destination, cargo category, weight band, scope, date, minimal consented contact, UTM and idempotency. No restricted cargo, sensitive trade documents, live shipment tracking, pricing or payments. Use existing SQLite and protected admin queue. Extend all-site source/HTTP/browser/axe/security tests. Registry stays planned until complete. No other sector in this PR.
