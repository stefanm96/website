import { test, expect } from '@playwright/test';

test.describe('Data Loading', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Stefan Michel/);
  });

  test('hero section displays correct profile information', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Stefan Michel');

    const title = page.getByText('Freelance IT Consultant & Full-Stack Software Developer');
    await expect(title).toBeVisible();

    const tagline = page.getByText('Ihr Partner in der Digitalisierung.');
    await expect(tagline).toBeVisible();
  });

  test('profile image loads correctly', async ({ page }) => {
    const profileImage = page.locator('img[alt*="Stefan Michel"], img[alt*="Profile"]');
    await expect(profileImage.first()).toBeVisible();
  });

  test('about section displays correctly', async ({ page }) => {
    const aboutHeading = page.locator('h2').filter({ hasText: 'Über mich' });
    await expect(aboutHeading).toBeVisible();

    const aboutText = page.getByText(/Seit 2018 unterstütze ich als IT-Berater/);
    await expect(aboutText).toBeVisible();
  });

  test('contact information displays correctly', async ({ page }) => {
    const contactHeading = page.locator('h3').filter({ hasText: 'Kontaktdaten' });
    await expect(contactHeading).toBeVisible();

    const name = page.locator('p').filter({ hasText: 'Stefan Michel' }).first();
    await expect(name).toBeVisible();

    const phone = page.getByText('+49 1517 4338957');
    await expect(phone).toBeVisible();

    const email = page.getByText('info@stefan-michel.com');
    await expect(email).toBeVisible();
  });

  test('Oracle certification badge is visible', async ({ page }) => {
    const oracleBadge = page.locator('img[alt*="Oracle Java SE 11 Developer"]');
    await expect(oracleBadge.first()).toBeVisible();
  });

  test('resume download link is present', async ({ page }) => {
    const downloadLink = page.getByRole('link', { name: /Resumé herunterladen/ });
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute('href', /drive\.google\.com/);
  });

  test('social links in footer are present', async ({ page }) => {
    const footer = page.locator('footer');

    const emailLink = footer.locator('a[href="mailto:info@stefan-michel.com"]');
    await expect(emailLink).toBeVisible();

    const linkedinLink = footer.locator('a[href*="linkedin.com/in/stefan-michel-smi"]');
    await expect(linkedinLink).toBeVisible();

    const githubLink = footer.locator('a[href*="github.com/smi-consulting"]');
    await expect(githubLink).toBeVisible();
  });

  test('copyright notice displays current year', async ({ page }) => {
    const year = new Date().getFullYear();
    const copyright = page.getByText(new RegExp(`© Copyright ${year} Stefan Michel`));
    await expect(copyright).toBeVisible();
  });

  test('imprint page loads correctly', async ({ page }) => {
    await page.goto('/imprint.html');
    await expect(page.locator('body')).toBeVisible();
  });

  test('all main sections are present', async ({ page }) => {
    const sections = ['#about', '#resume', '#contact'];

    for (const section of sections) {
      await expect(page.locator(section)).toBeVisible();
    }
  });
});
