# Bilingual/SEO/media production contract — all eight full demos

## Localization completeness
- Every page, product, case, FAQ, testimonial **placeholder or safely sourced** content, form state, modal, validation error, image alt and metadata is authored in natural Arabic AND English. Translation JSON is not necessarily word-for-word; localize meaning.
- Every internal route is accessible as `/{locale}/preview/{vertical}/...`; locale switch must retain equivalent detail slug and compatible filters. Use stable internal IDs when slugs localized.
- Arabic RTL: not just `dir=rtl` at root — arrow icons, stepper progression, aligned numerical specs, diagrams, pagination, input direction for email, telephone, costs and units all tested. Form fields preserve data while language switches. Touch target height >= 44px intended; test 200% zoom, visible focus.
- Arabic font must cover Arabic diacritics and weights; images and layouts allow 1.5× text growth. No horizontal scrolling at 320px. BiDi isolate LTR SKU codes and English technical terms.

## SEO and index policy
- Mavvix Showcase: indexable localized pages, canonical/hreflang, OG/X previews, server-rendered meaningful headings, static sitemap.
- All 8 fictional demo preview subtrees: `noindex,follow` and excluded from sitemap. Do not `robots.txt` block them in a way preventing crawler seeing noindex; don't add fake reviews/products as verified rich result structured data for fictional sellers.
- Proper SEO fields managed from protected CMS with sane defaults, arbitrary meta titles never duplicated for two published pages. 404 pages, redirects where changed slugs, breadcrumb semantics.
- Blog articles have meaningful content, author marked fictional/editorial demo, related topics, paragraphs/diagrams/checklists and no fabricated external citations.

## Image shot library
For EACH vertical produce and archive:
1. A unique high-res hero (desktop + mobile art-directed crop) and OG 1200x630.
2. At least 3 different section compositions (one infographic/diagram may be original SVG).
3. At least 3–5 visually coherent images per important detail record; never use unrelated places or product colors under one record.
4. Each article a cover image or designed editorial artwork.
5. Each collection/category a characteristic visual thumbnail.
6. An asset manifest: source, rights/license, alt_ar, alt_en, width, height, file path and any generated-asset provenance.
7. Real browser screenshots of each implemented site at 390 and 1440, not Photoshop comps.

Do not hotlink search thumbnails or embed copyrighted design examples from competitors. Use original generation or explicitly licensed photos. Generated concept visuals may not be represented as actual completed property/clinic/brand work. Do not use real people's faces or real company logos without permission. Use consistent fictional brand wordmarks; genuine Mavvix source logos only in Mavvix portions.

## Visual quality controls
- 2 truly different first-fold options for each vertical considered, one chosen; distinctive architecture beyond palette.
- Strong typographic hierarchy, visible visual rhythm, good whitespace, non-generic sector-specific visuals, defined hover/focus/disabled/empty states.
- Check real pages as screenshots: hero, listing, at least two detail types, action form/cart/quiz, and admin.
- Prefer intentionally designed layout to many animation plugins. Motion honors reduced-motion and won't hide content without JS.
