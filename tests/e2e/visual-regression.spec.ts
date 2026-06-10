import { expect, test } from '@playwright/test';

// Animationen deaktivieren, damit Screenshots deterministisch sind
async function prepare(page: import('@playwright/test').Page, path = '/') {
  await page.goto(path, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      .reveal { opacity: 1 !important; transform: none !important; }
      .grain { display: none !important; }
    `,
  });
  await page.waitForTimeout(300);
}

test.describe('Visuelle Regression', () => {
  test.skip(
    ({ browserName, isMobile }) => browserName !== 'chromium' || isMobile,
    'Baselines werden nur für Desktop-Chromium gepflegt'
  );

  test('Hero', async ({ page }) => {
    await prepare(page);
    await expect(page).toHaveScreenshot('hero.png', { maxDiffPixelRatio: 0.02 });
  });

  test('Projekte', async ({ page }) => {
    await prepare(page);
    await page.locator('#projekte').scrollIntoViewIfNeeded();
    await expect(page.locator('#projekte')).toHaveScreenshot('projekte.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('Kontakt', async ({ page }) => {
    await prepare(page);
    await page.locator('#kontakt').scrollIntoViewIfNeeded();
    await expect(page.locator('#kontakt')).toHaveScreenshot('kontakt.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});
