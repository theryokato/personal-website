// Run after `npm run build`, with `npm run preview -- --host 127.0.0.1 --port 4335` running.
// TEST_BASE_URL can point at a deployed preview instead.
import test from 'node:test';
import assert from 'node:assert/strict';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4335';

for (const [path, lang] of [
  ['/en/missing-page-check', 'en'],
  ['/ja/missing-page-check', 'ja'],
  ['/ja/projects/missing-project/?from=test', 'ja'],
  ['/en/interests/missing-page/', 'en'],
  ['/missing-page-check', 'en'],
]) {
  test(`missing ${path} serves a localized 404 without redirecting`, async () => {
    const response = await fetch(new URL(path, base), { redirect: 'manual' });
    assert.equal(response.status, 404);
    assert.equal(response.headers.get('location'), null);
    assert.match(response.headers.get('content-type') || '', /text\/html/);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`));
    assert.match(html, new RegExp(`href="/${lang}/"`));
    assert.match(html, lang === 'ja' ? /お探しのページが見つかりませんでした/ : /the page you’re looking for could not be found/);
    assert.doesNotMatch(html, /window\.location\.href|cat must have eaten|猫に食べられ/);
  });
}

for (const path of ['/en/', '/ja/', '/en/projects/dron', '/ja/projects/dron']) {
  test(`existing ${path} remains available`, async () => {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200);
    assert.match(await response.text(), /<main(?:\s|>)/);
  });
}

test('Japanese project index is directly accessible', async () => {
  const response = await fetch(new URL('/ja/projects/', base));
  assert.equal(response.status, 200);
  assert.match(await response.text(), /プロジェクト一覧/);
});

for (const lang of ['en', 'ja']) {
  test(`HEAD /${lang}/missing-page-check retains 404 headers without a body`, async () => {
    const response = await fetch(new URL(`/${lang}/missing-page-check`, base), { method: 'HEAD', redirect: 'manual' });
    assert.equal(response.status, 404);
    assert.match(response.headers.get('content-type') || '', /text\/html/);
    assert.equal(await response.text(), '');
  });
}
