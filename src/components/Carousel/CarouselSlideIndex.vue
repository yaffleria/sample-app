<script setup lang="ts">
  interface Props {
    currentSlide: number
    totalSlides: number
  }

  defineProps<Props>()
</script>

<template>
  <div class="absolute bottom-4 right-4 text-white text-sm font-medium bg-opacity-50 px-2 py-1 rounded">
    {{ currentSlide }}/{{ totalSlides }}
  </div>
</template>
