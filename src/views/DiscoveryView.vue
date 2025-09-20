<script setup lang="ts">
  import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
  import getBannerList from '@/api/helper/getBannerList'
  import getServiceList from '@/api/helper/getServiceList'
  import { computed, watch } from 'vue'
  import type { BannerListItem } from '@/types/banner'
  import type { ServiceListItem } from '@/types/service'
  import type { PaginatedResponse } from '@/types/api'
  import type { AxiosResponse } from 'axios'
  import CarouselContainer from '@/components/Carousel/CarouselContainer.vue'
  import CarouselSkeleton from '@/components/Carousel/CarouselSkeleton.vue'
  import { FavoriteListContainer, ServiceListContainer } from '@/components/List'
  import { useServiceListStore } from '@/stores/serviceList'

  const serviceListStore = useServiceListStore()

  const {
    isLoading: isLoadingBannerList,
    isError: isErrorBannerList,
    data: bannerResponse,
    error,
  } = useQuery<AxiosResponse<BannerListItem[]>>({
    queryKey: ['banners'],
    queryFn: () => getBannerList(),
  })

  const {
    data: servicesInfiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingServices,
  } = useInfiniteQuery({
    queryKey: ['services'],
    queryFn: ({ pageParam = 1 }) => getServiceList(pageParam as number, 3),
    getNextPageParam: (lastPage: AxiosResponse<PaginatedResponse<ServiceListItem>>) => {
      const pagination = lastPage.data.pagination
      return pagination.hasNextPage ? pagination.page + 1 : undefined
    },
    initialPageParam: 1,
  })

  const bannerData = computed(() => bannerResponse.value?.data || [])

  const allServices = computed(() => {
    if (!servicesInfiniteData.value) return []
    return servicesInfiniteData.value.pages.flatMap(
      (page: AxiosResponse<PaginatedResponse<ServiceListItem>>) => page.data.data
    )
  })

  // Watch for services data and update store when available
  watch(
    allServices,
    (newServices) => {
      if (newServices.length > 0) {
        // Set initial services if store is empty, otherwise append
        if (serviceListStore.services.length === 0) {
          serviceListStore.setServices(newServices)
        } else {
          // Find new services that aren't already in the store
          const existingIds = new Set(serviceListStore.services.map((s) => s.id))
          const newUniqueServices = newServices.filter((s) => !existingIds.has(s.id))
          if (newUniqueServices.length > 0) {
            serviceListStore.appendServices(newUniqueServices)
          }
        }

        // Update pagination state
        const lastPage = servicesInfiniteData.value?.pages[servicesInfiniteData.value.pages.length - 1] as
          | AxiosResponse<PaginatedResponse<ServiceListItem>>
          | undefined
        if (lastPage) {
          serviceListStore.setHasNextPage(lastPage.data.pagination.hasNextPage)
          serviceListStore.setCurrentPage(lastPage.data.pagination.page)
        }
      }
    },
    { immediate: true }
  )

  // Update loading state in store
  watch(
    isFetchingNextPage,
    (loading) => {
      serviceListStore.setIsLoadingMore(loading)
    },
    { immediate: true }
  )

  // Provide fetchMore function to child components
  const handleFetchMore = () => {
    console.log('handleFetchMore called', {
      hasNextPage: hasNextPage.value,
      isFetchingNextPage: isFetchingNextPage.value,
    })
    if (hasNextPage.value && !isFetchingNextPage.value) {
      console.log('Calling fetchNextPage')
      fetchNextPage()
    } else {
      console.log('Cannot fetch next page')
    }
  }
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

    <!-- 콘텐츠 영역: 즐겨찾기와 서비스 리스트 -->
    <div class="w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6 flex-1 pb-6">
      <!-- 즐겨찾기 리스트 섹션 -->
      <section class="w-full lg:w-1/3 min-w-0">
        <FavoriteListContainer />
      </section>

      <!-- 서비스 리스트 섹션 -->
      <section class="w-full lg:w-2/3 min-w-0">
        <ServiceListContainer
          :fetch-more="handleFetchMore"
          :is-loading-services="isLoadingServices"
        />
      </section>
    </div>
  </div>
</template>
