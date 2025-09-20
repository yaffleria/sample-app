# Alert System

A performance-optimized alert system using composables that only renders the AlertWindow when needed.

## Architecture

The alert system consists of:

- **`useAlert` composable**: Global state management for alerts
- **`AlertProvider` component**: Single instance that renders alerts
- **`AlertWindow` component**: The actual alert UI component

## Performance Benefits

✅ **Single Instance**: Only one AlertWindow is rendered globally, regardless of how many components use alerts
✅ **Conditional Rendering**: AlertWindow is only rendered when `isVisible` is true
✅ **Memory Efficient**: No multiple alert components in the DOM
✅ **Centralized State**: Shared alert state across the entire application

## Usage

### 1. Basic Usage

```vue
<template>
  <button @click="showDeleteConfirmation">Delete Item</button>
</template>

<script setup lang="ts">
  import { useAlert } from '@/composables/useAlert'

  const { showAlert } = useAlert()

  const showDeleteConfirmation = () => {
    showAlert({
      title: 'Delete Confirmation',
      description: 'Are you sure you want to delete this item?',
      onConfirm: () => {
        console.log('Item deleted')
        // Perform delete action
      },
      onCancel: () => {
        console.log('Delete cancelled')
      },
    })
  }
</script>
```

### 2. With i18n

```vue
<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useAlert } from '@/composables/useAlert'

  const { t } = useI18n()
  const { showAlert } = useAlert()

  const showLocalizedAlert = () => {
    showAlert({
      title: t('confirm_delete_title'),
      description: t('confirm_delete_message'),
      onConfirm: async () => {
        // Async operations supported
        await deleteItem()
      },
    })
  }
</script>
```

### 3. Custom Button Text

```vue
<script setup lang="ts">
  import { useAlert } from '@/composables/useAlert'

  const { showAlert } = useAlert()

  const showCustomAlert = () => {
    showAlert({
      title: 'Save Changes?',
      description: 'You have unsaved changes. Would you like to save them?',
      confirmText: 'Save',
      cancelText: 'Discard',
      onConfirm: () => saveChanges(),
      onCancel: () => discardChanges(),
    })
  }
</script>
```

## API Reference

### `useAlert()` Composable

Returns an object with the following properties and methods:

#### Properties

- `alertState` (readonly): Current alert state object

#### Methods

- `showAlert(options: AlertOptions)`: Show an alert with the given options
- `hideAlert()`: Hide the current alert
- `confirmAlert()`: Trigger confirm action and hide alert
- `cancelAlert()`: Trigger cancel action and hide alert

### `AlertOptions` Interface

```typescript
interface AlertOptions {
  title?: string
  description?: string
  cancelText?: string
  confirmText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}
```

### `AlertState` Interface

```typescript
interface AlertState {
  isVisible: boolean
  title: string
  description: string
  cancelText: string
  confirmText: string
  onConfirm: (() => void | Promise<void>) | null
  onCancel: (() => void | Promise<void>) | null
}
```

## Setup

The alert system is automatically set up in `App.vue` with the `AlertProvider` component:

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <AlertProvider />
</template>

<script setup lang="ts">
  import { AlertProvider } from '@/components/Common'
</script>
```

## Migration from Local AlertWindow

**Before** (local AlertWindow):

```vue
<template>
  <div>
    <button @click="showAlert = true">Show Alert</button>

    <AlertWindow
      :is-visible="showAlert"
      title="Confirm"
      description="Are you sure?"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { AlertWindow } from '@/components/Common'

  const showAlert = ref(false)

  const handleConfirm = () => {
    // logic
    showAlert.value = false
  }

  const handleCancel = () => {
    showAlert.value = false
  }
</script>
```

**After** (with useAlert composable):

```vue
<template>
  <div>
    <button @click="showDeleteAlert">Show Alert</button>
  </div>
</template>

<script setup lang="ts">
  import { useAlert } from '@/composables/useAlert'

  const { showAlert } = useAlert()

  const showDeleteAlert = () => {
    showAlert({
      title: 'Confirm',
      description: 'Are you sure?',
      onConfirm: () => {
        // logic
      },
      onCancel: () => {
        // optional cancel logic
      },
    })
  }
</script>
```

## Benefits of Migration

1. **Less Boilerplate**: No need to manage local state or import AlertWindow
2. **Better Performance**: Single alert instance for the entire app
3. **Cleaner Templates**: No alert components cluttering your templates
4. **Consistent UX**: Standardized alert behavior across the application
5. **Type Safety**: Full TypeScript support with proper interfaces
