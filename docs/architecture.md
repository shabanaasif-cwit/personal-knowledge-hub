# Personal Knowledge Hub - Architecture

## Overview
Frontend-only React application with file-based storage using localStorage.

## Core Concepts

### 1. State Management
- Uses React `useState` for component state
- Custom hook `useNotes` manages global note state
- Data flows unidirectionally through props

### 2. File Management
- **FileInitializer**: Creates initial file structure
- **FileReader**: Reads notes from localStorage
- **FileWriter**: Persists notes to localStorage

### 3. Component Structure
- Presentational components in `/components`
- Feature components in `/features`
- Pages in `/pages`

### 4. Data Flow
```
App → Dashboard → useNotes → FileManager → localStorage
```

### Component Hierarchy
    ```text
    App
    ├── Header (Navigation)
    ├── Sidebar (Routing & Navigation)
    └── Main Content Area
        ├── Dashboard (State & List Management)
        │   ├── NoteList (Displaying Hub Entries)
        │   ├── NoteViewer (Detailed View & Action Buttons)
        │   └── NoteEditor (Create/Edit Form with File Logic)
        ├── Contact (Hub Sync Interface)
        ├── Help (Documentation)
        └── Settings (Data & Profile Management)

    ## File Format (localStorage)
    ```json
    {
      "version": "1.0",
      "createdAt": "2024-01-20T10:00:00Z",
      "updatedAt": "2024-01-20T10:05:00Z",
      "notes": [
        {
          "id": 1234567890,
          "title": "Note Title",
          "content": "Note content...",
          "createdAt": "2024-01-20T10:00:00Z",
          "updatedAt": "2024-01-20T10:00:00Z"
        }
      ]
    }
    ```