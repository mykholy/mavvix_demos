import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dbPath = process.env.SQLITE_DB_PATH || path.join(rootDir, 'data', 'mavvix-demo.sqlite');
const dataDir = path.dirname(dbPath);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log(`Running migrations against ${dbPath}...`);
const schemaSql = fs.readFileSync(path.join(rootDir, '05_ENGINEERING', 'sqlite_schema.sql'), 'utf8');

const db = new DatabaseSync(dbPath);
db.exec(schemaSql);
console.log('✅ SQLite Schema migrations applied successfully!');
db.close();

