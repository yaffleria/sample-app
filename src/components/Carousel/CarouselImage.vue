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
    class="block w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
    :aria-label="`${alt} (opens in new tab)`"
  >
    <img
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover cursor-pointer"
      loading="lazy"
      decoding="async"
    />
  </a>

  <!-- Non-clickable image variant -->
  <img
    v-else
    :src="src"
    :alt="alt"
    class="w-full h-full object-cover"
    loading="lazy"
    decoding="async"
  />
</template>
