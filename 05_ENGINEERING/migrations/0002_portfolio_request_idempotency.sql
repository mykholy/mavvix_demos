-- Re-runnable through migration ledger only; stable idempotency keys for service requests.
ALTER TABLE portfolio_requests ADD COLUMN client_request_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_portfolio_request_idempotency ON portfolio_requests(vertical_slug,client_request_id) WHERE client_request_id IS NOT NULL;
