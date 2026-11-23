# Oakline Living — furniture customization website research (checked 2026-11-23)

Commercial position: branded custom furniture consultation and **nonbinding RFQ basket**, not a generic hardcoded ecommerce checkout. Oakline is a Mavvix editorial brand, not a manufacturer/showroom or genuine client.

## Real competitors / workflows

| Brand | URL | Observed first-party offering | Mavvix opportunity |
| --- | --- | --- | --- |
| IKEA Egypt | https://www.ikea.com/eg/en/planners/ | Web planning tools include living room, kitchen and storage; product lines plus online design consultations | More tailored builder for a single furniture atelier, rather than claiming full real-time CAD integration |
| Homzmart Egypt | https://homzmart.com/en/c/furniture | Furniture assortment including dimensions, materials/colours, sale prices and buyer selection | A single-maker catalogue can explain textiles, joinery, finishes and service process instead of competing on discount marketplace traffic |
| Enzo Egypt | https://www.enzofurniture.net/made-to-order-furniture-egypt | Made-to-order sofas/beds with selectable size, shape and fabric; product scope and consultation before production | Preserve manufacturing lead-time/quote approvals as an explicit workflow rather than inventing live inventory or instant fixed prices |
| IKEA Egypt interior design services | https://www.ikea.com/eg/en/customer-service/services/interior-design-service-home/ | Design/planning consultations and room measurements | A distinct room-first brief can request proper measurements and materials without presenting false fully finished renders |

Sources checked 2026-11-23. These are workflow comparisons, not evidence of sales conversion or ad-spend data. No Meta Ad Library ad ID or verified CPC/CPL collected.

## Buyer problem and visual direction

Egypt buyer intents are hypotheses: `ركنة بالمقاس`, `تفصيل كنبة خشب زان`, `شركة أثاث حسب الطلب`, `أوض نوم تفصيل`, `مكتب خشب حسب المقاس`. GCC queries: `أثاث تفصيل بالرياض`, `تنجيد كنب حسب الطلب`, `custom sofa Dubai`. No search-volume figures claimed.

**Brand art direction:** Oakline Living — warm oat `#F4EFE6`, natural oak `#BA9062`, deep cocoa `#392C24`, dark olive `#60694F`, bone cream. Editorial serif English headings `DM Serif Display`, considered Arabic typography `IBM Plex Sans Arabic`; asymmetrical furniture photography and room-mood editorial; significantly different from prior stadium, gym, automotive, clinic and salon identities.

**Actual vertical visitor flow:** choose room, product category/product, material (allowed by that product), finish/fabric, width/depth/height in mm within approved illustrative limits, quantity, then add several items to quote basket and submit contact with consent. Compute an **indicative dimension summary, not an invented binding price**. Persist each line's validated canonical product slug and configuration to SQLite; return `MVX-OAK-*` with `pending_operator_confirmation` and admin queue. Require author approval for real product names, materials, dimensions, finishes and commercial terms before real use.

## Photo rights (real, non-client/editorial)
1. **Jarosław Ceborski** photograph "Living room (Unsplash).jpg" on Wikimedia Commons https://commons.wikimedia.org/wiki/File:Living_room_(Unsplash).jpg , CC0 1.0: 5,346×3,568, original dated 2017-05-03 before Unsplash license changed. Depicts real modern room with blue sofa and chair; NOT an Oakline room.
2. **Stephen Di Donato** photo "Furnished living room. (Unsplash).jpg", https://commons.wikimedia.org/wiki/File:Furnished_living_room._(Unsplash).jpg , CC0 1.0, original dated 2016-08-03, 3024×4032, shows white sofa and brick wall in an independent Montréal home; NOT an Oakline project.
3. **Pixel.la** "Couch-furniture-living-room-sofa (24300293356).jpg", https://commons.wikimedia.org/wiki/File:Couch-furniture-living-room-sofa_(24300293356).jpg, CC0 1.0, 3089×2048, another unrelated couch. All image access must be Chromium verified, do not invent local asset path.

## Qualitative market priority hypothesis only
Urgency 3.9×.30 + differentiation 4.6×.25 + reuse 4.3×.20 + project value 4.2×.15 + reachability 4.2×.10 = **4.23/5**. Not a measured TAM/CAC, no published Meta campaign intelligence.

## Safety and ethical copy
- Product entries are **concept specifications**, not in-stock items or real customer orders.
- No fake partner mills, wood certifications, warranties, production schedules, addresses, discount prices, product reviews or manufacturing claims.
- Material choice is aesthetic/brief selection, not confirmed available stock; all dimensions owner-approved at production.
- Quote is nonbinding pending real craftsman assessment. The real owner must provide images, pricing, product availability, delivery policy and legal terms before site deployment.
