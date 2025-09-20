<script setup lang="ts">
  interface Props {
    title: string
    count: number
  }

  defineProps<Props>()
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-md font-semibold text-gray-900">{{ title }}</h2>
      <span class="text-sm text-gray-500">{{ count }}</span>
    </div>
  </div>
</template>
