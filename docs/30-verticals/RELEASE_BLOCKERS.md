# Mavvix 30-Vertical Factory — source and release status (2026-11-24)

## Latest verified inventory (not a deployment claim)
- **Main** at source audit: `1ae79d8c29861c28a3f5ad450c2712a99e4a8361`; **Draft PR #2** on `feat/mavvix-30-verticals` is **unmerged**.
- Repo has **19 implemented homepage route families**: the eight original verticals plus **11 new** with bespoke pages, authored bilingual content and persisted sector-specific user enquiries. Registry marks these **8 `live` originals / 11 `in_progress` new / 11 `planned` unimplemented**. The new `live` field is strictly a legacy-state tag, not evidence that a physical service provider exists.
- Eight originals: `construction`, `industrial`, `real-estate`, `dental`, `ecommerce`, `portfolio`, `restaurant`, `academy`.
- Eleven added: `auto-service` (Torque), `home-maintenance` (Fixora), `salon-spa` (Velora), `fitness` (Pulse), `sports-venues` (Arena), `furniture` (Oakline), `interiors-kitchens` (Forma), `nursery` (BloomSteps), `car-detailing` (GlossBay), `physiotherapy` (Motion Lab), `veterinary` (PawWell).
- **Remaining 11 to implement:** Wave 2: `law-firm`, `accounting`, `travel-agency`, `events`, `logistics`. Wave 3: `skin-clinic`, `diagnostics-lab`, `boutique-hotel`, `solar-energy`, `recruitment`, `wholesale`.
- The legal research source `research/law-firm.md` exists, but **Lexora has NO actual website, API or commercial flow** and must remain `planned`.

## Verified on the complete PawWell code snapshot
- Source & Builds [45445629667](https://github.com/mykholy/mavvix_demos/actions/runs/45445629667) on `cc8102a8c66d149d14be76ee53d935994572406a` **completed success**: 55/55 unit tests, TypeScript, 684/684 Next.js statically generated pages, clean seeded SQLite, source audit, 180 older bilingual routes and eight legacy forms, ten previous sector requests, 32 bilingual PawWell route checks, strict species compatibility and no-health-history field rejection, idempotent persistent `MVX-VET-*` receipt.
- Chromium visual run [45445629641](https://github.com/mykholy/mavvix_demos/actions/runs/45445629641) was **still in progress** when writing this checkpoint. **Do not describe PawWell screenshot/a11y/image gate as successful until the exact run is completed and passing.** It inspects AR/EN mobile/tablet/desktop representative paths with image checks, overflow, heading metadata, focus labels and axe.
- Previous 18-vertical exact matching Source CI [45408426299](https://github.com/mykholy/mavvix_demos/actions/runs/45408426299) and Chrome QA [45408426432](https://github.com/mykholy/mavvix_demos/actions/runs/45408426432) were green (52/52 unit, 636/636 static pages). These are valid historical evidence **only**, not proof of 19-sector visual signoff.
- Two interim PawWell commits failed and were fixed: TS2345 optional `searchParams.species`; an old smoke test treating veterinary as not implemented. Their red checks remain part of historical QA evidence, and no checks should be hidden or erased.

## Hard blockers before PR merge/deploy/ads
1. Implement the eleven missing sectors with uniquely authored AR/EN domain content, real licensed visuals, 9+ substantial home sections, 7+ inner families, meaningful working persisted user interaction and role-protected admin.
2. **Framework**: Next 14.2.24 is unsupported. Upgrade `next` + `eslint-config-next` to a patched maintained version with regenerated lockfile, React/App Router async-param and routing/middleware migration, then full original/new regression. Do not edit only package.json.
3. Real-browser screenshots must be checked visually on 360/390/768/1024/1440 AR/EN, axe, focus, real image bytes/cropping, mobile direct WA/call and no horizontal scrolling; automated success is necessary, not sufficient.
4. Media provenance is not sufficient merely as a license link: verify every remote photograph's direct response, avoid reuse/mismatch or implied operator ownership; self-host compliant optimized assets where appropriate.
5. Review historical Git-exposed credentials, rotate them, enforce trusted proxy/distributed request rate limits, auth/CSRF, retention/deletion and explicit marketing tracking consent.
6. Production SEO origin canonical/hreflang, indexing policy and sitemaps require an approved URL. **Never index mock clinics/solicitors/hotels as real operating businesses or claim fake ratings/testimonials.**
7. Every real customer delivery needs owner-provided actual company identity, addresses, verifiable staff professional status, real prices/services, policies and licensed photo assets. Live calendars, dispatch, payments and CRM only if actually contracted and integrated.
8. Create final client/handoff checklist, evidence matrix, screenshots, 30-vertical URL/feature directory, marketing briefs and `FINAL_AUDIT.md` **after actual proof**, then review PR for merge.

## Release rule
**Do not merge Draft PR #2, deploy, advertise, or invent client results while any blockers remain.** A green Next build demonstrates software regression health, not commercial or legal launch readiness. Mavvix portfolios sell what Mavvix can build; enquiries never impersonate active service providers.
