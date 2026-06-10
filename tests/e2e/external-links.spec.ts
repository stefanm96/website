import { expect, test } from '@playwright/test';

test.describe('Externe Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Kontakt-Links zeigen auf die richtigen Ziele', async ({ page }) => {
    await expect(page.locator('.contact-links a[href*="linkedin"]')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/stefan-michel-smi'
    );
    await expect(page.locator('.contact-links a[href*="github"]')).toHaveAttribute(
      'href',
      'https://github.com/smi-consulting'
    );
    await expect(page.locator('.contact-links a[href^="tel:"]')).toHaveAttribute(
      'href',
      'tel:+4915174338957'
    );
  });

  test('Zertifikatslinks zeigen auf Oracle und Udacity', async ({ page }) => {
    await expect(page.locator('#werdegang a[href*="oracle"]')).toHaveAttribute(
      'href',
      /catalog-education\.oracle\.com/
    );
    await expect(page.locator('#werdegang a[href*="udacity"]')).toHaveAttribute(
      'href',
      'https://confirm.udacity.com/UKVDSPCQ'
    );
  });

  test('Externe Links öffnen in neuem Tab mit rel=noopener', async ({ page }) => {
    const externalLinks = page.locator('a[href^="http"]:not([href*="stefan-michel.com"])');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });
});
