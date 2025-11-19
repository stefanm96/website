import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.Alpine !== undefined);
  });

  test('desktop navigation links are visible and correct', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop-only test');

    const navLinks = [
      { text: 'Über mich', href: '#about' },
      { text: 'Erfahrung', href: '#resume' },
      { text: 'Kontakt', href: '#contact' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a[href="${link.href}"]`).first();
      await expect(navLink).toBeVisible();
      await expect(navLink).toHaveText(link.text);
    }
  });

  test('desktop navigation links scroll to correct sections', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop-only test');

    const navLinks = [
      { href: '#about', section: '#about' },
      { href: '#resume', section: '#resume' },
      { href: '#contact', section: '#contact' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a[href="${link.href}"]`).first();
      await navLink.click();
      await expect(page.locator(link.section)).toBeInViewport();
    }
  });

  test('logo links to home', async ({ page }) => {
    const logoLink = page.locator('nav a[href="#home"]');
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveText('Stefan Michel');
  });

  test('mobile menu button is visible', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    const menuButton = page.locator('nav button').first();
    await expect(menuButton).toBeVisible();
  });

  test('mobile menu opens and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    const menuButton = page.locator('nav button').first();

    await menuButton.click();

    const mobileLinks = page.locator('nav').locator('a[href="#about"]');
    await expect(mobileLinks.first()).toBeVisible();

    await menuButton.click();
    await page.waitForTimeout(300);
  });

  test('mobile menu links navigate correctly', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    const menuButton = page.locator('nav button').first();
    await menuButton.click();

    const aboutLink = page.locator('nav a[href="#about"]').first();
    await aboutLink.click();

    await expect(page.locator('#about')).toBeInViewport();
  });

  test('back to top button appears on scroll', async ({ page }) => {
    const backToTop = page.locator('a[href="#home"]').last();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    await expect(backToTop).toBeVisible();
  });

  test('back to top button scrolls to top', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    const backToTop = page.locator('a[href="#home"]').last();
    await backToTop.click();

    await page.waitForTimeout(500);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });
});
