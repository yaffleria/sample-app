<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay } from 'swiper/modules'
  import 'swiper/css'
  import type { Banner, LocalizedText } from '@/types/discovery'
  import { useI18n } from 'vue-i18n'
  import { computed, ref } from 'vue'
  import CarouselSlide from './CarouselSlide.vue'

  const props = defineProps<{
    banners: Banner[]
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
  >
    <swiper-slide
      v-for="banner in props.banners"
      :key="banner.name"
    >
      <CarouselSlide
        :banner="banner"
        :current-locale="currentLocale"
        :current-slide="currentSlideIndex + 1"
        :total-slides="props.banners.length"
      />
    </swiper-slide>
  </swiper>
</template>
