# Mavvix Security, Content Provenance & Deployment
## Mandatory operations before public launch
1. The original repository tracked an environment file containing admin bootstrap credentials and a secret; treat both as compromised. Rotate credentials immediately. Removing files in a new commit does not erase Git history: coordinate a history rewrite separately before sharing repository access.
2. Keep the SQLite database on a writable persistent private volume, not inside Git or a serverless ephemeral file system. Run migrations and seed in deployment.
3. Supply strong initial credentials using host secret manager. Never republish or reuse the demo bootstrap login.
4. Set HTTPS, hardened reverse-proxy request limits, backups, and background deletion of expired submissions.
5. Update the unsupported Next.js 14 release to a maintained, patched major version in a tested migration; never claim production-safe until the dependency gate passes.
6. The eight vertical brands and their catalogue descriptions are fictional design concepts, not verified operating companies or Mavvix client references. Stock photos must never be presented as photos of those fictional businesses.
7. Reject real payment details or medical records in any public form. Keep transaction previews clearly described as unfulfilled estimates, and direct real sales enquiries to Mavvix.
