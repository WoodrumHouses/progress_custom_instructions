# Backend - Copilot Instructions
**Corticon Rules Management System - NestJS Backend**

---

## Project Overview
NestJS backend API server for managing business rules and decision services. Built with TypeScript,
TypeORM, and SQLite database.

## Technology Stack
- **Framework**: NestJS 10.x
- **Language**: TypeScript (strict mode)
- **Database**: SQLite (dev), TypeORM for ORM
- **Authentication**: JWT (Passport)
- **Validation**: class-validator, class-transformer
- **HTTP Client**: Axios
- **Runtime**: Node.js 18+

## Directory Structure
```
backend/
├── src/
│   ├── main.ts                  # Application entry point
│   ├── app.module.ts            # Root module
│   ├── auth/                    # Authentication module
│   ├── users/                   # Users module
│   ├── projects/                # Projects module
│   ├── assets/                  # Assets module
│   ├── decision/                # Decision services module
│   ├── bundle/                  # Bundle management module
│   ├── health/                  # Health check endpoints
│   ├── metrics/                 # Performance metrics
│   ├── debug/                   # Debug utilities
│   └── tools/                   # Utility tools
├── debugTools/                  # Database inspection scripts
├── test-tools/                  # Database management for testing
├── rules_management.db          # SQLite database (dev)
├── rules_management_clean.db    # Clean database for testing
├── tsconfig.json                # TypeScript configuration
└── nest-cli.json                # NestJS CLI configuration
```

## NestJS Architecture Patterns

### Module Structure
Each feature follows the NestJS module pattern:

```
feature/
├── feature.module.ts          # Module definition
├── feature.controller.ts      # HTTP endpoints
├── feature.service.ts         # Business logic
├── feature.entity.ts          # TypeORM entity (database model)
├── dto/
│   ├── create-feature.dto.ts  # Data Transfer Object for creation
│   └── update-feature.dto.ts  # Data Transfer Object for updates
└── feature.controller.spec.ts # Tests (if any)
```

---

## Database & TypeORM

### Database Configuration
Location: `src/app.module.ts`

**CRITICAL**: 
- `synchronize: true` is for **development only**
- For production, use migrations
- Database file: `rules_management.db` in backend root


---

## Authentication & Authorization

### Current State
- **JWT authentication is implemented but NOT enforced**
- No `@UseGuards(JwtAuthGuard)` decorators are active
- Endpoints are currently open/public
- Frontend doesn't send JWT tokens yet


## API Design Best Practices

### RESTful Conventions
```typescript
// Resource: /api/projects

GET    /api/projects           # List all projects
GET    /api/projects/:id       # Get specific project
POST   /api/projects           # Create new project
PATCH  /api/projects/:id       # Update project (partial)
PUT    /api/projects/:id       # Replace project (full)
DELETE /api/projects/:id       # Delete project

// Nested resources
GET    /api/projects/:id/assets           # List assets for project
POST   /api/projects/:id/assets           # Create asset in project
GET    /api/projects/:id/assets/:assetId  # Get specific asset
```

## Configuration & Environment

### Environment Variables
File: `.env` in backend root

## Database Management & Testing

### Database Files
- `rules_management.db` - Development database
- `rules_management_clean.db` - Empty database for testing
- `rules_management_qa.db` - QA database with sample data (if exists)

### Database Scripts
```cmd
REM Inspect database
node debugTools\inspect-db.js

REM Custom queries
node debugTools\quick-queries.js

REM Switch to test database (clean)
node test-tools\setup-test.js --clean --no-server

REM Switch to QA database
node test-tools\setup-test.js --no-server

REM Restore development database (CRITICAL after testing)
node test-tools\cleanup-test.js --no-server
```

### Manual Database Reset
```cmd
REM Stop backend server
REM Delete database file
del rules_management.db

REM Restart backend - database will be recreated
npm run start:dev
```


---

## Critical Rules for Backend Development

1. **ALWAYS define DTOs** for request bodies with proper validation
2. **ALWAYS use TypeORM entities** for database models
3. **ALWAYS handle errors properly** - use NestJS exceptions
4. **ALWAYS validate input** - use class-validator decorators
5. **ALWAYS use services for business logic** - keep controllers thin
6. **ALWAYS check for null/undefined** before accessing database results
7. **ALWAYS run `npm run build`** after changes to catch TypeScript errors
8. **NEVER use `synchronize: true` in production** - use migrations instead
9. **ALWAYS restore dev database after testing** - `npm run db:restore-dev`
10. **TRUST THESE INSTRUCTIONS** - follow NestJS patterns and conventions

---

## Resources

- **NestJS Documentation**: https://docs.nestjs.com/
- **TypeORM Documentation**: https://typeorm.io/
- **class-validator**: https://github.com/typestack/class-validator
- **Passport JWT**: http://www.passportjs.org/packages/passport-jwt/
