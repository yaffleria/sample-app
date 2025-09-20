<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import getFavoriteList from '@/api/helper/getFavoriteList'
  import FavoriteListItem from './FavoriteListItem.vue'
  import FavoriteListSkeleton from './FavoriteListSkeleton.vue'
  import ListHeader from '../ListHeader.vue'
  import { useAlert } from '@/composables/useAlert'
  import type { ServiceListItem } from '@/types/service'
  import type { AxiosResponse } from 'axios'

  const { t } = useI18n()
  const { showAlert } = useAlert()
  const queryClient = useQueryClient()

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

  const removeFromFavoritesArray = (serviceId: string) => {
    // Get current data from cache
    const currentData = queryClient.getQueryData<AxiosResponse<ServiceListItem[]>>(['favorites'])

    if (currentData?.data) {
      // Filter out the service to remove
      const updatedServices = currentData.data.filter((service) => service.id !== serviceId)

      // Update the cache with new data
      queryClient.setQueryData(['favorites'], {
        ...currentData,
        data: updatedServices,
      })
    }
  }

  const handleRemoveFromFavorites = (serviceId: string) => {
    showAlert({
      title: t('dapp_favorite_delete'),
      description: t('dapp_favorite_delete_confirm'),
      onConfirm: () => {
        removeFromFavoritesArray(serviceId)
        console.log('Removed from favorites:', serviceId)
      },
      onCancel: () => {
        console.log('Delete cancelled')
      },
    })
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
          {{ t('no_favorites') }}
        </div>
      </div>
    </div>
  </div>
</template>
