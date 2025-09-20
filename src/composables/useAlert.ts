import { reactive, readonly } from 'vue'

export interface AlertOptions {
  title?: string
  description?: string
  cancelText?: string
  confirmText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

export interface AlertState {
  isVisible: boolean
  title: string
  description: string
  cancelText: string
  confirmText: string
  onConfirm: (() => void | Promise<void>) | null
  onCancel: (() => void | Promise<void>) | null
}

// Global alert state - single instance shared across the app
const alertState = reactive<AlertState>({
  isVisible: false,
  title: '',
  description: '',
  cancelText: '',
  confirmText: '',
  onConfirm: null,
  onCancel: null,
})

export function useAlert() {
  const showAlert = (options: AlertOptions) => {
    alertState.isVisible = true
    alertState.title = options.title || ''
    alertState.description = options.description || ''
    alertState.cancelText = options.cancelText || ''
    alertState.confirmText = options.confirmText || ''
    alertState.onConfirm = options.onConfirm || null
    alertState.onCancel = options.onCancel || null
  }

  const hideAlert = () => {
    alertState.isVisible = false
    alertState.title = ''
    alertState.description = ''
    alertState.cancelText = ''
    alertState.confirmText = ''
    alertState.onConfirm = null
    alertState.onCancel = null
  }

  const confirmAlert = async () => {
    if (alertState.onConfirm) {
      await alertState.onConfirm()
    }
    hideAlert()
  }

  const cancelAlert = async () => {
    if (alertState.onCancel) {
      await alertState.onCancel()
    }
    hideAlert()
  }

  return {
    // Reactive state
    alertState: readonly(alertState),

    // Actions
    showAlert,
    hideAlert,
    confirmAlert,
    cancelAlert,
  }
}
