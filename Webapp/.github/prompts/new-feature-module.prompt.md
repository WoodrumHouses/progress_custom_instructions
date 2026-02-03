---
agent: 'agent'
description: 'Generate a complete NestJS feature module with controller, service, entity, and DTOs'
tools: ['editFiles', 'createFile', 'runInTerminal', 'readFile']
---

# Generate NestJS Feature Module

## What I Need
1. Feature name (e.g., "rules", "decisions", "ruleflows")
2. Main entity properties
3. Relations to other entities (optional)

## Generation Steps

### 1. Create the Entity

Create `Webapp/backend/src/{feature}/{feature}.entity.ts`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('{feature}s')
export class {Feature} {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### 2. Create DTOs

Create `Webapp/backend/src/{feature}/dto/create-{feature}.dto.ts`:
```typescript
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class Create{Feature}Dto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
```

Create `Webapp/backend/src/{feature}/dto/update-{feature}.dto.ts`:
```typescript
import { PartialType } from '@nestjs/mapped-types';
import { Create{Feature}Dto } from './create-{feature}.dto';

export class Update{Feature}Dto extends PartialType(Create{Feature}Dto) {}
```

### 3. Create Service

Create `Webapp/backend/src/{feature}/{feature}.service.ts` with CRUD operations.

### 4. Create Controller

Create `Webapp/backend/src/{feature}/{feature}.controller.ts` with REST endpoints.

### 5. Create Module

Create `Webapp/backend/src/{feature}/{feature}.module.ts` and register in AppModule.

### 6. Run Build

```cmd
cd Webapp/backend && npm run build
```

## Checklist
- [ ] Entity created with proper decorators
- [ ] DTOs with class-validator
- [ ] Service with error handling
- [ ] Controller with proper HTTP methods
- [ ] Module registered in AppModule
- [ ] Build passes without errors
