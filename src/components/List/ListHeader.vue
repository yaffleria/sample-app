<script setup lang="ts">
  interface Props {
    title: string
    count: number
  }

  defineProps<Props>()
</script>

<template>
  <header class="p-4 border-b border-gray-200">
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-md font-semibold text-gray-900">{{ title }}</h2>
      <span
        class="text-sm text-gray-500"
        role="status"
        :aria-label="`${count} items found`"
      >
        {{ count }}
      </span>
    </div>
  </header>
</template>
