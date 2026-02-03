---
name: 'Playwright Test Guidelines'
description: 'Conventions for writing E2E tests with Playwright'
applyTo: 'Webapp/frontend/tests/**/*.{ts,spec.ts}'
---

# Playwright Test Guidelines

These rules apply to E2E tests in the frontend/tests directory.

## Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/relevant-path');
  });

  test('should describe expected behavior', async ({ page }) => {
    // Arrange - setup if needed
    
    // Act - perform action
    await page.getByTestId('action-button-id').click();
    
    // Assert - verify result
    await expect(page.getByTestId('result-element-id')).toBeVisible();
  });
});
```

## Selecting Elements

**ALWAYS use `data-testid` attributes:**

```typescript
// ✅ Good: Test ID selector
const button = page.getByTestId('create-project-button-id');
const card = page.getByTestId(`project-card-id-${projectId}`);

// ❌ Bad: CSS selector
const button = page.locator('.btn-primary');

// ❌ Bad: Text selector (brittle with i18n)
const button = page.getByText('Create Project');
```

## Assertions

```typescript
// Visibility
await expect(element).toBeVisible();
await expect(element).not.toBeVisible();

// Content
await expect(page.getByText('Expected text')).toBeVisible();

// URL navigation
await expect(page).toHaveURL('/projects');

// Count
await expect(page.getByTestId(/^project-card-id-/)).toHaveCount(3);
```

## Waiting

Prefer Playwright's auto-wait. When explicit waits are needed:

```typescript
// ✅ Good: Wait for specific element
await page.getByTestId('loading-spinner-id').waitFor({ state: 'hidden' });

// ✅ Good: Wait for network idle after action
await page.getByTestId('submit-button-id').click();
await page.waitForLoadState('networkidle');

// ❌ Bad: Hard-coded delays
await page.waitForTimeout(2000);
```

## Test Naming

Use descriptive test names that explain the scenario:

```typescript
// ✅ Good: Describes behavior
test('should display error when project name is empty', async ({ page }) => {});
test('should navigate to project detail when clicking view button', async ({ page }) => {});

// ❌ Bad: Vague
test('test project', async ({ page }) => {});
test('it works', async ({ page }) => {});
```

## Database State

**CRITICAL: Tests require clean database state**

Before running tests:
```cmd
npm run db:switch-to-clean
```

After tests complete:
```cmd
npm run db:restore-dev
```

## Common Patterns

### Form Submission
```typescript
test('should create a new project', async ({ page }) => {
  // Open dialog
  await page.getByTestId('create-project-button-id').click();
  
  // Fill form
  await page.getByTestId('project-name-input-id').fill('New Project');
  await page.getByTestId('project-description-input-id').fill('Description');
  
  // Submit
  await page.getByTestId('project-create-submit-button-id').click();
  
  // Verify creation
  await expect(page.getByText('New Project')).toBeVisible();
});
```

### Delete Confirmation
```typescript
test('should delete project after confirmation', async ({ page }) => {
  await page.getByTestId('project-delete-button-id-123').click();
  await page.getByTestId('delete-confirm-button-id').click();
  await expect(page.getByTestId('project-card-id-123')).not.toBeVisible();
});
```
