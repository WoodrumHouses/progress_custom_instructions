# Corticon Rules Management System - Copilot Instructions

## Project Overview
This is a full-stack web application for managing business rules and decision  services, built with React/TypeScript
frontend and NestJS backend. The system implements Corticon as an AI-driven business rules management platform.

## API Architecture
Refer to [Architecture.md](Architecture.md)

## Critical Setup Requirements

### Prerequisites
- **Windows environment** We use Windows as the main development environment. When running commands,
  make sure to use Windows command syntax. For example, use `REM` for comments in batch files and command prompt.
  Use `;` to chain commands and DO NOT USE `&`.
  
## Build & Development Process

### CRITICAL: Always work from correct directories
- **Root operations**: Use `<developerSpecificPath>\Webapp\`
- **Backend operations**: Use `<developerSpecificPath>\Webapp\backend\`
- **Frontend operations**: Use `<developerSpecificPath>\Webapp\frontend\`

### Installation & Setup (First Time)
```cmd
REM Navigate to webapp root
cd C:\dev3\web-ui\Webapp

REM Install all dependencies (backend + frontend)
npm install

```

### Development Server Startup
**ALWAYS start backend first, then frontend** - frontend depends on backend 
API.

```cmd
REM Terminal 1 - Backend server
cd C:\dev3\web-ui\Webapp\backend
npm run start:dev

REM Terminal 2 - Frontend server (after backend is running)
cd C:\dev3\web-ui\Webapp\frontend
npm run dev
```

### Build Process
```cmd
REM Backend build
cd C:\dev3\web-ui\Webapp\backend
npm run build

REM Frontend build
cd C:\dev3\web-ui\Webapp\frontend
npm run build
```

## Critical Rules for Agents

1. **ALWAYS check Node.js version first** - must be 18+
2. **ALWAYS install dependencies** before building or starting servers
3. **ALWAYS start backend before frontend** - frontend depends on backend API
4. **ALWAYS use proper directory paths** - many commands are directory-sensitive
5. **ALWAYS restore development database** after testing (`npm run db:restore-dev`)
6. **NEVER run build commands without fixing TypeScript errors first**
7. **ALWAYS run the build after making code changes** - verify compilation succeeds:
   - Frontend: `cd Webapp\frontend; npm run build`
   - Backend: `cd Webapp\backend; npm run build`
   - This ensures TypeScript errors are caught before committing changes
8. **ALWAYS Preserve git history** if you refactor something that moves files make sure to 
   "preserve git history" instead of just copying files around and deleting the original.
9. **TRUST THESE INSTRUCTIONS** - only search for additional info if instructions are incomplete or incorrect
10. **ALWAYS Create diagram as files and use Mermaid syntax**.
11. **ALWAYS Use `;` to chain commands in CMD**, for example: cd .. ; dir

Use this information to minimize exploration time and avoid common pitfalls.

### Documentation
1. ALWAYS create general documentation in the toplevel /Documentation folder
2. ALWAYS use mermaid syntax for diagrams
3. ALWAYS keep individual text lines to 100 characters or less for readability and easy diffing.
4. ALWAYS - When a feature is added and before a pull request is done, create
  a readme.md in the /Documentation/changes/<new features> subfolder.  
  Where <new features> follows a specific pattern. For example: 2025-01-15_ProjectCardView.
  But make sure the readme.md is kept to a strict minimum as this is the first item we review in a pull request.
