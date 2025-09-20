<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }"
    @click="handleBackdropClick"
    @touchmove.prevent
    @wheel.prevent
    role="dialog"
    aria-modal="true"
    :aria-labelledby="title ? 'alert-title' : undefined"
    :aria-describedby="description ? 'alert-description' : undefined"
  >
    <!-- Alert window -->
    <div
      class="relative bg-white rounded-lg shadow-2xl max-w-xs w-full mx-4 p-4"
      @click.stop
      role="alertdialog"
    >
      <!-- Title -->
      <h2
        v-if="title"
        id="alert-title"
        class="text-base font-semibold text-gray-900 mb-3 text-center"
      >
        {{ title }}
      </h2>

      <!-- Dotted divider -->
      <div
        v-if="title && description"
        class="border-t border-dashed border-gray-300 mb-3"
        aria-hidden="true"
      ></div>

      <!-- Description -->
      <p
        v-if="description"
        id="alert-description"
        class="text-sm text-gray-600 mb-4 text-center leading-relaxed"
      >
        {{ description }}
      </p>

      <!-- Buttons -->
      <div
        class="flex space-x-2"
        role="group"
        aria-label="Alert actions"
      >
        <button
          @click="handleCancel"
          class="flex-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="button"
          :aria-label="`${cancelText || t('button_cancel')} - Cancel action`"
        >
          {{ cancelText || t('button_cancel') }}
        </button>
        <button
          @click="handleConfirm"
          class="flex-1 px-3 py-2 ml-1 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="button"
          :aria-label="`${confirmText || t('button_confirm')} - Confirm action`"
          ref="confirmButtonRef"
        >
          {{ confirmText || t('button_confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { watch, onUnmounted } from 'vue'

  interface Props {
    isVisible: boolean
    title?: string
    description?: string
    cancelText?: string
    confirmText?: string
  }

  interface Emits {
    (e: 'cancel'): void
    (e: 'confirm'): void
    (e: 'close'): void
  }

  const props = withDefaults(defineProps<Props>(), {
    isVisible: false,
    title: '',
    description: '',
    cancelText: '',
    confirmText: '',
  })
  const emit = defineEmits<Emits>()
  const { t } = useI18n()

  // Body scroll management
  let originalOverflow = ''
  let originalPaddingRight = ''

  const preventBodyScroll = () => {
    const body = document.body
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    originalOverflow = body.style.overflow
    originalPaddingRight = body.style.paddingRight

    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollBarWidth}px`
  }

  const restoreBodyScroll = () => {
    const body = document.body
    body.style.overflow = originalOverflow
    body.style.paddingRight = originalPaddingRight
  }

  // Watch for visibility changes
  watch(
    () => props.isVisible,
    (newVisible) => {
      if (newVisible) {
        preventBodyScroll()
      } else {
        restoreBodyScroll()
      }
    },
    { immediate: true }
  )

  // Cleanup on unmount
  onUnmounted(() => {
    if (props.isVisible) {
      restoreBodyScroll()
    }
  })

  const handleCancel = () => {
    emit('cancel')
    emit('close')
  }

  const handleConfirm = () => {
    emit('confirm')
    emit('close')
  }

  const handleBackdropClick = () => {
    emit('cancel')
    emit('close')
  }
</script>

<style scoped>
  /* Additional styles for smooth transitions */
  .fixed {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .relative.bg-white {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
