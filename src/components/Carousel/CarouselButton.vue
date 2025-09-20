<script setup lang="ts">
  interface Props {
    href: string
    text: string
  }

  defineProps<Props>()
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="absolute bottom-4 left-4 bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-full transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    :aria-label="`${text} (opens in new tab)`"
  >
    {{ text }}
  </a>
</template>
