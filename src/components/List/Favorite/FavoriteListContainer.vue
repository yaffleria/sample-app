<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useServiceListStore } from '@/stores/serviceList'
  import FavoriteListItem from './FavoriteListItem.vue'
  import ListHeader from '../ListHeader.vue'
  import type { ServiceListItem } from '@/types/service'

  const { t } = useI18n()

  const serviceListStore = useServiceListStore()

  const favoriteServices = computed(() => serviceListStore.favoriteServices)
  const favoriteCount = computed(() => serviceListStore.favoriteCount)

  const handleRemoveFromFavorites = (serviceName: string) => {
    serviceListStore.removeFromFavorites(serviceName)
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
      <!-- Favorite Services List -->
      <div class="space-y-3">
        <FavoriteListItem
          v-for="service in favoriteServices"
          :key="service.name"
          :service="service"
          @remove-from-favorites="handleRemoveFromFavorites"
          @open-service="handleOpenService"
        />
      </div>
    </div>
  </div>
</template>
