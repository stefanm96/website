// Schnelle Screenshot-Hilfe für Design-Iterationen
import { chromium } from '@playwright/test';

const url = process.env.SHOT_URL || 'http://localhost:3000';
const out = process.env.SHOT_DIR || '/tmp/site-shots';

const browser = await chromium.launch();

for (const [name, width, height] of [
    ['desktop', 1440, 900],
    ['mobile', 390, 844],
]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(url, { waitUntil: 'networkidle' });
    // Reveal-Animationen für den Full-Page-Shot deaktivieren
    await page.addStyleTag({ content: '.reveal{opacity:1 !important;transform:none !important}' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
    await page.screenshot({ path: `${out}/${name}-hero.png` });
    await page.close();
}

await browser.close();
console.log('done:', out);
