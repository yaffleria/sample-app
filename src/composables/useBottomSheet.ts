import { reactive } from 'vue'
import type { ServiceListItem } from '@/types/service'

export interface BottomSheetOptions {
  service: ServiceListItem
  onClose?: () => void
}

export interface BottomSheetState {
  isVisible: boolean
  service: ServiceListItem | null
  onClose: (() => void) | null
}

// Global bottom sheet state - single instance shared across the app
const bottomSheetState = reactive<BottomSheetState>({
  isVisible: false,
  service: null,
  onClose: null,
})

export function useBottomSheet() {
  const showBottomSheet = (options: BottomSheetOptions) => {
    bottomSheetState.isVisible = true
    bottomSheetState.service = options.service
    bottomSheetState.onClose = options.onClose || null
  }

  const hideBottomSheet = () => {
    if (bottomSheetState.onClose) {
      bottomSheetState.onClose()
    }
    bottomSheetState.isVisible = false
    bottomSheetState.service = null
    bottomSheetState.onClose = null
  }

  const openServiceUrl = () => {
    if (bottomSheetState.service?.serviceUrl) {
      window.open(bottomSheetState.service.serviceUrl, '_blank', 'noopener,noreferrer')
    }
    hideBottomSheet()
  }

  return {
    // Reactive state
    bottomSheetState,

    // Actions
    showBottomSheet,
    hideBottomSheet,
    openServiceUrl,
  }
}
