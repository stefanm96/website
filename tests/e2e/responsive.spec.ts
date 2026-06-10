import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'Mobil', width: 390, height: 844 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 },
];

for (const viewport of viewports) {
  test.describe(`Responsive — ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test('kein horizontales Scrollen', async ({ page }) => {
      await page.goto('/');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test('alle Sektionen sind sichtbar', async ({ page }) => {
      await page.goto('/');
      for (const id of ['profil', 'leistungen', 'projekte', 'werdegang', 'kontakt']) {
        const section = page.locator(`#${id}`);
        await section.scrollIntoViewIfNeeded();
        await expect(section).toBeVisible();
      }
    });
  });
}

test.describe('Responsive — Navigation', () => {
  test('Hamburger nur auf Mobil sichtbar', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('#nav-toggle')).toBeHidden();

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('#nav-toggle')).toBeVisible();
  });
});
