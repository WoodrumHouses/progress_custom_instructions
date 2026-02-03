---
agent: 'agent'
description: 'Generate a React component with proper structure, KendoUI integration, and test IDs'
tools: ['editFiles', 'createFile', 'readFile']
---

# Generate React Component

## What I Need
1. Component name (PascalCase, e.g., "RuleEditor", "DecisionTable")
2. Component type: Page, Dialog, Card, Form, List
3. KendoUI components to use
4. Props interface

## Generation Template

### Component File

Create `Webapp/frontend/src/components/{ComponentName}.tsx`:

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
// Import KendoUI components as needed
import { Button } from '@progress/kendo-react-buttons';

interface {ComponentName}Props {
  // Define props with proper TypeScript types
}

function {ComponentName}({ /* props */ }: {ComponentName}Props) {
  const { t } = useTranslation();

  return (
    <div 
      className="{component-name}-container"
      data-testid="{component-name}-container-id"
    >
      {/* Component content */}
    </div>
  );
}

export default {ComponentName};
```

### CSS File (if needed)

Create `Webapp/frontend/src/components/{ComponentName}.css`:

```css
.{component-name}-container {
  /* Styles */
}
```

## data-testid Requirements

Add test IDs to ALL interactive elements:

| Element Type | Test ID Pattern |
|-------------|-----------------|
| Container | `{component-name}-container-id` |
| Button | `{component-name}-{action}-button-id` |
| Input | `{component-name}-{field}-input-id` |
| Dialog | `{component-name}-dialog-id` |
| List items | `{component-name}-item-id-${item.id}` |

## Checklist
- [ ] Props interface defined
- [ ] KendoUI components used (not native HTML)
- [ ] All text uses i18n: `t('key')`
- [ ] All interactive elements have `data-testid`
- [ ] TypeScript types are explicit
- [ ] Component exported properly
