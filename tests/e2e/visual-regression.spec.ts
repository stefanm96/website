import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.Alpine !== undefined);
    await page.waitForTimeout(1000);
  });

  test('hero section screenshot', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toHaveScreenshot('hero-section.png', {
      maxDiffPixels: 100,
    });
  });

  test('navigation screenshot', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop-only test');

    const nav = page.locator('nav');
    await expect(nav).toHaveScreenshot('navigation.png', {
      maxDiffPixels: 50,
    });
  });

  test('skills section screenshot', async ({ page }) => {
    const skills = page.locator('h2').filter({ hasText: 'Technische Skills & Expertise' }).locator('..');
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toHaveScreenshot('skills-section.png', {
      maxDiffPixels: 100,
    });
  });

  test('footer screenshot', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toHaveScreenshot('footer.png', {
      maxDiffPixels: 50,
    });
  });

  test('mobile menu open screenshot', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    const menuButton = page.locator('nav button').first();
    await menuButton.click();
    await page.waitForTimeout(300);

    const nav = page.locator('nav');
    await expect(nav).toHaveScreenshot('mobile-menu-open.png', {
      maxDiffPixels: 50,
    });
  });

  test('full page screenshot - desktop', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop-only test');

    await expect(page).toHaveScreenshot('full-page-desktop.png', {
      fullPage: true,
      maxDiffPixels: 500,
    });
  });

  test('full page screenshot - mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    await expect(page).toHaveScreenshot('full-page-mobile.png', {
      fullPage: true,
      maxDiffPixels: 500,
    });
  });
});
