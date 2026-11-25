import fs from 'node:fs';
import path from 'node:path';

/** Re-entrant versioned additive migrations, preserving old site records. */
export function applyPortfolioMigrations(db, rootDir = process.cwd()) {
  db.exec("CREATE TABLE IF NOT EXISTS portfolio_schema_migrations (filename TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)");
  const folder = path.join(rootDir,'05_ENGINEERING','migrations');
  if (!fs.existsSync(folder)) return [];
  const applied = [];
  for (const filename of fs.readdirSync(folder).filter(x=>/^\d+_[a-z0-9_-]+\.sql$/.test(x)).sort()) {
    const done = db.prepare("SELECT filename FROM portfolio_schema_migrations WHERE filename = ?").get(filename);
    if (done) continue;
    const sql=fs.readFileSync(path.join(folder,filename),'utf8');
    db.exec('BEGIN IMMEDIATE');
    try {
      db.exec(sql);
      db.prepare("INSERT INTO portfolio_schema_migrations (filename) VALUES (?)").run(filename);
      db.exec('COMMIT');
      applied.push(filename);
    } catch(error) {
      db.exec('ROLLBACK');
      throw new Error('Portfolio migration failed: '+filename,{cause:error});
    }
  }
  return applied;
}
