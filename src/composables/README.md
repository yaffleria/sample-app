# Composables

This folder contains Vue 3 composables for reusable logic across the application.

## Available Composables

### `useAlert`

Global alert management system for showing confirmation dialogs and alerts.

**Features:**

- Global state management
- Performance optimized (single instance)
- TypeScript support
- Async operation support
- i18n integration

**Usage:**

```typescript
import { useAlert } from '@/composables/useAlert'

const { showAlert } = useAlert()

showAlert({
  title: 'Confirm Action',
  description: 'Are you sure?',
  onConfirm: () => console.log('Confirmed'),
  onCancel: () => console.log('Cancelled'),
})
```

## Adding New Composables

1. Create a new file in this directory (e.g., `useMyComposable.ts`)
2. Implement your composable following Vue 3 composition API patterns
3. Export it from `index.ts`
4. Add documentation

### Composable Guidelines

- Use TypeScript for type safety
- Follow the `use*` naming convention
- Return reactive state and methods as an object
- Include proper TypeScript interfaces
- Add JSDoc comments for better IDE support
- Handle cleanup if needed (onUnmounted, etc.)

### Example Structure

```typescript
import { ref, computed } from 'vue'

export interface MyComposableOptions {
  // Define options interface
}

export function useMyComposable(options?: MyComposableOptions) {
  // Reactive state
  const state = ref(initialState)

  // Computed properties
  const computedValue = computed(() => state.value.something)

  // Methods
  const doSomething = () => {
    // Implementation
  }

  // Cleanup if needed
  onUnmounted(() => {
    // Cleanup logic
  })

  return {
    // Expose reactive state and methods
    state: readonly(state),
    computedValue,
    doSomething,
  }
}
```
