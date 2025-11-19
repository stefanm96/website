import { test, expect } from '@playwright/test';

test.describe('External Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.Alpine !== undefined);
  });

  test('Oracle certification badge links to valid URL', async ({ page }) => {
    const oracleLinks = page.locator('a[href*="catalog-education.oracle.com"]');
    const count = await oracleLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const href = await oracleLinks.first().getAttribute('href');
    expect(href).toContain('sharebadge');
  });

  test('Udacity certification links to valid URL', async ({ page }) => {
    const udacityLink = page.locator('a[href*="confirm.udacity.com"]');
    await expect(udacityLink).toBeVisible();

    const href = await udacityLink.getAttribute('href');
    expect(href).toContain('UKVDSPCQ');
  });

  test('resume download link points to Google Drive', async ({ page }) => {
    const resumeLink = page.getByRole('link', { name: /Resumé herunterladen/ });
    await expect(resumeLink).toBeVisible();

    const href = await resumeLink.getAttribute('href');
    expect(href).toMatch(/drive\.google\.com/);
  });

  test('email link has correct mailto address', async ({ page }) => {
    const emailLinks = page.locator('a[href^="mailto:"]');
    const count = await emailLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const href = await emailLinks.first().getAttribute('href');
    expect(href).toBe('mailto:info@stefan-michel.com');
  });

  test('LinkedIn link points to correct profile', async ({ page }) => {
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink.first()).toBeVisible();

    const href = await linkedinLink.first().getAttribute('href');
    expect(href).toContain('stefan-michel-smi');
  });

  test('GitHub link points to correct profile', async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink.first()).toBeVisible();

    const href = await githubLink.first().getAttribute('href');
    expect(href).toContain('smi-consulting');
  });

  test('imprint link navigates to imprint page', async ({ page }) => {
    const imprintLink = page.locator('a[href="/imprint.html"]');
    await expect(imprintLink).toBeVisible();

    await imprintLink.click();
    await expect(page).toHaveURL(/imprint/);
  });

  test('logo link navigates to home section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));

    const logoLink = page.locator('nav a[href="#home"]');
    await logoLink.click();

    await page.waitForTimeout(500);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('all external links have target or proper href', async ({ page }) => {
    const externalLinks = page.locator('a[href^="http"]');
    const count = await externalLinks.count();

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });

  test('internal navigation links have correct hrefs', async ({ page }) => {
    const internalLinks = [
      { selector: 'a[href="#about"]', expected: '#about' },
      { selector: 'a[href="#resume"]', expected: '#resume' },
      { selector: 'a[href="#contact"]', expected: '#contact' },
      { selector: 'a[href="#home"]', expected: '#home' },
    ];

    for (const link of internalLinks) {
      const element = page.locator(link.selector).first();
      await expect(element).toBeVisible();
      await expect(element).toHaveAttribute('href', link.expected);
    }
  });
});
