<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useQuery } from '@tanstack/vue-query'
  import getFavoriteList from '@/api/helper/getFavoriteList'
  import FavoriteListItem from './FavoriteListItem.vue'
  import FavoriteListSkeleton from './FavoriteListSkeleton.vue'
  import ListHeader from '../ListHeader.vue'
  import type { ServiceListItem } from '@/types/service'
  import type { AxiosResponse } from 'axios'

  const { t } = useI18n()

  // React Query로 즐겨찾기 데이터 가져오기
  const {
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
    data: favoritesResponse,
    error: favoritesError,
  } = useQuery<AxiosResponse<ServiceListItem[]>>({
    queryKey: ['favorites'],
    queryFn: () => getFavoriteList(),
  })

  const favoriteServices = computed(() => favoritesResponse.value?.data || [])
  const favoriteCount = computed(() => favoriteServices.value.length)

  const handleRemoveFromFavorites = (serviceName: string) => {
    // TODO: 향후 DELETE API 호출로 즐겨찾기에서 제거
    console.log('Remove from favorites:', serviceName)
    // 현재는 실제 삭제 API가 없으므로 로그만 출력
  }

  const handleOpenService = (service: ServiceListItem) => {
    window.open(service.serviceUrl, '_blank', 'noopener,noreferrer')
  }
</script>

<template>
  <div class="bg-white">
    <!-- Header -->
    <ListHeader
      :title="t('dapp_favorite_title')"
      :count="favoriteCount"
    />

    <!-- Content -->
    <div class="p-4">
      <!-- Loading State with Skeleton -->
      <div
        v-if="isLoadingFavorites"
        class="space-y-3"
      >
        <FavoriteListSkeleton
          v-for="n in 3"
          :key="n"
        />
      </div>

      <!-- Error State -->
      <div
        v-else-if="isErrorFavorites"
        class="text-center py-8 text-red-500 text-sm"
      >
        {{ favoritesError?.message || 'Failed to load favorites' }}
      </div>

      <!-- Favorite Services List -->
      <div
        v-else
        class="space-y-3"
      >
        <FavoriteListItem
          v-for="service in favoriteServices"
          :key="service.name"
          :service="service"
          @remove-from-favorites="handleRemoveFromFavorites"
          @open-service="handleOpenService"
        />

        <!-- Empty state message -->
        <div
          v-if="favoriteServices.length === 0"
          class="text-center py-8 text-gray-500 text-sm"
        >
          {{ t('no_favorites') || 'No favorite services yet' }}
        </div>
      </div>
    </div>
  </div>
</template>
