# Required commands for the generated eight-site application

These commands must be authored and executed by Gemini in the actual code repository, not merely promised by this specification ZIP.

```bash
npm ci                       # after lockfile generated
cp .env.example .env.local   # securely configure admin bootstrap & private SQLite path
npm run db:migrate
npm run db:seed
npm run db:seed              # prove idempotence
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:a11y
```

With SQLite mode, run on a Node server with persistent private disk and use transaction/write tests, not static export. Verify all 8 sites in Arabic and English, screens at 320/390/768/1440, production build and genuine screenshots. Sign off admin edit/publish/rollback and example receipts for all 8. Do not claim tests passed without executing them and writing logs to `progress/QA_LOG.md`.
