# Architecture Overview

This document provides an overview of the Corticon Rules Management System architecture.

## System Architecture

```mermaid
graph TB
    subgraph Frontend["Frontend (React/Vite)"]
        UI[React Components]
        Services[API Services]
        Context[Auth Context]
        Query[React Query]
    end

    subgraph Backend["Backend (NestJS)"]
        Controllers[Controllers]
        Services_BE[Services]
        Guards[Auth Guards]
        TypeORM[TypeORM]
    end

    subgraph Database["Database"]
        SQLite[(SQLite)]
    end

    UI --> Services
    Services --> Query
    Query --> Controllers
    Context --> Services
    Controllers --> Guards
    Controllers --> Services_BE
    Services_BE --> TypeORM
    TypeORM --> SQLite
```

## Module Structure

```mermaid
graph LR
    subgraph Backend Modules
        App[AppModule]
        Auth[AuthModule]
        Users[UsersModule]
        Projects[ProjectsModule]
        Assets[AssetsModule]
        Health[HealthModule]
    end

    App --> Auth
    App --> Users
    App --> Projects
    App --> Assets
    App --> Health
    Auth --> Users
    Assets --> Projects
```

## Data Flow

```mermaid
sequenceDiagram
    participant UI as React UI
    participant API as API Service
    participant RQ as React Query
    participant BE as NestJS Backend
    participant DB as SQLite

    UI->>API: User Action
    API->>RQ: API Call
    RQ->>BE: HTTP Request
    BE->>DB: Query
    DB-->>BE: Data
    BE-->>RQ: Response
    RQ-->>API: Cached Data
    API-->>UI: Update State
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant AuthController
    participant AuthService
    participant UsersService
    participant JWT

    User->>Frontend: Login (email, password)
    Frontend->>AuthController: POST /auth/login
    AuthController->>AuthService: login(dto)
    AuthService->>UsersService: findByEmail()
    UsersService-->>AuthService: User
    AuthService->>AuthService: validatePassword()
    AuthService->>JWT: sign(payload)
    JWT-->>AuthService: Token
    AuthService-->>AuthController: { user, accessToken }
    AuthController-->>Frontend: Response
    Frontend->>Frontend: Store token in localStorage
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI Framework |
| Frontend | TypeScript | Type Safety |
| Frontend | Vite | Build Tool |
| Frontend | KendoUI React | UI Components |
| Frontend | React Query | Server State |
| Frontend | Axios | HTTP Client |
| Backend | NestJS | API Framework |
| Backend | TypeORM | ORM |
| Backend | Passport JWT | Authentication |
| Database | SQLite | Data Storage |
| Testing | Playwright | E2E Testing |
