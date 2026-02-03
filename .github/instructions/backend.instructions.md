---
applyTo: 'Webapp/backend/src/**/*.ts'
---

# Backend NestJS Guidelines

These rules apply specifically to the NestJS backend codebase.

## Module Structure Pattern

Each feature follows the NestJS module pattern:
```
feature/
├── feature.module.ts          # Module definition
├── feature.controller.ts      # HTTP endpoints
├── feature.service.ts         # Business logic
├── feature.entity.ts          # TypeORM entity
├── dto/
│   ├── create-feature.dto.ts  # Creation DTO
│   └── update-feature.dto.ts  # Update DTO
```

## Controller Rules

✅ **DO:**
```typescript
// Good: Thin controller, delegates to service
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
```

❌ **DON'T:**
```typescript
// Bad: Business logic in controller
@Get(':id')
async findOne(@Param('id') id: string) {
  const project = await this.projectsRepository.findOne({ where: { id } });
  if (!project) throw new NotFoundException();
  // ... more logic that belongs in service
}
```

## DTO Validation

Always use class-validator decorators:
```typescript
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}
```

## Error Handling

Use NestJS built-in exceptions:
```typescript
// ✅ Good: Specific exception with context
if (!project) {
  throw new NotFoundException(`Project with ID "${id}" not found`);
}

// ❌ Bad: Generic error
if (!project) {
  throw new Error('Not found');
}
```

## TypeORM Entities

- Use `@Entity()` decorator with explicit table name
- Use UUID for primary keys: `@PrimaryGeneratedColumn('uuid')`
- Always include `@CreateDateColumn()` and `@UpdateDateColumn()`
- Define relations explicitly with `@ManyToOne`, `@OneToMany`

## API Prefix

All routes use `/api` prefix (configured in `main.ts`).
Routes follow RESTful conventions:
- GET /api/resources - List all
- GET /api/resources/:id - Get one
- POST /api/resources - Create
- PATCH /api/resources/:id - Partial update
- DELETE /api/resources/:id - Delete
