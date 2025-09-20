<template>
  <div class="relative w-full">
    <!-- Skeleton carousel container with same dimensions -->
    <div class="w-full aspect-[16/9] bg-gray-200 rounded-lg animate-pulse">
      <!-- Skeleton image -->
      <div
        class="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"
      ></div>

      <!-- Skeleton button -->
      <div class="absolute bottom-4 left-4 w-24 h-10 bg-gray-300 rounded animate-pulse"></div>
    </div>
  </div>
</template>

<style scoped>
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
</style>
