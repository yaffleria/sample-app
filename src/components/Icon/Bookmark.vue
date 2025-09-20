<script setup lang="ts">
  defineOptions({
    name: 'IconBookmark',
  })

  interface Props {
    class?: string
    fill?: string
    stroke?: string
    ariaLabel?: string
    ariaHidden?: boolean
  }

  withDefaults(defineProps<Props>(), {
    class: 'w-5 h-5',
    fill: 'currentColor',
    stroke: 'currentColor',
    ariaLabel: 'Bookmark',
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
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  </svg>
</template>
