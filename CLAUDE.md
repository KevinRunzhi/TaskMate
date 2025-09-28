# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start Metro bundler
npm start

# Run on platforms
npm run android        # Android device/emulator
npm run ios           # iOS device/simulator

# Code quality
npm run lint          # ESLint checks
npm run typecheck     # TypeScript type checking
npm test             # Run Jest tests
```

## Architecture Overview

TaskMate is a React Native 0.73 task management app using TypeScript with a modern architecture:

### State Management
- **Primary Store**: Zustand store in `src/store/taskStore.ts` with comprehensive task operations
- **Hook Layer**: `src/hooks/useTasks.ts` provides persistence integration and async operations
- **Persistence**: AsyncStorage via `src/services/taskService.ts` with JSON serialization

### Data Flow
```
UI Components → useTasks Hook → TaskStore (Zustand) → TaskService → AsyncStorage
```

The `useTasks` hook bridges UI and store, handling:
- Automatic data loading on mount
- Persistence after state changes
- Error handling and loading states
- Data import/export functionality

### Core Types
Located in `src/types/index.ts`:
- `Task`: Main entity with priority, status, dates, and metadata
- `Priority`: LOW | MEDIUM | HIGH | URGENT
- `TaskStatus`: PENDING | IN_PROGRESS | COMPLETED
- `TaskFilter`: Search and filtering interface

### Path Aliases
TypeScript paths configured for clean imports:
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/store/*` → `src/store/*`
- `@/types/*` → `src/types/*`
- `@/utils/*` → `src/utils/*`

## Component Architecture

### Component Organization
- **Task Components**: TaskItem, TaskList - core task display
- **Priority Components**: PrioritySelector, PriorityIndicator, PriorityFilter, PriorityStats
- **UI Components**: SearchBar, StatsCard, FloatingActionButton
- **Export**: All components exported via `src/components/index.ts`

### State Management Pattern
Components use the `useTasks` hook rather than direct store access:
```typescript
const { tasks, createTask, updateTask, deleteTask, getStats } = useTasks();
```

## Key Technical Details

### Date Handling
- All dates stored as Date objects in memory
- JSON serialization/deserialization handled in TaskService
- Uses date-fns for formatting (constants in `src/utils/constants.ts`)

### Priority System
Four-level priority with color coding:
- LOW: Green (#34C759)
- MEDIUM: Orange (#FF9500)
- HIGH: Red (#FF3B30)
- URGENT: Purple (#AF52DE)

### Task Status Flow
Linear progression: PENDING → IN_PROGRESS → COMPLETED
- `toggleTaskStatus()` cycles through states
- `completeTask()` directly sets to COMPLETED

### Persistence Strategy
- Automatic save after all mutations
- Load on app initialization
- Import/export functionality for data portability
- Error handling with user-friendly messages

## Development Patterns

### Creating New Features
1. Define types in `src/types/index.ts` if needed
2. Add store methods to `taskStore.ts`
3. Extend `useTasks` hook for async operations
4. Create UI components following existing patterns
5. Export components via `src/components/index.ts`

### Testing Strategy
- Component testing with React Test Renderer
- Hook testing for business logic
- Service layer testing for persistence

### Error Handling
- Store methods update error state
- useTasks hook catches and formats errors
- UI components should display error states from hook