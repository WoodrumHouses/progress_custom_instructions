# I18N Quick Start Guide

This guide covers internationalization (i18n) using react-i18next.

## Setup

The i18n configuration is in `frontend/src/i18n.ts`.

## Usage

### Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.welcome')}</p>
    </div>
  );
}
```

### Translation Keys

Keys are organized hierarchically in the translation file:

```typescript
{
  translation: {
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
    },
    projects: {
      title: 'Projects',
      newProject: 'New Project',
    },
  },
}
```

### Adding New Translations

1. Add the key to `src/i18n.ts`:
   ```typescript
   projects: {
     myNewKey: 'My new text',
   },
   ```

2. Use in component:
   ```tsx
   {t('projects.myNewKey')}
   ```

## Best Practices

1. **Always use translation keys** - Never hardcode user-facing text
2. **Use descriptive key names** - `projects.deleteConfirmation` not `projects.msg1`
3. **Group related translations** - Use nested objects for organization
4. **Include context in keys** - `button.save` vs `dialog.save` if different
