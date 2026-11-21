# Mavvix Sector Landing Pages — Paid Campaign Handoff

## Campaign goal
Advertise **Mavvix website-development services** by allowing business owners to experience a polished, sector-specific design. This is not an advertisement for a fictional clinic, property seller, factory, restaurant, fashion retailer or accredited training institution.

## Verified real Mavvix channels
Officially published at https://mavvix.com/ar/contact and https://mavvix.com/en/contact (checked 21 November 2026):
- WhatsApp / click-to-call: **01062015302** / `+201062015302`
- Pre-filled WhatsApp action uses `https://wa.me/201062015302?text=...` and mentions the industry.
- Lead contact page: https://mavvix.com/ar/contact (Arabic), https://mavvix.com/en/contact (English).
- Email: `info@mavvix.com` (first-party business email; monitor deliverability before campaign spend).

## Eight direct campaign landing paths
| Offer | Arabic landing path | Internal conversion |
|---|---|---|
| Construction websites | `/ar/preview/construction` | Scope quotation, projects, services |
| Industrial B2B catalogues | `/ar/preview/industrial` | Catalogue, compare, multi-line RFQ |
| Real-estate sites | `/ar/preview/real-estate` | Unit filters, comparisons, viewing request |
| Clinic sites | `/ar/preview/dental` | Services, patient guide, appointment enquiry |
| Ecommerce stores | `/ar/preview/ecommerce` | Collections, variants, cart and controlled receipt |
| Creative portfolios | `/ar/preview/portfolio` | Case study structure and client project brief |
| Restaurant websites | `/ar/preview/restaurant` | Menu, modifiers, order request and table enquiry |
| Learning platforms | `/ar/preview/academy` | Courses, 60 subject-authored lessons, quizzes, progress |

Replace `/ar/` with `/en/` for English. Supply the actual deployed host after publishing the verified build; do not treat GitHub tree URLs as live landing pages.

## New conversion UI
- Every sector layout renders `ContactDock` on **every inner page**, not just homepage.
- Mobile: persistent green WhatsApp CTA ("عايز موقع زي ده") plus click-to-call button.
- Desktop: accessible expandable contact widget with WhatsApp, click-to-call and the Mavvix project-intake link.
- WhatsApp body is pre-composed with the industry type, not a generic "hi" message.
- Client-side click analytics emits `dataLayer` events `whatsapp_click`, `phone_click`, `contact_click`; optional `gtag` and optional `fbq('track','Contact')` fire only if those trackers are actually installed and permitted by consent settings. **No Meta Pixel ID or GA4 integration is configured by this change.**
- Top mobile/desktop utility strips display a contact CTA and preserve the current detail URL when switching AR/EN.

## Landing-page content
- Each sector contains a custom brand and visual design with 6+ existing sections plus two new domain-specific editorial and FAQ sections.
- Licensed editorial photography is visual art direction only; not evidence of delivered projects, physical locations, clinicians, exact SKU stock or client references.
- Fake addresses, unsupported factory certification claims and false academy working hours have been corrected in critical public-facing copy.
- Courses now seed 60 distinct topic-specific bilingual lesson headings, explanations and reviewable exercises. Real media assets, instructor credentials and certification still require the operating training company.

## Evidence and requirements before buying ads
1. Complete the latest GitHub Actions clean build/HTTP tests and run **actual mobile screenshots and human visual QA** for each AR/EN vertical. Automated smoke tests verify route reachability, not aesthetic excellence.
2. Deploy to a verified HTTPS domain with separate lead attribution and test WhatsApp click-through end-to-end from a real phone (including on Facebook/Instagram in-app browsers).
3. Connect actual Meta Pixel/Conversions API (with consent), analytics, form lead routing, CRM/notification inbox and customer-response SLA. Test real events against advertising dashboard.
4. **Critical:** The repository currently uses an unsupported Next.js 14 version. Upgrade to a maintained patched line and rerun CI; rotate historical Git-tracked credentials before exposure.
5. For ads, describe the product as "Mavvix can design/build a similar site for your business". Do not say the illustration brands are currently operating or that fictional doctors are licensed, properties exist, customers reviewed the service, factories carry certifications, kitchens fulfil orders or tuition/certificates are approved.
6. Publish accurate privacy/terms, make sure no patient medical details are submitted, and configure deletion of stale lead records.
7. Avoid "100% guaranteed leads/sales" promises. Run a small controlled campaign only after passing these gates.

**Status**: Premium **sales-presentation candidate**, not certified as a production operating business or ready to spend media budget until deployment, browser QA, security and consent validation pass.
