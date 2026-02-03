---
applyTo: 'Webapp/frontend/src/**/*.{ts,tsx}'
---

# Frontend React Guidelines

These rules apply specifically to the React/TypeScript frontend codebase.

## Component Structure

✅ **DO:**
```typescript
// Good: Functional component with explicit types
interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const { t } = useTranslation();
  
  return (
    <Card data-testid={`project-card-id-${project.id}`}>
      {/* ... */}
    </Card>
  );
}
```

## KendoUI Components

**ALWAYS prefer KendoUI React components** for consistent theming:

```tsx
// ✅ Good: KendoUI Button with icon
import { Button } from '@progress/kendo-react-buttons';
import { plusIcon } from '@progress/kendo-svg-icons';

<Button themeColor="primary" svgIcon={plusIcon}>
  Create
</Button>

// ❌ Bad: Native HTML button
<button className="btn-primary">Create</button>
```

### KendoUI Icons
Use icons from: https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/

```tsx
import { SvgIcon } from '@progress/kendo-react-common';
import { plusIcon, trashIcon, editIcon, eyeIcon } from '@progress/kendo-svg-icons';
```

## Data Testability

**CRITICAL: All interactive elements need `data-testid` attributes**

### Naming Convention
Format: `{component}-{element}-{type}-id` or `{component}-{element}-id-{itemId}`

```tsx
// Fixed elements
data-testid="project-list-container-id"
data-testid="create-project-button-id"
data-testid="project-name-input-id"
data-testid="delete-confirm-dialog-id"

// List items with dynamic IDs
data-testid={`project-card-id-${project.id}`}
data-testid={`asset-row-id-${asset.id}`}
```

### What to Add Test IDs To
✅ Buttons, form inputs, navigation links, dialogs, list items

❌ Static text, decorative elements, elements with ARIA roles

## API Service Layer

**ALWAYS use the API service layer** - never make direct Axios calls in components:

```typescript
// ✅ Good: Use service
import { projectService } from '@/services/projectService';
const projects = await projectService.getAll();

// ❌ Bad: Direct axios call in component
import axios from 'axios';
const response = await axios.get('/api/projects');
```

## State Management

### React Query for Server State
```typescript
const { data: projects, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: projectService.getAll,
});
```

### Context for Global Client State
Use `AuthContext` for authentication state.

## Internationalization (i18n)

Use `react-i18next` for all user-facing text:
```tsx
const { t } = useTranslation();

// ✅ Good
<h1>{t('projects.title')}</h1>

// ❌ Bad
<h1>Projects</h1>
```

## File Organization

- One component per file
- PascalCase for component files: `ProjectCard.tsx`
- Co-locate CSS: `ProjectCard.css` alongside `ProjectCard.tsx`
- Services in `src/services/`
- Types in `src/types/`
