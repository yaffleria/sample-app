<template>
  <div class="flex items-center p-3 bg-white animate-pulse h-[72px]">
    <!-- Service Icon Skeleton -->
    <div class="bg-gray-200 rounded-lg mr-3 w-12 h-12 flex-shrink-0"></div>

    <!-- Service Info Skeleton -->
    <div class="flex-1 min-w-0">
      <!-- Service Name -->
      <div class="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
      <!-- Service Description -->
      <div class="bg-gray-200 rounded h-3 w-1/2"></div>
    </div>

    <!-- Action Button Skeleton -->
    <div class="flex items-center space-x-2 ml-3 flex-shrink-0">
      <div class="bg-gray-200 rounded w-8 h-8"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // No props needed for skeleton
</script>
