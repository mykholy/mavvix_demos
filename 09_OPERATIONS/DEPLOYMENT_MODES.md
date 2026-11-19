# Deploy the full working demo package correctly

## Full working mode — REQUIRED FOR V2 COMPLETION
Node.js App Router server with persistent mounted private SQLite volume. `SQLITE_DB_PATH` points to persisted location (not project public folder, not ephemeral function disk). CI runs migrations, seed idempotence and integration checks; startup scripts fail loudly. Configure Mavvix sales URL and secure admin bootstrap env locally only. Backups and migration rollback documented. Do not ship production .env in ZIP or commit.

## Restricted/static preview — separate downgrade only
Static marketing screenshots and pre-rendered pages may be hosted cheaply without backend, but no persistence/transaction/admin is operational; this does NOT satisfy full eight-demo spec. Must be labelled **read-only preview**. Do not claim stored requests when only localStorage. Do not set `output: export` in the full mode while still defining SQLite-backed route handlers.

## Public visitor protection
Rate limiting, no real contact collection by demo pages, sample identities, explicit simulation receipts, no actual emails/WhatsApp/Meta/payments/health records; retention TTL 7 days. Authentication protects operator pages.
