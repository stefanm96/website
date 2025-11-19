import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.Alpine !== undefined);
  });

  test('desktop layout shows horizontal navigation', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop-only test');

    const navLinks = page.locator('nav ul li');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      await expect(navLinks.nth(i)).toBeVisible();
    }
  });

  test('mobile layout shows hamburger menu', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    const menuButton = page.locator('nav button').first();
    await expect(menuButton).toBeVisible();

    const desktopNav = page.locator('nav ul');
    await expect(desktopNav).toBeHidden();
  });

  test('profile image is responsive', async ({ page }) => {
    const profileImage = page.locator('img[alt*="Stefan Michel"], img[alt*="Profile"]').first();
    await expect(profileImage).toBeVisible();

    const box = await profileImage.boundingBox();
    const viewportSize = page.viewportSize();

    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(viewportSize!.width);
  });

  test('skill tags wrap correctly on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    const skillsSection = page.locator('h2').filter({ hasText: 'Technische Skills' }).locator('..');
    await skillsSection.scrollIntoViewIfNeeded();

    const box = await skillsSection.boundingBox();
    const viewportSize = page.viewportSize();

    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(viewportSize!.width);
  });

  test('footer social icons are visible', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    const socialLinks = footer.locator('a[href*="mailto"], a[href*="linkedin"], a[href*="github"]');
    const count = await socialLinks.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      await expect(socialLinks.nth(i)).toBeVisible();
    }
  });

  test('content does not overflow viewport', async ({ page }) => {
    const body = page.locator('body');
    const bodyBox = await body.boundingBox();
    const viewportSize = page.viewportSize();

    expect(bodyBox).not.toBeNull();
    expect(viewportSize).not.toBeNull();
  });

  test('headings are readable size', async ({ page }) => {
    const h1 = page.locator('h1');
    const h1Box = await h1.boundingBox();

    expect(h1Box).not.toBeNull();
    expect(h1Box!.height).toBeGreaterThan(20);
  });

  test('back to top button is positioned correctly', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    const backToTop = page.locator('a[href="#home"]').last();
    await expect(backToTop).toBeVisible();

    const box = await backToTop.boundingBox();
    const viewportSize = page.viewportSize();

    expect(box).not.toBeNull();
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewportSize!.width);
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewportSize!.height + 1000);
  });

  test('technology tags display properly', async ({ page }) => {
    const techs = page.getByText('Java 17', { exact: true });
    await techs.first().scrollIntoViewIfNeeded();

    const box = await techs.first().boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(0);
    expect(box!.height).toBeGreaterThan(0);
  });
});
