<template>
  <svg
    :class="className"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    :aria-label="ariaHidden ? undefined : ariaLabel"
    :aria-hidden="ariaHidden"
    role="img"
    focusable="false"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</template>

<script setup lang="ts">
  interface Props {
    className?: string
    ariaLabel?: string
    ariaHidden?: boolean
  }

  withDefaults(defineProps<Props>(), {
    className: 'h-5 w-5',
    ariaLabel: 'Clear search',
    ariaHidden: false,
  })
</script>

<style scoped>
  /* ClearIcon component */
</style>
