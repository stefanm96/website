import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Nav-Links führen zu allen Sektionen', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop-Navigation');
    for (const id of ['profil', 'leistungen', 'projekte', 'werdegang', 'kontakt']) {
      await page.click(`.site-nav a[href="#${id}"]`);
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test('Header erhält Hintergrund beim Scrollen', async ({ page }) => {
    const header = page.locator('.site-header');
    await expect(header).not.toHaveClass(/scrolled/);
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
    await expect(header).toHaveClass(/scrolled/);
  });

  test('Mobile Menü öffnet, navigiert und schließt', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-Navigation');
    const toggle = page.locator('#nav-toggle');
    const nav = page.locator('#site-nav');

    await toggle.click();
    await expect(nav).toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await page.click('.site-nav a[href="#kontakt"]');
    await expect(nav).not.toHaveClass(/open/);
    await expect(page.locator('#kontakt')).toBeInViewport();
  });

  test('Wordmark führt zurück nach oben', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: 2000, behavior: 'instant' }));
    await page.locator('.wordmark').click();
    await expect(page.locator('.hero-title')).toBeInViewport();
  });

  test('Scroll-Reveal blendet Inhalte ein', async ({ page }) => {
    const title = page.locator('#projekte .section-title');
    await title.scrollIntoViewIfNeeded();
    await expect(title).toHaveClass(/visible/);
  });
});
