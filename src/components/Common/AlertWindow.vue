<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center"
    @click="handleBackdropClick"
  >
    <!-- Background overlay with shadow -->
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

    <!-- Alert window -->
    <div
      class="relative bg-white rounded-lg shadow-2xl max-w-sm w-full mx-4 p-6"
      @click.stop
    >
      <!-- Title -->
      <h2
        v-if="title"
        class="text-lg font-semibold text-gray-900 mb-4 text-center"
      >
        {{ title }}
      </h2>

      <!-- Description -->
      <p
        v-if="description"
        class="text-gray-600 mb-6 text-center leading-relaxed"
      >
        {{ description }}
      </p>

      <!-- Buttons -->
      <div class="flex space-x-3">
        <button
          @click="handleCancel"
          class="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
        >
          {{ cancelText || t('button_cancel') }}
        </button>
        <button
          @click="handleConfirm"
          class="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium"
        >
          {{ confirmText || t('button_confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

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

  withDefaults(defineProps<Props>(), {
    isVisible: false,
    title: '',
    description: '',
    cancelText: '',
    confirmText: '',
  })
  const emit = defineEmits<Emits>()
  const { t } = useI18n()

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
