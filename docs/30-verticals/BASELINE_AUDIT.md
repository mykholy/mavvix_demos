# Gate 0 — verified source audit (2026-11-23)

## Identity and version lock
- Repository: `mykholy/mavvix_demos` (private); current default `main`, HEAD at branch creation `1ae79d8c29861c28a3f5ad450c2712a99e4a8361`.
- Previous #1 was **merged**; there were **zero open PRs** in the checked GitHub listing. New work on `feat/mavvix-30-verticals`.
- Last observed complete green CI was run [44891927404](https://github.com/mykholy/mavvix_demos/actions/runs/44891927404) on the previous feature commit `a95b5be730502f273f183915171f9b3740e13b62`; **not** proof that the current branch is green until separately tested.
- `package.json`: Next 14.2.24, React 18.3, TypeScript 5.7, Tailwind 3, Node 22 `node:sqlite`. As of Nov 2026 Next 14 is unsupported. Nov security release patched 15.5.29 / 16.4.5, according to https://www.netlify.com/changelog/2026-11-03-nextjs-security-vulnerabilities/ ; upgrade required with a fresh lockfile and complete regression. Node 22 SQLite is still experimental: https://nodejs.org/download/release/v22.23.0/docs/api/sqlite.html .
- `next.config.mjs`: unoptimized images, `experimental.serverComponentsExternalPackages=['node:sqlite']`; migrations use plain SQL replay rather than sequenced versioned migrations.

## Baseline routes / content / UI
- Exactly 8 existing route families: construction, industrial, real-estate, dental, ecommerce, portfolio, restaurant, academy. Existing storefront/gallery page is `src/app/[locale]/showcase/page.tsx` and contains a hardcoded 8-element array.
- `ContactDock.tsx` contains an independently hardcoded eight-sector list; `mavvix-contact.ts` limits SectorName to eight; all must be expanded without breaking old nested layouts. The floating hub links to `/admin/login` in a public display; review before exposure.
- `src/lib/db/repositories.ts` is ~60 KB, `scripts/seed.mjs` ~93 KB. Coupling and repeated SQL make a 22-fold extension risky.
- Gallery photography currently references remote Unsplash URLs via `src/lib/media/sector-images.ts`; no signed license/URL-responsiveness verification or original-size local asset provenance was available from the GitHub source audit. Existing source comments describing them as verified are **not** proof.
- Layouts use Arabic/English segments with root `lang=ar dir=rtl`; nested `[locale]/layout.tsx` changes direction in a div. Need browser RTL, keyboard, responsive and cookie/sticky CTA screenshots. No such screenshots were verified this gate.
- Existing eight descriptions are illustrative businesses, not independently verified operating clients. Never represent them as such.

## Data / workflow / admin blockers
- `demo_sites.slug` has a SQL CHECK limited to exactly eight slugs.
- `demo_submissions.flow_type` also has a CHECK of nine existing flow types; `src/app/api/demo/[vertical]/route.ts` maps exactly eight sectors and one extra restaurant variant.
- Replaying `CREATE TABLE IF NOT EXISTS` cannot update constraints on a populated SQLite database. **Do not change source checks and pretend existing installations migrate**. Implement additive versioned sector registry/request tables and preserve old records; guard cross-sector flow IDs.
- Authenticated admin exists (`mavvix_admin_session`, owner/editor/viewer roles), but dashboard and sector tables presently hardcode eight sites. New industry requests must be readable by authorized staff; viewer must be read-only.
- Request rate limit uses an in-process Map and forwarded client-IP headers; deployment requires trusted reverse-proxy setup and distributed/edge limits. The source has protected ecommerce prices and receipts; don't regress them.
- Source differentiates illustrative requests from actual Mavvix sales enquiries insufficiently for a 30-sector campaign. Add explicit source/UTM consent and request-type metadata and no auto-dispatch to fictitious businesses.
- Historical Git-committed secrets were previously reported; verify/rotate and coordinate history purge before publishing, no secret copying into this branch.

## Existing baseline tests (historical evidence; rerun required)
- Prior CI: 42/42 unit tests, 147 static pages in production build, 180 AR/EN route checks, 8/8 industry persisted request examples; automated checks are **not** visual/client-quality proof.
- `tests/unit` covers eight legacy sectors, no installed Playwright browser test suite was discovered in repo tree; `package.json` contains `test:e2e` script but no `playwright` dependency. Need actual browser setup before claiming screenshots.
- No download of the private repo was possible in execution container (DNS to github.com unavailable); source reviewed through authenticated GitHub connector. CI can execute remote build/tests.

## Gate 0 decision
1. Preserve eight existing applications, schemas, and receipt rules.
2. Add new `portfolio_verticals`, `portfolio_services`, `portfolio_requests` tables through additive migrations to avoid breaking legacy CHECK constraints. Later unify via a repository adapter.
3. Create typed 30-sector registry with state `existing / in_progress / planned`. **Never show planned sites as completed**.
4. First full vertical is `auto-service`. Add deeply written AR/EN content, bespoke art direction and one persisted, validated request from the client to protected admin.
5. Block merge/deploy/ads until patched Next.js, verified media rights, real browser/a11y/RTL QA, security and test evidence.
