# Corticon Rules Management System

A full-stack web application for managing business rules and decision services, demonstrating 
**GitHub Copilot instruction inheritance** patterns for enterprise projects.

## 🎯 Purpose

This repository serves as a reference implementation showing how to structure GitHub Copilot 
instructions for complex, multi-layered projects. It demonstrates:

- **Hierarchical instruction inheritance** - Global rules that cascade to specific areas
- **Context-aware code generation** - Different guidelines for backend, frontend, and tests
- **Consistent AI-assisted development** - Ensuring Copilot follows project conventions

## 📁 Project Structure

```
progress_custom_instructions/
├── .github/
│   ├── copilot-instructions.md           # 🌐 Global instructions (always loaded)
│   └── instructions/
│       ├── backend.instructions.md        # 🔧 Backend-specific rules
│       ├── frontend.instructions.md       # ⚛️  Frontend-specific rules
│       └── playwright-tests.instructions.md # 🧪 Test-specific rules
├── Documentation/
│   └── changes/                           # Feature documentation
├── Webapp/
│   ├── backend/                           # NestJS API server
│   ├── frontend/                          # React/TypeScript app
│   └── README.md                          # Application-specific docs
└── README.md                              # This file
```

## 🧬 Copilot Instruction Inheritance

### How It Works

GitHub Copilot uses a hierarchical instruction system that allows you to define rules at 
different levels of specificity:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    GLOBAL INSTRUCTIONS                               │
│            .github/copilot-instructions.md                           │
│                                                                      │
│   • Always loaded for every file in the workspace                   │
│   • Contains project-wide rules, conventions, and critical info     │
│   • Defines startup order, build commands, environment requirements │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  SCOPED INSTRUCTIONS                                 │
│           .github/instructions/*.instructions.md                     │
│                                                                      │
│   • Applied based on file path matching (applyTo pattern)           │
│   • Inherit and extend global instructions                          │
│   • Provide domain-specific guidance                                │
└─────────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
     ┌──────────┐      ┌──────────┐      ┌──────────┐
     │ Backend  │      │ Frontend │      │  Tests   │
     │  Rules   │      │  Rules   │      │  Rules   │
     └──────────┘      └──────────┘      └──────────┘
```

### File-Based Scoping

Each instruction file uses front-matter to define which files it applies to:

```yaml
---
applyTo: 'Webapp/backend/src/**/*.ts'
---
```

| File | Applies To | Purpose |
|------|------------|---------|
| `copilot-instructions.md` | All files | Global rules, project setup, critical workflows |
| `backend.instructions.md` | `Webapp/backend/src/**/*.ts` | NestJS patterns, TypeORM, DTOs |
| `frontend.instructions.md` | `Webapp/frontend/src/**/*.{ts,tsx}` | React, KendoUI, services |
| `playwright-tests.instructions.md` | `Webapp/frontend/tests/**/*.{ts,spec.ts}` | E2E testing patterns |

### Instruction Priority

When editing a file, Copilot loads instructions in this order:

1. **Global instructions** (`.github/copilot-instructions.md`) - Always active
2. **Matched scoped instructions** - Based on `applyTo` pattern matching the current file
3. **Combined context** - Both sets of rules are used together

## 📋 Instruction Content Overview

### Global Instructions (copilot-instructions.md)

Contains project-wide rules that apply everywhere:

- ✅ Environment requirements (Node.js 18+)
- ✅ Startup order (backend first, then frontend)
- ✅ Build verification commands
- ✅ Database management workflows
- ✅ Testing procedures
- ✅ Documentation standards

### Backend Instructions

NestJS-specific patterns:

- Module structure (controller → service → entity → DTOs)
- Thin controllers with service delegation
- DTO validation with class-validator
- NestJS exception handling
- TypeORM entity conventions
- RESTful API patterns

### Frontend Instructions

React/TypeScript patterns:

- Component structure with explicit types
- **KendoUI component preference** for UI elements
- `data-testid` naming conventions for testability
- API service layer usage (no direct axios calls)
- State management with React Query

### Test Instructions

Playwright E2E patterns:

- Test structure (describe → beforeEach → test)
- Element selection via `data-testid` only
- Assertion patterns
- Auto-wait best practices
- Database state management

## 🚀 Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd progress_custom_instructions

# Navigate to the application
cd Webapp

# Install dependencies
npm install

# Start backend (Terminal 1)
cd backend && npm run start:dev

# Start frontend (Terminal 2)
cd frontend && npm run dev
```

See [Webapp/README.md](Webapp/README.md) for detailed application documentation.

## 🎓 Creating Your Own Instruction Structure

### Step 1: Create Global Instructions

Create `.github/copilot-instructions.md` with project-wide rules:

```markdown
# Project Name - Copilot Instructions

## Project Overview
Brief description of your project...

## Critical Rules
- Environment requirements
- Build commands
- Testing procedures
```

### Step 2: Create Scoped Instructions

Create files in `.github/instructions/` with front-matter:

```markdown
---
applyTo: 'src/backend/**/*.ts'
---

# Backend Guidelines

Your backend-specific rules here...
```

### Step 3: Define Clear Patterns

Use consistent patterns that Copilot can learn:

- ✅ Show examples of good code
- ❌ Show examples of what to avoid
- Use code blocks with clear annotations

## 📚 Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Custom Instructions Guide](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [Webapp Application README](Webapp/README.md)

## 📄 License

This project is provided as a reference implementation for GitHub Copilot instruction patterns.
