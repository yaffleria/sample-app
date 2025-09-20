<template>
  <BottomSheet
    v-if="bottomSheetState.isVisible"
    :is-visible="bottomSheetState.isVisible"
    :service="bottomSheetState.service"
    @close="hideBottomSheet"
    @go="openServiceUrl"
  />
</template>

<script setup lang="ts">
  import BottomSheet from './BottomSheet.vue'
  import { useBottomSheet } from '@/composables/useBottomSheet'

  const { bottomSheetState, hideBottomSheet, openServiceUrl } = useBottomSheet()
</script>
