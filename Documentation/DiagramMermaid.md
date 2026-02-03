# Diagram Guidelines with Mermaid

This project uses Mermaid syntax for all diagrams.

## Why Mermaid?

- Text-based, version control friendly
- Renders in GitHub, VS Code, and documentation tools
- Easy to maintain and update
- No external tools required

## Common Diagram Types

### Flowchart

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

### Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Click button
    Frontend->>Backend: API request
    Backend->>Database: Query
    Database-->>Backend: Result
    Backend-->>Frontend: Response
    Frontend-->>User: Update UI
```

### Entity Relationship Diagram

```mermaid
erDiagram
    PROJECT ||--o{ ASSET : contains
    PROJECT {
        uuid id PK
        string name
        string description
        string status
    }
    ASSET {
        uuid id PK
        string name
        string type
        uuid projectId FK
    }
```

### Class Diagram

```mermaid
classDiagram
    class Project {
        +string id
        +string name
        +string description
        +Asset[] assets
        +create()
        +update()
        +delete()
    }
    class Asset {
        +string id
        +string name
        +AssetType type
        +string projectId
    }
    Project "1" --> "*" Asset
```

## VS Code Extensions

Install these extensions for better Mermaid support:

1. **Markdown Preview Mermaid Support** - Preview Mermaid in Markdown
2. **Mermaid Markdown Syntax Highlighting** - Syntax highlighting

## Best Practices

1. Keep diagrams simple and focused
2. Use consistent naming conventions
3. Add comments for complex logic
4. Store diagrams in Documentation folder
5. Reference diagrams in related documentation
