import fs from 'node:fs';

const content = fs.readFileSync('src/lib/media/sector-images.ts', 'utf8');
const urls = [...content.matchAll(/photo\(['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log(`Found ${urls.length} photo IDs in sector-images.ts`);

async function testAll() {
  const broken = [];
  for (const id of urls) {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.status >= 400) {
        console.log(`BROKEN [${res.status}]: ${id}`);
        broken.push(id);
      } else {
        // ok
      }
    } catch (e) {
      console.log(`FAIL [${e.message}]: ${id}`);
      broken.push(id);
    }
  }
  console.log(`Testing completed. Total broken: ${broken.length} of ${urls.length}`);
}

testAll();

