<template>
  <RouterView />
  <AlertProvider />
</template>

<script setup lang="ts">
  import { AlertProvider } from '@/components/Common'
</script>
