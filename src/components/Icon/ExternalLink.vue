<script setup lang="ts">
  defineOptions({
    name: 'IconExternalLink',
  })

  interface Props {
    class?: string
    fill?: string
    stroke?: string
    ariaLabel?: string
    ariaHidden?: boolean
  }

  withDefaults(defineProps<Props>(), {
    class: 'w-4 h-4',
    fill: 'none',
    stroke: 'currentColor',
    ariaLabel: 'External link',
    ariaHidden: false,
  })
</script>

<template>
  <svg
    :class="$props.class"
    :fill="fill"
    :stroke="stroke"
    viewBox="0 0 24 24"
    :aria-label="ariaHidden ? undefined : ariaLabel"
    :aria-hidden="ariaHidden"
    role="img"
    focusable="false"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
</template>
