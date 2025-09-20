<script setup lang="ts">
  interface Props {
    src: string
    alt: string
    href?: string
    isClickable?: boolean
  }

  defineProps<Props>()
</script>

<template>
  <!-- Clickable image variant -->
  <a
    v-if="isClickable && href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="block w-full h-full"
  >
    <img
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover cursor-pointer"
    />
  </a>

  <!-- Non-clickable image variant -->
  <img
    v-else
    :src="src"
    :alt="alt"
    class="w-full h-full object-cover"
  />
</template>
