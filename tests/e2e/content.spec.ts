import { expect, test } from '@playwright/test';

test.describe('Inhalte', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Seite hat korrekten Titel und Meta-Description', async ({ page }) => {
    await expect(page).toHaveTitle(/Stefan Michel/);
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /Java, Spring, Cloud/);
  });

  test('Hero zeigt Headline, Verfügbarkeit und CTAs', async ({ page }) => {
    await expect(page.locator('.hero-title')).toContainText('Systeme, die in');
    await expect(page.locator('.availability')).toContainText('Verfügbar');
    await expect(page.locator('.hero-actions .btn-primary')).toContainText('Projekt anfragen');
  });

  test('Profil zeigt Foto und Bio', async ({ page }) => {
    const photo = page.locator('.profil-photo img');
    await expect(photo).toHaveAttribute('src', 'images/profilepic.png');
    await expect(page.locator('#profil')).toContainText('Seit 2018');
  });

  test('Leistungen zeigen drei Disziplinen', async ({ page }) => {
    const cards = page.locator('.service-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('Software-Architektur');
    await expect(cards.nth(1)).toContainText('Backend-Entwicklung');
    await expect(cards.nth(2)).toContainText('Cloud & DevOps');
  });

  test('Projekte zeigen alle vier Fallstudien', async ({ page }) => {
    const projects = page.locator('.project');
    await expect(projects).toHaveCount(4);
    await expect(projects.nth(0)).toContainText('Retourenlogistik');
    await expect(projects.nth(1)).toContainText('WLTP');
    await expect(projects.nth(2)).toContainText('Logbuch');
    await expect(projects.nth(3)).toContainText('Poststelle');
  });

  test('Werdegang zeigt Stationen und Zertifikate', async ({ page }) => {
    const werdegang = page.locator('#werdegang');
    await expect(werdegang).toContainText('OTTO GmbH & Co KG');
    await expect(werdegang).toContainText('Lufthansa Industry Solutions');
    await expect(werdegang).toContainText('Oracle Certified Professional');
    await expect(werdegang).toContainText('B.Sc. Wirtschaftsinformatik');
  });

  test('Kontakt zeigt E-Mail und Standort', async ({ page }) => {
    const kontakt = page.locator('#kontakt');
    await expect(kontakt.locator('.contact-email')).toHaveAttribute(
      'href',
      'mailto:info@stefan-michel.com'
    );
    await expect(kontakt).toContainText('Lohne');
  });

  test('Footer zeigt aktuelles Jahr und Impressum-Link', async ({ page }) => {
    const year = String(new Date().getFullYear());
    await expect(page.locator('.site-footer')).toContainText(year);
    await expect(page.locator('.site-footer a[href="imprint.html"]')).toBeVisible();
  });
});

test.describe('Impressum', () => {
  test('Impressum ist erreichbar und vollständig', async ({ page }) => {
    await page.goto('/imprint.html');
    await expect(page).toHaveTitle(/Impressum/);
    await expect(page.locator('h1')).toContainText('Impressum');
    await expect(page.locator('.legal-body')).toContainText('Mülhausener Straße 44');
    await expect(page.locator('.legal-body')).toContainText('49393 Lohne');
  });
});
