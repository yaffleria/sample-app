<template>
  <RouterView />
  <AlertProvider />
  <BottomSheetProvider />
</template>

<script setup lang="ts">
  import { AlertProvider } from '@/components/Common'
  import { BottomSheetProvider } from '@/components/Common'
</script>
