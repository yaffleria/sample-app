<template>
  <AlertWindow
    v-if="alertState.isVisible"
    :is-visible="alertState.isVisible"
    :title="alertState.title"
    :description="alertState.description"
    :cancel-text="alertState.cancelText"
    :confirm-text="alertState.confirmText"
    @confirm="confirmAlert"
    @cancel="cancelAlert"
    @close="hideAlert"
  />
</template>

<script setup lang="ts">
  import AlertWindow from './AlertWindow.vue'
  import { useAlert } from '@/composables/useAlert'

  const { alertState, confirmAlert, cancelAlert, hideAlert } = useAlert()
</script>
