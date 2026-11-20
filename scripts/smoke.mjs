import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const port = 31465;
const base = 'http://127.0.0.1:' + port;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port), '-H', '127.0.0.1'], {
  env: { ...process.env, NODE_ENV: 'production', PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let output = '';
server.stdout.on('data', chunk => output += chunk.toString());
server.stderr.on('data', chunk => output += chunk.toString());
const get = (path, options = {}) => fetch(base + path, options);
const post = (path, body) => get(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

try {
  let ready = false;
  for (let i = 0; i < 90; i++) {
    if (server.exitCode !== null) break;
    try {
      const response = await get('/ar/showcase');
      if (response.ok) { ready = true; break; }
    } catch { }
    await sleep(500);
  }
  assert.ok(ready, 'Production server failed to start: ' + output.slice(-2000));

  for (const locale of ['ar', 'en']) {
    for (const path of ['showcase', 'preview/construction', 'preview/industrial', 'preview/real-estate',
      'preview/dental', 'preview/ecommerce', 'preview/portfolio', 'preview/restaurant', 'preview/academy']) {
      const response = await get('/' + locale + '/' + path);
      assert.equal(response.status, 200, locale + '/' + path + ' rendered with status ' + response.status);
    }
  }
  console.log('PASS: 18 localized public pages return 200');

  const admin = await get('/api/admin/submissions/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(admin.status, 401, 'Admin mutation requires authenticated session');
  const emptyOrder = await post('/api/demo/ecommerce', { flowType: 'ecommerce_order', payload: { shippingZone: 'Cairo' }, lines: [] });
  assert.equal(emptyOrder.status, 422, 'Empty ecommerce order must be rejected');
  const wrongSector = await post('/api/demo/construction', { flowType: 'ecommerce_order', payload: { shippingZone: 'Cairo' }, lines: [] });
  assert.equal(wrongSector.status, 400, 'Cross-sector flow cannot be submitted');

  const quiz = await post('/api/demo/academy/progress', {
    guestToken: 'integration-test-guest-token-2026', itemType: 'quiz', itemId: 'lesson-01-01', status: 'completed', score: 75,
  });
  const qbody = await quiz.json();
  assert.equal(quiz.status, 200, 'Academy progress: ' + JSON.stringify(qbody));
  assert.equal(qbody.success, true);
  const saved = await get('/api/demo/academy/progress?guestToken=integration-test-guest-token-2026');
  const progress = await saved.json();
  assert.equal(saved.status, 200);
  assert.ok(progress.progress.some(r => r.item_type === 'quiz' && r.item_id === 'lesson-01-01' && r.score === 75));

  const order = await post('/api/demo/ecommerce', {
    flowType: 'ecommerce_order',
    payload: { shippingZone: 'Cairo', recipientName: 'QA Only', recipientPhone: '00000000000', streetAddress: 'QA fictional address' },
    lines: [{ source_type: 'product_variant', source_id: 'sku-01', variant_id: 'sku-01-v1', quantity: 1, unit_price_cents: 1 }],
  });
  const receipt = await order.json();
  assert.equal(order.status, 200, 'Trusted ecommerce checkout: ' + JSON.stringify(receipt));
  assert.ok(receipt.order.subtotalCents > 1, 'Client-supplied 1-cent price must be ignored');
  assert.equal(receipt.receiptToken.length, 64);
  const unauthorizedReceipt = await get('/ar/preview/ecommerce/orders/' + receipt.submissionId);
  assert.equal(unauthorizedReceipt.status, 404, 'Order receipt without access token must be private');
  const permittedReceipt = await get('/ar/preview/ecommerce/orders/' + receipt.submissionId + '?access=' + encodeURIComponent(receipt.receiptToken));
  assert.equal(permittedReceipt.status, 200, 'Order receipt with access token must be readable');

  console.log('PASS: auth guard, flow validation, Academy SQLite progress, trusted ecommerce price, private receipt');
} catch (error) {
  console.error(error);
  console.error('Server tail:', output.slice(-5000));
  process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
  await sleep(500);
}
