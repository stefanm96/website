import { test, expect } from '@playwright/test';

test.describe('Resume Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.Alpine !== undefined);
  });

  test('skills section displays all skills', async ({ page }) => {
    const skillsHeading = page.locator('h2').filter({ hasText: 'Technische Skills & Expertise' });
    await expect(skillsHeading).toBeVisible();

    const expectedSkills = [
      'Java',
      'Spring',
      'Rust',
      'Cloud-Technologien',
      'DevOps',
      'Angular',
      'React',
      'VueJS',
      'Linux',
    ];

    for (const skill of expectedSkills) {
      const skillElement = page.getByText(skill, { exact: true });
      await expect(skillElement.first()).toBeVisible();
    }
  });

  test('work experience section displays companies', async ({ page }) => {
    const workHeading = page.locator('h2').filter({ hasText: 'Berufserfahrung' });
    await expect(workHeading).toBeVisible();

    const otto = page.locator('h3').filter({ hasText: 'OTTO GmbH & Co KG' });
    await expect(otto).toBeVisible();
    const ottoDate = page.getByText('2021 - derzeitig');
    await expect(ottoDate.first()).toBeVisible();

    const lufthansa = page.locator('h3').filter({ hasText: 'Lufthansa Industry Solutions' });
    await expect(lufthansa).toBeVisible();
    const lufthansaDate = page.getByText('2018 - 2021');
    await expect(lufthansaDate).toBeVisible();
  });

  test('projects section displays all projects', async ({ page }) => {
    const projectsHeading = page.locator('h2').filter({ hasText: 'Referenz-Projekte & Erfolgsgeschichten' });
    await expect(projectsHeading).toBeVisible();

    const projects = [
      'Retourenlogistik',
      'Automobil Konzern',
      'Maritime Wirtschaft',
      'Business Services',
    ];

    for (const project of projects) {
      const projectElement = page.locator('h3').filter({ hasText: project });
      await expect(projectElement).toBeVisible();
    }
  });

  test('project details include technologies', async ({ page }) => {
    const projectTechs = ['Java 17', 'Spring', 'AWS', 'Terraform'];
    for (const tech of projectTechs) {
      const techElement = page.getByText(tech, { exact: true });
      await expect(techElement.first()).toBeVisible();
    }
  });

  test('education section displays all entries', async ({ page }) => {
    const educationHeading = page.locator('h2').filter({ hasText: 'Bildung & Zertifizierungen' });
    await expect(educationHeading).toBeVisible();

    const educationEntries = [
      { institution: 'FernUniversität in Hagen', degree: 'Angestrebt M.Sc. Praktische Informatik' },
      { institution: 'Carl-von-Ossietzky Universität Oldenburg', degree: 'Bachelor of Science Wirtschaftsinformatik' },
      { institution: 'Oracle', degree: 'Oracle Certified Professional: Java SE 11 Developer' },
      { institution: 'Udacity', degree: 'Certified Cloud Developer' },
    ];

    for (const entry of educationEntries) {
      const institution = page.locator('h3').filter({ hasText: entry.institution });
      await expect(institution).toBeVisible();

      const degree = page.locator('h4').filter({ hasText: entry.degree });
      await expect(degree).toBeVisible();
    }
  });

  test('certification badges have links', async ({ page }) => {
    const oracleCertLink = page.locator('a[href*="catalog-education.oracle.com"]');
    await expect(oracleCertLink.first()).toBeVisible();

    const udacityCertLink = page.locator('a[href*="confirm.udacity.com"]');
    await expect(udacityCertLink).toBeVisible();
  });

  test('contact section displays correctly', async ({ page }) => {
    const contactHeading = page.locator('h2').filter({ hasText: 'Kontakt' }).last();
    await expect(contactHeading).toBeVisible();

    const contactText = page.getByText(/Bei Anfragen stehe Ich Ihnen gerne/);
    await expect(contactText).toBeVisible();
  });
});
