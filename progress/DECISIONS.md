# Architecture & Engineering Decisions Log

## 1. Engine & Runtime
- **Runtime:** Node.js v24.12.0 LTS with App Router in Next.js 14.2.24.
- **Database Engine:** `node:sqlite` (native synchronous SQLite in Node 24). It requires zero external compilation toolchains (e.g. node-gyp or python on Windows), provides rock-solid performance, supports prepared statements, WAL mode, transactions and foreign key cascades.
- **Database Location:** `./data/mavvix-demo.sqlite` (persisted on disk outside of Next.js static asset tree).
- **Authentication:** Pure JS bcrypt (`bcryptjs`) for password hashing, with encrypted HMAC/SHA-256 session tokens stored in `admin_sessions` table and delivered via secure `HttpOnly`, `SameSite=Lax` cookies.

## 2. Localization & Routing Strategy
- **Routing:** `/[locale]/preview/[vertical]/...` where `locale` is `ar` or `en`.
- **RTL/LTR Handling:** Native `dir="rtl"` with Tailwind RTL-aware utility patterns (`start`, `end`, `ms-`, `me-`) and localized font tokens (`font-arabic` for Arabic, `font-sans` for English).
- **Showcase:** `/[locale]/showcase` displaying only completed, verified demos with honest badges, live links, and direct sales CTAs to Mavvix.
- **Admin Studio:** `/admin` and `/admin/[vertical]/...` for authenticated content editing, section toggles, draft/publish/rollback revisions, and review of simulated submissions.

## 3. Data Integrity & Ethical Demo Scope
- Unobtrusive but persistent "Mavvix Concept Demonstration" notice banner across all preview routes.
- Simulated submissions are stored in SQLite with 7-day retention (`expires_at`), giving guests clear confirmation numbers and simulated receipts without making external API or SMTP calls.
- Strict server-side Zod validation on all inquiry, quote, order, and booking requests.

