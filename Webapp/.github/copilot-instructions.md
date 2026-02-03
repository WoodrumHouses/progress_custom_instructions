# Webapp - Copilot Instructions
**Corticon Rules Management System - Full-Stack Application**

---

## Frontend-Backend Communication
- Frontend makes requests to `http://localhost:3000/api/*`
- Vite proxy forwards to `http://localhost:3001/api/*`
- No cross-origin requests from browser perspective

## Project Structure
```
Webapp/
├── backend/               # NestJS API server (port 3001)
├── frontend/             # React app (port 3000)
├── start.bat            # Windows startup script
├── package.json         # Root scripts for coordinating both servers
└── README.md            # Setup and running instructions
```

---

## Quick Start

### Prerequisites
- **Node.js 18 or higher** (check with `node --version`)
- **npm** (comes with Node.js)
- **Windows environment** (project uses Windows-first tooling)

### First Time Setup
```cmd
REM From Webapp root directory
cd C:\dev3\web-ui\Webapp

REM Install all dependencies (backend + frontend)
npm install
```

### Starting Development Servers

**CRITICAL: ALWAYS start backend first, then frontend** - frontend depends on backend API.

```cmd
REM Terminal 1 - Backend (MUST start first)
cd C:\dev3\web-ui\Webapp\backend
npm run start:dev

REM Terminal 2 - Frontend (start after backend is ready)
cd C:\dev3\web-ui\Webapp\frontend
npm run dev
```

### Access Points
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:3001/api

---

## Full-Stack Integration

### Frontend-Backend Communication

#### Proxy Configuration
Frontend uses Vite proxy to avoid CORS issues:
- Frontend makes requests to: `http://localhost:3000/api/*`
- Vite forwards to: `http://localhost:3001/api/*`
- Browser sees same-origin requests

#### API Service Layer
Frontend API calls are centralized in `frontend/src/services/`:
- `api.ts` - Axios instance configuration
- `projectService.ts` - Project-related API calls
- `assetService.ts` - Asset-related API calls
- etc.

**Example API Call:**
```typescript
// frontend/src/services/projectService.ts
import api from './api';

export const projectService = {
  async getAll() {
    const response = await api.get('/projects');
    return response.data;
  },
  
  async getById(id: string) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  
  async create(data: CreateProjectDto) {
    const response = await api.post('/projects', data);
    return response.data;
  },
};
```

### Authentication Flow (Currently Disabled)

#### Backend
- JWT authentication implemented in `backend/src/auth/`
- Strategy defined but **NOT enforced** with guards
- Endpoints are currently open/public

#### Frontend
- Auth context exists in `frontend/src/context/AuthContext.tsx`
- Login/Register UI components exist
- **Does NOT send JWT tokens** in requests yet
- System works without authentication headers

**To enable authentication in the future:**
1. Add `@UseGuards(JwtAuthGuard)` to backend controllers
2. Update frontend API service to include JWT token in headers
3. Implement token refresh logic

---

## Database Management

### Database Files (in backend directory)
- `rules_management.db` - **Development database** (default)
- `rules_management_clean.db` - Empty database for testing
- `rules_management_qa.db` - QA database with sample data (if exists)

### Database Scripts (run from Webapp root)

```cmd
REM Inspect current database
npm run db:inspect

REM Switch to clean database (for testing)
npm run db:switch-to-clean

REM Switch to QA database (sample data)
npm run db:switch-to-qa

REM CRITICAL: Restore development database after testing
npm run db:restore-dev
```

### Manual Database Reset
```cmd
REM 1. Stop backend server (Ctrl+C)
REM 2. Delete database file
del backend\rules_management.db

REM 3. Restart backend - database will be recreated
cd backend
npm run start:dev
```

---

## Testing

### Playwright E2E Testing
**CRITICAL: Manual database management required for reliable testing**

#### Prerequisites
1. Backend server running on port 3001
2. Frontend dev server running on port 3000
3. Playwright browsers installed: `cd frontend & npx playwright install`

#### Testing Workflow (MUST follow this order)

```cmd
REM 1. Switch to clean test database
cd C:\dev3\web-ui\Webapp
npm run db:switch-to-clean

REM 2. Ensure both servers are running
REM    Backend: npm run start:dev (in backend directory)
REM    Frontend: npm run dev (in frontend directory)

REM 3. Run tests
npm run test:chromium
REM OR npm run test (all browsers)
REM OR npm run test:headed (visual debugging)
REM OR npm run test:ui (interactive test UI)

REM 4. CRITICAL: Restore development database
npm run db:restore-dev
```

#### Available Test Commands
From Webapp root:
- `npm run test` - Run all Playwright tests (all browsers)
- `npm run test:chromium` - Chromium only (fastest)
- `npm run test:firefox` - Firefox only
- `npm run test:webkit` - WebKit only
- `npm run test:headed` - Visual browser testing
- `npm run test:ui` - Interactive Playwright UI

#### Test Files Location
Tests are in: `frontend/tests/`

---

## Build Process

### Development Builds (with type checking)
```cmd
REM Backend build
cd C:\dev3\web-ui\Webapp\backend
npm run build

REM Frontend build
cd C:\dev3\web-ui\Webapp\frontend
npm run build
```

### Build Verification (CRITICAL before committing)
**ALWAYS run builds after making code changes:**
```cmd
REM From Webapp root
cd C:\dev3\web-ui\Webapp

REM Build backend
cd backend & npm run build & cd ..

REM Build frontend
cd frontend & npm run build & cd ..
```

This ensures TypeScript errors are caught before committing changes.

### Build Output Locations
- **Backend**: `backend/dist/` directory
- **Frontend**: `frontend/dist/` directory

---

## Common Full-Stack Workflows

### Adding a New Feature (Full-Stack)

1. **Define the data model** (backend)
   - Create entity in `backend/src/feature/feature.entity.ts`
   - Create DTOs in `backend/src/feature/dto/`

2. **Create API endpoints** (backend)
   - Create module, controller, service in `backend/src/feature/`
   - Register module in `backend/src/app.module.ts`

3. **Create API service** (frontend)
   - Add service file in `frontend/src/services/featureService.ts`
   - Use Axios to call backend endpoints

4. **Create UI components** (frontend)
   - Create components in `frontend/src/components/feature/`
   - Use KendoUI React components
   - Add `data-testid` attributes for testability

5. **Add routing** (frontend)
   - Update `frontend/src/App.tsx` with new routes
   - Create navigation links

6. **Test the feature**
   - Write Playwright E2E tests in `frontend/tests/`
   - Test with clean database
   - Verify both frontend and backend work together

### Debugging Full-Stack Issues

#### Backend Issues
- Check backend console output
- Use NestJS Logger for debugging
- Inspect database: `npm run db:inspect`
- Check API responses in browser DevTools Network tab

#### Frontend Issues
- Check browser console for errors
- Verify API calls in Network tab
- Check React DevTools for component state
- Verify Vite proxy is forwarding requests

#### Integration Issues
- **Port conflicts**: Ensure backend on 3001, frontend on 3000
- **CORS errors**: Should not occur with proxy - check Vite config
- **API not found**: Verify backend is running and endpoints exist
- **Data not updating**: Check both frontend state and database

---

## Performance Considerations

### Backend Optimization
- TypeORM query optimization (use relations wisely)
- Implement pagination for large datasets
- Cache frequently accessed data
- Use proper database indexes

### Frontend Optimization
- Use React.memo for expensive components
- Implement virtual scrolling for large lists (KendoUI Grid)
- Lazy load routes and components
- Optimize bundle size (check with `npm run build`)

### Network Optimization
- Minimize API calls (use batch endpoints if needed)
- Implement debouncing for search inputs
- Use proper HTTP caching headers
- Consider pagination for list endpoints

---

## Environment-Specific Configuration

### Development
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- Database: SQLite (`backend/rules_management.db`)
- Hot reload: Enabled on both frontend and backend
- Source maps: Enabled

### Production (Future)
- Frontend: Served as static files from `frontend/dist/`
- Backend: Compiled code from `backend/dist/`
- Database: PostgreSQL or other production database
- Hot reload: Disabled
- Source maps: Disabled
- Environment variables: Configure via `.env` files

---

## Critical Rules for Full-Stack Development

**These rules MUST be followed when working in the Webapp. They combine rules from root-level
instructions with full-stack specific requirements.**

### From Root-Level Instructions (ALWAYS APPLY)
1. **ALWAYS check Node.js version first** - must be 18+
2. **ALWAYS install dependencies** before building or starting servers
3. **ALWAYS run the build after making code changes** - verify compilation succeeds:
   - Backend: `cd Webapp\backend & npm run build`
   - Frontend: `cd Webapp\frontend & npm run build`
4. **NEVER run build commands without fixing TypeScript errors first**
5. **ALWAYS use KendoUI Icons** -
  https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/
6. **ALWAYS use KendoUI React components** for consistent design and functionality
7. **ALWAYS preserve git history** when refactoring/moving files

### Full-Stack Integration Rules
8. **ALWAYS start backend before frontend** - frontend proxy depends on backend API
9. **ALWAYS use proper directory paths** - many commands are directory-sensitive
10. **ALWAYS build both projects** before committing changes (see rule #3)
11. **ALWAYS define TypeScript types** for API request/response data
12. **ALWAYS use the API service layer** - don't make direct Axios calls in components
13. **ALWAYS add `data-testid` attributes** to testable UI elements
14. **ALWAYS handle errors properly** - both backend exceptions and frontend error states

### Database & Testing Rules (CRITICAL)
15. **ALWAYS switch to clean database before testing** - `npm run db:switch-to-clean`
16. **ALWAYS restore dev database after testing** - `npm run db:restore-dev`
17. **Testing workflow order** (MANDATORY):
    1. Switch to clean DB
    2. Start servers (backend first, then frontend)
    3. Run tests
    4. Restore dev DB

---

## Additional Resources
- **Architecture Overview**: `../Documentation/Architecture-Overview.md`
- **Testing Guide**: `../Documentation/TestingGuide.md`
