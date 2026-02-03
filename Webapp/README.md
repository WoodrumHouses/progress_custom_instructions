# Corticon Rules Management System

A full-stack web application for managing business rules and decision services, built with 
React/TypeScript frontend and NestJS backend.

## Quick Start

### Prerequisites
- **Node.js 18 or higher** (check with `node --version`)
- **npm** (comes with Node.js)

### Installation

```bash
# From Webapp root directory
cd Webapp

# Install all dependencies (backend + frontend)
npm install
```

### Starting Development Servers

**CRITICAL: ALWAYS start backend first, then frontend** - frontend depends on backend API.

```bash
# Terminal 1 - Backend (port 3001)
cd backend
npm run start:dev

# Terminal 2 - Frontend (port 3000)
cd frontend
npm run dev
```

### Access Points
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

## Project Structure

```
Webapp/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── auth/           # Authentication module (JWT)
│   │   ├── users/          # User management
│   │   ├── projects/       # Project management
│   │   ├── assets/         # Asset management
│   │   └── health/         # Health check endpoint
│   ├── rules_management.db # SQLite database
│   └── package.json
├── frontend/               # React/Vite application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── context/        # React context providers
│   │   └── i18n.ts         # Internationalization
│   ├── tests/              # Playwright E2E tests
│   └── package.json
├── package.json            # Root scripts for coordination
└── README.md
```

## API Endpoints

### Health
- `GET /api/health` - Health check

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Assets
- `GET /api/assets` - List all assets (optional: ?projectId=...)
- `GET /api/assets/:id` - Get asset by ID
- `POST /api/assets` - Create asset
- `PATCH /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

## Testing

### Playwright E2E Tests

```bash
# Install Playwright browsers (first time only)
cd frontend
npx playwright install

# Run tests
npm run test           # All browsers
npm run test:chromium  # Chromium only (fastest)
npm run test:headed    # With browser visible
npm run test:ui        # Interactive UI
```

## Build

```bash
# Build backend
cd backend && npm run build

# Build frontend
cd frontend && npm run build
```

## Technology Stack

### Backend
- NestJS 10.x
- TypeORM + SQLite
- JWT Authentication (Passport)
- class-validator

### Frontend
- React 18.2
- TypeScript
- Vite
- KendoUI React
- TanStack React Query
- React Router v6
- Playwright (testing)
