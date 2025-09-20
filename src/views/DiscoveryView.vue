<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useQuery } from '@tanstack/vue-query'
  import getBannerList from '@/api/helper/getBannerList'
  import { computed } from 'vue'
  import type { Banner } from '@/types/discovery'
  import type { AxiosResponse } from 'axios'
  import CarouselContainer from '@/components/Carousel/CarouselContainer.vue'
  import CarouselSkeleton from '@/components/Carousel/CarouselSkeleton.vue'

  const { t } = useI18n()

  const {
    isLoading: isLoadingBannerList,
    isError: isErrorBannerList,
    data: bannerResponse,
    error,
  } = useQuery<AxiosResponse<Banner[]>>({
    queryKey: ['banners'],
    queryFn: () => getBannerList(),
  })

  const bannerData = computed(() => bannerResponse.value?.data || [])
</script>
<template>
  <!-- 메인 컨테이너: 100dvh로 전체 높이, 모바일 퍼스트 -->
  <div class="min-h-[100dvh] bg-gray-50 flex flex-col items-center">
    <!-- 상단 배너 섹션 -->
    <section class="w-full mb-6">
      <!-- Show skeleton while loading -->
      <CarouselSkeleton v-if="isLoadingBannerList" />
      <!-- Show error message if loading failed -->
      <div
        v-else-if="isErrorBannerList"
        class="w-full aspect-[16/9] bg-red-50 border border-red-200 rounded-lg flex items-center justify-center"
      >
        <p class="text-red-600">{{ error?.message || 'Failed to load banners' }}</p>
      </div>
      <!-- Show carousel when data is loaded -->
      <CarouselContainer
        v-else
        :banners="bannerData"
      />
    </section>

    <!-- 즐겨찾기 리스트 섹션 -->
    <section class="w-full mb-6 bg-white rounded-lg shadow-sm">
      {{ t('dapp_favorite_title') }}
    </section>

    <!-- 서비스 리스트 섹션 -->
    <section class="w-full flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
      {{ t('go_to_dapp') }}
    </section>
  </div>
</template>
