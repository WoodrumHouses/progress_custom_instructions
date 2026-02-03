import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display dashboard container', async ({ page }) => {
    const container = page.getByTestId('dashboard-container-id');
    await expect(container).toBeVisible();
  });

  test('should display project stats card', async ({ page }) => {
    const statsCard = page.getByTestId('stat-projects-card-id');
    await expect(statsCard).toBeVisible();
  });

  test('should display assets stats card', async ({ page }) => {
    const statsCard = page.getByTestId('stat-assets-card-id');
    await expect(statsCard).toBeVisible();
  });

  test('should navigate to projects when clicking sidebar link', async ({ page }) => {
    const projectsLink = page.getByTestId('nav-projects-link-id');
    await projectsLink.click();

    await expect(page).toHaveURL('/projects');
  });
});
