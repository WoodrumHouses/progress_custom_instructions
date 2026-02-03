# Six Primitives Implementation

## Overview
Implementation of GitHub Copilot customization following the recommendations from 
[Norman-Norman-Norman/customize-your-repo](https://github.com/Norman-Norman-Norman/customize-your-repo).

## Primitives Implemented

| Primitive | Status | Location |
|-----------|--------|----------|
| Always-on Instructions | ✅ Existing | `.github/copilot-instructions.md` |
| File-based Instructions | ✅ Added | `Webapp/.github/instructions/` |
| Prompts | ✅ Added | `Webapp/.github/prompts/` |
| Custom Agents | ✅ Added | `Webapp/.github/agents/` |
| Skills | ❌ Not implemented | - |
| MCP | ❌ Not implemented | - |

## Files Created

### File-based Instructions
```
Webapp/.github/instructions/
├── backend.instructions.md      # applyTo: Webapp/backend/src/**/*.ts
├── frontend.instructions.md     # applyTo: Webapp/frontend/src/**/*.{ts,tsx}
└── playwright-tests.instructions.md  # applyTo: Webapp/frontend/tests/**/*.ts
```

### Prompts
```
Webapp/.github/prompts/
├── new-feature-module.prompt.md   # /new-feature-module
├── new-component.prompt.md        # /new-component
├── new-test-suite.prompt.md       # /new-test-suite
└── new-documentation.prompt.md    # /new-documentation
```

### Custom Agents
```
Webapp/.github/agents/
├── code-reviewer.md       # @code-reviewer
└── database-manager.md    # @database-manager
```

## Key Changes from Original Structure

### Before (Single File Approach)
- All instructions in nested `copilot-instructions.md` files
- Same rules loaded for every request regardless of context

### After (Six Primitives Approach)
- Global rules stay in always-on instructions
- Technology-specific rules in file-based instructions (loaded only when editing matching files)
- Repeatable workflows as prompts (invoked with `/name`)
- Specialized expertise as agents (invoked with `@name`)

## Benefits

1. **Smaller context windows** - File-based instructions only load when needed
2. **Repeatable workflows** - Prompts ensure consistent code generation
3. **Specialized expertise** - Agents provide domain-specific assistance
4. **Better organization** - Clear separation of concerns
