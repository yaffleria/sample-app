<script setup lang="ts">
  interface Props {
    description: string
  }

  defineProps<Props>()
</script>

<template>
  <div
    v-if="description"
    class="absolute top-6 left-4 text-white text-lg font-medium bg-opacity-50 px-3 py-2 rounded max-w-xs"
  >
    {{ description }}
  </div>
</template>
