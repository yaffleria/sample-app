<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useQuery } from '@tanstack/vue-query'
  import getBannerList from '@/api/helper/getBannerList'
  import { computed } from 'vue'
  import type { LocalizedText, Banner } from '@/types/discovery'
  import type { AxiosResponse } from 'axios'

  const { t, locale } = useI18n()
  const currentLocale = computed(() => locale.value as LocalizedText)

  const {
    isLoading: isLoadingBannerList,
    isError: isErrorBannerList,
    data: bannerResponse,
    error,
  } = useQuery<AxiosResponse<Banner[]>>({
    queryKey: ['banners'],
    queryFn: () => getBannerList(),
  })

  const banners = computed(() => bannerResponse.value?.data)
</script>
<template>
  <!-- 메인 컨테이너: 100dvh로 전체 높이, 모바일 퍼스트 -->
  <div class="min-h-[100dvh] bg-gray-50 flex flex-col items-center">
    <!-- 상단 배너 섹션 -->
    <section class="w-full mb-6">
      <div v-if="isLoadingBannerList">Loading banners...</div>
      <div v-else-if="isErrorBannerList">An error occurred: {{ error?.message }}</div>
      <div v-else-if="banners">
        <div
          v-for="banner in banners"
          :key="banner.name"
        >
          <a :href="banner.ctaLinkUrl[currentLocale]">
            <img
              :src="banner.imageUrl[currentLocale]"
              :alt="banner.description[currentLocale]"
            />
          </a>
        </div>
      </div>
    </section>

    <!-- 즐겨찾기 리스트 섹션 -->
    <section class="w-full mb-6 bg-white rounded-lg shadow-sm">
      {{ t('favorites') }}
    </section>

    <!-- 서비스 리스트 섹션 -->
    <section class="w-full flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
      {{ t('services') }}
    </section>
  </div>
</template>
