import { test, expect } from '@playwright/test';

test.describe('Project List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should display project list container', async ({ page }) => {
    const container = page.getByTestId('project-list-container-id');
    await expect(container).toBeVisible();
  });

  test('should display create project button', async ({ page }) => {
    const createButton = page.getByTestId('create-project-button-id');
    await expect(createButton).toBeVisible();
  });

  test('should open create project dialog when clicking create button', async ({ page }) => {
    const createButton = page.getByTestId('create-project-button-id');
    await createButton.click();

    const dialog = page.getByTestId('create-project-dialog-id');
    await expect(dialog).toBeVisible();
  });

  test('should create a new project', async ({ page }) => {
    // Open dialog
    await page.getByTestId('create-project-button-id').click();

    // Fill form
    await page.getByTestId('project-name-input-id').fill('Test Project');
    await page.getByTestId('project-description-input-id').fill('Test Description');

    // Submit
    await page.getByTestId('project-create-submit-button-id').click();

    // Verify project appears in list
    await expect(page.getByText('Test Project')).toBeVisible();
  });
});
