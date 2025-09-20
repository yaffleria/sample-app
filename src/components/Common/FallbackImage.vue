<script setup lang="ts">
  import { convertIconUrl } from '@/utils/imageFormat'

  interface Props {
    src: string
    alt: string
    class?: string
    loading?: 'lazy' | 'eager'
  }

  withDefaults(defineProps<Props>(), {
    class: 'object-contain',
    loading: 'lazy',
  })

  // Get all image format URLs for fallback
  const imageFormats = (src: string) => {
    return convertIconUrl(src)
  }
</script>

<template>
  <picture v-if="src">
    <source
      v-if="imageFormats(src).webp"
      :srcset="imageFormats(src).webp"
      type="image/webp"
    />
    <source
      v-if="imageFormats(src).png"
      :srcset="imageFormats(src).png"
      type="image/png"
    />
    <source
      v-if="imageFormats(src).jpg"
      :srcset="imageFormats(src).jpg"
      type="image/jpeg"
    />
    <img
      :src="src"
      :alt="alt"
      :class="$props.class"
      :loading="loading"
    />
  </picture>
</template>
