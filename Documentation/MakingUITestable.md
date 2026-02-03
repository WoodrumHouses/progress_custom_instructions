# Making UI Testable

This guide covers best practices for making UI components testable with Playwright.

## Test ID Conventions

### Format
- Fixed elements: `{component}-{element}-{type}-id`
- List items: `{component}-{element}-id-{itemId}`

### Examples

```tsx
// Fixed elements
data-testid="project-list-container-id"
data-testid="create-project-button-id"
data-testid="project-name-input-id"

// List items with dynamic IDs
data-testid={`project-card-id-${project.id}`}
data-testid={`project-delete-button-id-${project.id}`}
```

## What to Add Test IDs To

### ✅ DO add `data-testid` to:

1. **Buttons that trigger actions**
   ```tsx
   <Button data-testid="save-button-id">Save</Button>
   ```

2. **Form inputs**
   ```tsx
   <Input data-testid="email-input-id" />
   ```

3. **Navigation elements**
   ```tsx
   <NavLink data-testid="nav-dashboard-link-id">Dashboard</NavLink>
   ```

4. **Dialogs and modals**
   ```tsx
   <Dialog data-testid="confirm-dialog-id">
   ```

5. **List items with unique identifiers**
   ```tsx
   {items.map(item => (
     <Card key={item.id} data-testid={`item-card-id-${item.id}`}>
   ))}
   ```

6. **Container elements for page sections**
   ```tsx
   <div data-testid="dashboard-container-id">
   ```

### ❌ DON'T add `data-testid` to:

1. Static text content
2. Decorative elements
3. Elements already identified by ARIA role
4. Non-interactive containers

## Naming Convention Details

### Component Prefix
Use the component or feature name:
- `project-` for project-related elements
- `auth-` for authentication elements
- `nav-` for navigation elements

### Element Name
Describe what the element is:
- `card`, `button`, `input`, `dialog`, `link`
- `list`, `container`, `header`, `footer`

### Type Suffix (for fixed elements)
Always end with `-id`:
- `project-create-button-id`
- `login-form-container-id`

### Dynamic ID (for list items)
Include item identifier after `-id-`:
- `project-card-id-123`
- `asset-row-id-abc-def`

## Testing Examples

### Playwright Test
```typescript
test('should create a new project', async ({ page }) => {
  // Click create button
  await page.getByTestId('create-project-button-id').click();
  
  // Fill form
  await page.getByTestId('project-name-input-id').fill('New Project');
  
  // Submit
  await page.getByTestId('project-submit-button-id').click();
  
  // Verify
  await expect(page.getByText('New Project')).toBeVisible();
});
```

### Testing List Items
```typescript
test('should delete a specific project', async ({ page }) => {
  const projectId = '123';
  
  // Click delete button for specific project
  await page.getByTestId(`project-delete-button-id-${projectId}`).click();
  
  // Confirm deletion
  await page.getByTestId('confirm-delete-button-id').click();
  
  // Verify project is removed
  await expect(page.getByTestId(`project-card-id-${projectId}`)).not.toBeVisible();
});
```
