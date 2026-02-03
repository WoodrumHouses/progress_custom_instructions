# Corticon Rules Management System - Copilot Instructions

## Project Overview
Full-stack web application for managing business rules and decision services.
- **Frontend**: React/TypeScript with KendoUI (port 3000)
- **Backend**: NestJS with TypeORM/SQLite (port 3001)
- **Testing**: Playwright E2E

## Project Structure
```
Webapp/
├── backend/          # NestJS API server
├── frontend/         # React app with Vite
└── package.json      # Root scripts
```

## Critical Rules

### Environment
- **Node.js 18+** required
- **Windows-first**: Use `REM` for comments, `;` to chain commands (not `&`)

### Startup Order (CRITICAL)
1. Backend first: `cd Webapp\backend ; npm run start:dev`
2. Frontend second: `cd Webapp\frontend ; npm run dev`

### Build Verification
**ALWAYS build after code changes:**
```cmd
cd Webapp\backend ; npm run build
cd Webapp\frontend ; npm run build
```

### Database Management
- Development DB: `backend/rules_management.db`
- Before testing: `npm run db:switch-to-clean`
- After testing: `npm run db:restore-dev`

### Testing Workflow
1. Switch to clean DB
2. Start servers (backend first)
3. Run tests: `npm run test:chromium`
4. Restore dev DB

## Agent Rules

1. **ALWAYS** check Node.js version first (must be 18+)
2. **ALWAYS** install dependencies before building
3. **ALWAYS** start backend before frontend
4. **ALWAYS** build after code changes
5. **ALWAYS** restore dev database after testing
6. **ALWAYS** use KendoUI React components
7. **ALWAYS** add `data-testid` attributes for testability
8. **ALWAYS** preserve git history when moving files
9. **NEVER** run builds without fixing TypeScript errors first

## Documentation

- Create docs in `/Documentation` folder
- Use Mermaid for diagrams
- Max 100 chars per line
- New features: `/Documentation/changes/YYYY-MM-DD_FeatureName/readme.md`

## API Communication
- Frontend calls `/api/*` on port 3000
- Vite proxy forwards to `http://localhost:3001/api/*`
- Use service layer in `frontend/src/services/`
