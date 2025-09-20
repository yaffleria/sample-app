<script setup lang="ts">
  interface Props {
    title: string
    count: number
  }

  defineProps<Props>()
</script>

<template>
  <div class="p-4 border-b border-gray-200">
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-md font-semibold text-gray-900">{{ title }}</h2>
      <span class="text-sm text-gray-500">{{ count }}</span>
    </div>
  </div>
</template>
