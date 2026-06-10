// Interaktionstest: Mobile-Menü, Header-Scroll, Konsole
import { chromium } from '@playwright/test';

const url = process.env.SHOT_URL || 'http://localhost:3000';
const out = '/tmp/site-shots';
const browser = await chromium.launch();

const errors = [];
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', err => errors.push(String(err)));

await page.goto(url, { waitUntil: 'networkidle' });
await page.click('#nav-toggle');
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}/m-nav-open.png` });
await page.click('.site-nav a[href="#projekte"]');
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/m-after-nav.png` });
await page.close();

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
desktop.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
});
await desktop.goto(url, { waitUntil: 'networkidle' });
await desktop.mouse.wheel(0, 1200);
await desktop.waitForTimeout(800);
await desktop.screenshot({ path: `${out}/d-scrolled-header.png` });
await desktop.hover('.project:first-child');
await desktop.waitForTimeout(300);
await desktop.close();

await browser.close();
console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.join('\n') : 'no console errors');
