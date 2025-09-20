<template>
  <div class="space-y-3">
    <div
      v-for="n in count"
      :key="n"
      class="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 animate-pulse"
    >
      <!-- Icon placeholder -->
      <div class="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>

      <!-- Content placeholder -->
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <div class="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
        <!-- Description -->
        <div class="h-4 bg-gray-200 rounded mb-1 w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        <!-- Tags -->
        <div class="flex gap-2 mt-2">
          <div class="h-3 bg-gray-200 rounded w-16"></div>
          <div class="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      <!-- Star icon placeholder -->
      <div class="w-6 h-6 bg-gray-200 rounded flex-shrink-0"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    count?: number
  }

  withDefaults(defineProps<Props>(), {
    count: 3,
  })
</script>
