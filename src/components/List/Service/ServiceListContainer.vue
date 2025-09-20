<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useServiceListStore } from '@/stores/serviceList'
  import ServiceListItem from './ServiceListItem.vue'
  import ListHeader from '../ListHeader.vue'
  import type { ServiceListItem as ServiceListItemType } from '@/types/service'

  const { t } = useI18n()

  const serviceListStore = useServiceListStore()

  const servicesList = computed(() => serviceListStore.servicesList)

  const handleServiceClick = (service: ServiceListItemType) => {
    // This will be used for future functionality (infinite scroll trigger, etc.)
    console.log('Service clicked:', service.name)
  }
</script>

<template>
  <div class="bg-white flex-1">
    <!-- Header -->
    <ListHeader
      :title="t('dapp_list_title')"
      :count="servicesList.length"
    />

    <!-- Content -->
    <div class="p-4">
      <!-- Services List -->
      <div class="space-y-3">
        <ServiceListItem
          v-for="service in servicesList"
          :key="service.name"
          :service="service"
          @click="handleServiceClick"
        />
      </div>
    </div>
  </div>
</template>
