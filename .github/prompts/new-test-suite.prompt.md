---
agent: 'agent'
description: 'Generate a Playwright E2E test suite for a feature'
tools: ['editFiles', 'createFile', 'readFile']
---

# Generate Playwright Test Suite

## What I Need
1. Feature name being tested
2. Page/component under test
3. User flows to test

## Test File Template

Create `Webapp/frontend/tests/{feature-name}.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('{Feature Name}', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the relevant page
    await page.goto('/');
    // Login if required
    // await page.getByTestId('login-button-id').click();
  });

  test('should display {feature} list', async ({ page }) => {
    await expect(page.getByTestId('{feature}-list-container-id')).toBeVisible();
  });

  test('should create new {feature}', async ({ page }) => {
    // Arrange
    await page.getByTestId('create-{feature}-button-id').click();
    
    // Act
    await page.getByTestId('{feature}-name-input-id').fill('Test {Feature}');
    await page.getByTestId('{feature}-submit-button-id').click();
    
    // Assert
    await expect(page.getByText('Test {Feature}')).toBeVisible();
  });

  test('should edit existing {feature}', async ({ page }) => {
    // Test edit flow
  });

  test('should delete {feature} after confirmation', async ({ page }) => {
    // Test delete flow with confirmation
  });
});
```

## Test Categories

### Happy Path Tests
- Core user workflows that should always work
- CRUD operations

### Error Handling Tests
- Validation errors
- Network failures
- Empty states

### Edge Cases
- Empty lists
- Maximum length inputs
- Special characters

## Checklist
- [ ] All selectors use `data-testid`
- [ ] No hard-coded `waitForTimeout`
- [ ] Test names describe expected behavior
- [ ] Tests are independent (no shared state)
- [ ] Database state documented
