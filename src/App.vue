<template>
  <main
    id="main-content"
    role="main"
    tabindex="-1"
  >
    <RouterView />
  </main>
  <AlertProvider />
  <BottomSheetProvider />
</template>

<script setup lang="ts">
  import { AlertProvider } from '@/components/Common'
  import { BottomSheetProvider } from '@/components/Common'
</script>
