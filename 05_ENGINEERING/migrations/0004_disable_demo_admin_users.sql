-- Remove login capability for legacy example users on already-seeded installs.
-- This does not delete real owner/operator accounts with distinct verified emails.
DELETE FROM admin_sessions WHERE admin_id IN (
 SELECT id FROM admin_users WHERE email IN ('admin@mavvix.demo','operator@mavvix.local')
);
UPDATE admin_users SET active=0 WHERE email IN ('admin@mavvix.demo','operator@mavvix.local');
