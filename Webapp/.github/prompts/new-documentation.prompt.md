---
agent: 'agent'
description: 'Create documentation for a new feature following project conventions'
tools: ['createFile', 'readFile']
---

# Generate Feature Documentation

## What I Need
1. Feature name
2. Brief description of what it does
3. Key components and files involved

## Documentation Location

Create documentation in `/Documentation/changes/{YYYY-MM-DD}_{FeatureName}/readme.md`

## Template

```markdown
# {Feature Name}

## Overview
Brief description of the feature (2-3 sentences).

## Changes

### Backend
- `src/{feature}/` - New module with controller, service, entity

### Frontend
- `src/components/{FeatureName}.tsx` - Main component
- `src/services/{feature}Service.ts` - API service

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/{feature}` | List all |
| POST | `/api/{feature}` | Create new |

## Testing
- Unit tests: `npm test` in backend
- E2E tests: `npx playwright test {feature}`

## Screenshots
(Add relevant screenshots if applicable)
```

## Documentation Rules

1. **Keep it minimal** - This is reviewed first in PRs
2. **Date prefix** - Always use YYYY-MM-DD format
3. **Mermaid diagrams** - For any architectural changes
4. **Line length** - Max 100 characters per line

## Checklist
- [ ] Created in `/Documentation/changes/` folder
- [ ] Uses date prefix in folder name
- [ ] Includes API endpoints table
- [ ] Minimal but complete
