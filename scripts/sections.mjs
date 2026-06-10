// Sektion-Screenshots für Design-Review
import { chromium } from '@playwright/test';

const url = process.env.SHOT_URL || 'http://localhost:3000';
const out = '/tmp/site-shots';
const viewport = process.env.SHOT_MOBILE
    ? { width: 390, height: 844 }
    : { width: 1440, height: 900 };
const prefix = process.env.SHOT_MOBILE ? 'm-' : '';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport });
await page.goto(url, { waitUntil: 'networkidle' });
await page.addStyleTag({ content: '.reveal{opacity:1 !important;transform:none !important}' });
await page.waitForTimeout(400);

for (const id of ['profil', 'leistungen', 'projekte', 'werdegang', 'kontakt']) {
    await page.locator('#' + id).screenshot({ path: `${out}/${prefix}${id}.png` });
}

await browser.close();
console.log('done');
