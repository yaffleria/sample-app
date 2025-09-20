<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay } from 'swiper/modules'
  import 'swiper/css'
  import type { BannerListItem } from '@/types/banner'
  import type { LocalizedText } from '@/types/common'
  import { useI18n } from 'vue-i18n'
  import { computed, ref } from 'vue'
  import CarouselSlide from './CarouselSlide.vue'

  const props = defineProps<{
    banners: BannerListItem[]
  }>()

  const { locale } = useI18n()
  const currentLocale = computed(() => locale.value as LocalizedText)
  const currentSlideIndex = ref(0)

  const modules = [Autoplay]

  const onSlideChange = (swiper: { realIndex: number }) => {
    currentSlideIndex.value = swiper.realIndex
  }
</script>
<template>
  <section
    role="region"
    aria-label="Banner carousel"
    aria-live="polite"
    aria-atomic="true"
  >
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="24"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      @slide-change="onSlideChange"
      aria-label="Banner slideshow"
    >
      <swiper-slide
        v-for="(banner, index) in props.banners"
        :key="banner.name"
        role="group"
        :aria-label="`Slide ${index + 1} of ${props.banners.length}`"
        :aria-roledescription="'slide'"
      >
        <CarouselSlide
          :banner="banner"
          :current-locale="currentLocale"
          :current-slide="currentSlideIndex + 1"
          :total-slides="props.banners.length"
        />
      </swiper-slide>
    </swiper>
  </section>
</template>
