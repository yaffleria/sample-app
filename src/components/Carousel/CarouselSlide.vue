<script setup lang="ts">
  import { computed } from 'vue'
  import type { Banner, LocalizedText } from '@/types/discovery'
  import CarouselImage from './CarouselImage.vue'
  import CarouselButton from './CarouselButton.vue'
  import CarouselSlideIndex from './CarouselSlideIndex.vue'
  import CarouselDescription from './CarouselDescription.vue'

  interface Props {
    banner: Banner
    currentLocale: LocalizedText
    currentSlide: number
    totalSlides: number
  }

  const props = defineProps<Props>()

  // Check if button text exists for current locale
  const hasButtonText = computed(() => {
    return Boolean(props.banner.ctaButtonText[props.currentLocale])
  })
</script>

<template>
  <div class="relative w-full aspect-[16/9]">
    <!-- Image component handles both clickable and non-clickable variants -->
    <CarouselImage
      :src="banner.imageUrl[currentLocale]"
      :alt="banner.description[currentLocale]"
      :href="banner.ctaLinkUrl[currentLocale]"
      :is-clickable="!hasButtonText"
    />

    <!-- Description in top-left corner -->
    <CarouselDescription :description="banner.description[currentLocale]" />

    <!-- Show button only if button text exists -->
    <CarouselButton
      v-if="hasButtonText"
      :href="banner.ctaLinkUrl[currentLocale]"
      :text="banner.ctaButtonText[currentLocale]"
    />

    <!-- Slide index counter -->
    <CarouselSlideIndex
      :current-slide="currentSlide"
      :total-slides="totalSlides"
    />
  </div>
</template>
