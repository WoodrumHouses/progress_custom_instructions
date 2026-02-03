# Frontend - Copilot Instructions
**Corticon Rules Management System - React/TypeScript Frontend**

---

## Project Overview
React/TypeScript frontend application for managing business rules and decision services. Built with
Vite and KendoUI React components.

## Technology Stack
- **Framework**: React 18.2
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite
- **UI Library**: KendoUI React (@progress/kendo-react-*)
- **Styling**: KendoUI Theme Default + Custom CSS
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Routing**: React Router DOM v6
- **State Management**: React Context API + TanStack React Query
- **HTTP Client**: Axios
- **Testing**: Playwright (E2E tests)

## Development Workflow

### Starting Development Server
```cmd
REM From frontend directory
cd C:\dev3\web-ui\Webapp\frontend
npm run dev
```
- Runs on: `http://localhost:3000`
- **CRITICAL**: Backend must be running on port 3001 first
- Vite proxy forwards `/api/*` requests to `http://localhost:3001/api/*`

### Building for Production
```cmd
npm run build
```
- Runs TypeScript compiler (`tsc`) first
- Then runs Vite build
- Output: `dist/` directory
- **ALWAYS fix TypeScript errors before committing**

### Running Tests
```cmd
REM Run all Playwright tests
npm run test

REM Run Chromium tests only (fastest)
npm run test:chromium

REM Run with UI visible (debugging)
npm run test:headed

REM Interactive test UI
npm run test:ui
```

## Coding Best Practices

### React Components

#### File Organization
- **One component per file**
- **File naming**: PascalCase matching component name (e.g., `ProjectCard.tsx`)
- **Component naming**: PascalCase for components, camelCase for utilities

#### CSS
- Use CSS files alongside components for styling
- Name CSS files same as component (e.g., `ProjectCard.css`)
- Scope CSS to component using unique class prefixes
- Avoid global styles unless absolutely necessary

#### I18N (Internationalization)

- Use `react-i18next` for all text translations
- Wrap text in `t('key.path')`
- See [I18N_QuickStart.md](../../../Documentation/I18N_QuickStart.md)

#### Local Storage
Use local storage for persisting user preferences that are not saved in backend.
When storing data, you MUST:
1. Prefix the key with corticon-
2. Use a unique key prefix to avoid collisions:

#### Diagram format
- use mermaid syntax for diagrams of all sorts
- leverage mermaid library for viewing diagrams in markdown files

See [DiagramMermaid.md](../../../Documentation/DiagramMermaid.md) for details

#### Testability Rules
**CRITICAL: All interactive elements must be easily testable**

✅ **DO add `data-testid` attributes to:**
- Buttons that trigger actions
- Form inputs and fields
- Navigation elements
- Dialogs and modals
- List items (with unique IDs)
- Any element that needs to be tested
- ALWAYS use meaningful, consistent names
- ALWAYS postfix with element type (e.g., `-button`, `-input`)
- ALWAYS include -id as a suffix for fixed elements. For lists, ALWAYS include unique identifiers
  (e.g., item ID) at the end past the -id suffix.  For example in a multi project list, use
  `project-card-id-123` for the list item of project with ID 123.

See [MakingUITestable.md](../../../Documentation/MakingUITestable.md) for full guidelines.

❌ **DON'T add `data-testid` to:**
- Simple static text
- Container divs with no interaction
- Elements already well-identified by ARIA role

#### Naming Convention for Test IDs
Format: `{component}-{element}-{type}-id` or `{component}-{element}-id-{id}`

Examples:
- `project-list-container-id`
- `project-card-id-123`
- `project-delete-button-id`
- `create-project-dialog-id`
- `project-name-input-id`

### KendoUI Components

#### Always Use KendoUI Components
Prefer KendoUI React components over native HTML elements for consistency of theming and functionality:


#### KendoUI Icons
Use KendoUI icons from the design system:
```tsx
import { SvgIcon } from '@progress/kendo-react-common';
import { plusIcon, trashIcon, editIcon } from '@progress/kendo-svg-icons';

<Button svgIcon={plusIcon}>New</Button>
<Button svgIcon={trashIcon}>Delete</Button>
<Button svgIcon={editIcon}>Edit</Button>
```

**Icon reference**: https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/

---

### State Management

#### Context Pattern
Use React Context for global state (auth, theme, etc.):

#### TanStack React Query for Server State
Use React Query for API data fetching and caching:

### API Service Layer

#### Service Pattern
Keep API calls in dedicated service files:

## File Locations & References

- **Components**: `src/components/`
- **Context Providers**: `src/context/`
- **API Services**: `src/services/`
- **Type Definitions**: `src/types/`
- **Tests**: `tests/`
- **Internal Packages**: `packages/` (@corticon/model, parser, rulesheet, sdk)

## Performance Considerations

- **Code splitting**: Use `React.lazy()` and `Suspense` for large components
- **Memoization**: Use `React.memo()`, `useMemo()`, `useCallback()` when needed
- **React Query caching**: Configure stale time appropriately
- **Bundle size**: Monitor with `npm run build` - watch for large dependencies

---

## Resources

- **KendoUI React Docs**: https://www.telerik.com/kendo-react-ui/components/
- **KendoUI Icons**: https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/
- **React Router v6**: https://reactrouter.com/
- **TanStack Query**: https://tanstack.com/query/latest/docs/react/overview
- **Playwright**: https://playwright.dev/
- **Testing Guide**: `../Documentation/MakingUITestable.md`

---

*When in doubt, look at existing components for established patterns. Consistency is key!*
