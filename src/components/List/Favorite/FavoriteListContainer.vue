<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import getFavoriteList from '@/api/helper/getFavoriteList'
  import FavoriteListItem from './FavoriteListItem.vue'
  import FavoriteListSkeleton from './FavoriteListSkeleton.vue'
  import ListHeader from '../ListHeader.vue'
  import { useAlert } from '@/composables/useAlert'
  import { useBottomSheet } from '@/composables/useBottomSheet'
  import { filterSupportedServices } from '@/utils'
  import type { ServiceListItem } from '@/types/service'
  import type { AxiosResponse } from 'axios'

  const { t } = useI18n()
  const { showAlert } = useAlert()
  const { showBottomSheet } = useBottomSheet()
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

  // 즐겨찾기 서비스도 지원되는 서비스만 필터링
  const favoriteServices = computed(() => {
    const rawFavorites = favoritesResponse.value?.data || []
    return filterSupportedServices(rawFavorites)
  })
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

  const handleShowDetails = (service: ServiceListItem) => {
    showBottomSheet({
      service,
      onClose: () => {
        console.log('BottomSheet closed for:', service.name)
      },
    })
  }
</script>

<template>
  <section
    class="bg-white"
    aria-labelledby="favorite-list-title"
  >
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
        role="status"
        aria-label="Loading favorites"
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
        role="alert"
        aria-live="polite"
      >
        {{ favoritesError?.message || 'Failed to load favorites' }}
      </div>

      <!-- Favorite Services List -->
      <div
        v-else
        class="space-y-3"
      >
        <ul
          role="list"
          aria-label="Favorite services"
          class="space-y-3"
        >
          <FavoriteListItem
            v-for="service in favoriteServices"
            :key="service.name"
            :service="service"
            @remove-from-favorites="handleRemoveFromFavorites"
            @open-service="handleOpenService"
            @show-details="handleShowDetails"
          />
        </ul>

        <!-- Empty state message -->
        <div
          v-if="favoriteServices.length === 0"
          class="text-center py-8 text-gray-500 text-sm"
          role="status"
          aria-live="polite"
        >
          {{ t('no_favorites') }}
        </div>
      </div>
    </div>
  </section>
</template>
