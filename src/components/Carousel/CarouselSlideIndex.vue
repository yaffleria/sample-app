<script setup lang="ts">
  interface Props {
    currentSlide: number
    totalSlides: number
  }

  defineProps<Props>()
</script>

<template>
  <div
    class="absolute bottom-4 right-4 text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded"
    role="status"
    :aria-label="`Slide ${currentSlide} of ${totalSlides}`"
    aria-live="polite"
  >
    <span aria-hidden="true">{{ currentSlide }}/{{ totalSlides }}</span>
  </div>
</template>
