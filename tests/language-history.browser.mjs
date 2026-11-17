// Run against a production preview. Playwright/Chromium are external test tooling:
// PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs CHROMIUM_PATH=/path/to/chromium \
// TEST_BASE_URL=http://127.0.0.1:4353 node --test tests/language-history.browser.mjs
import test from 'node:test';
import assert from 'node:assert/strict';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4353';

for (const locale of ['en', 'ja']) {
  for (const cached of [false, true]) {
    test(`${locale}: Back/Forward retain the chosen language (cache ${cached})`, async () => {
      const browser = await chromium.launch({
        executablePath: process.env.CHROMIUM_PATH || undefined,
        args: ['--no-sandbox'],
        ignoreDefaultArgs: cached ? ['--disable-back-forward-cache'] : [],
      });
      try {
        const page = await browser.newPage({ ignoreHTTPSErrors: true });
        const other = locale === 'en' ? 'ja' : 'en';
        await page.addInitScript(() => {
          addEventListener('pageshow', event => {
            if (event.persisted) sessionStorage.setItem('test-bfcache-restored', 'yes');
          });
        });
        await page.goto(`${base}/${locale}/interests/?from=history#top`);
        await page.locator(`nav a[href="/${locale}/"]`).click();
        const length = await page.evaluate(() => history.length);
        await page.locator(`a[hreflang="${other}"]`).click();
        await page.goBack({ waitUntil: 'commit' });
        await page.waitForURL(`**/${other}/interests/?from=history#top`, { waitUntil: 'commit' });
        assert.equal(await page.locator('html').getAttribute('lang'), other);
        assert.equal(await page.evaluate(() => history.length), length);
        if (cached) {
          assert.equal(await page.evaluate(() => sessionStorage.getItem('test-bfcache-restored')), 'yes');
        }
        await page.goForward({ waitUntil: 'commit' });
        await page.waitForURL(`**/${other}/`, { waitUntil: 'commit' });
        // A second choice also applies to the already-translated earlier entry.
        await page.locator(`a[hreflang="${locale}"]`).click();
        await page.goBack({ waitUntil: 'commit' });
        await page.waitForURL(`**/${locale}/interests/?from=history#top`, { waitUntil: 'commit' });
        await page.goForward({ waitUntil: 'commit' });
        await page.waitForURL(`**/${locale}/`, { waitUntil: 'commit' });
        assert.equal(await page.evaluate(() => history.length), length);
        // Visiting an explicit URL remains authoritative, even after a choice.
        await page.goto(`${base}/${other}/projects/dron`);
        assert.equal(await page.locator('html').getAttribute('lang'), other);
      } finally {
        await browser.close();
      }
    });
  }
}
