<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useServiceListStore } from '@/stores/serviceList'
  import { useInfiniteScroll } from '@/utils'
  import ServiceListItem from './ServiceListItem.vue'
  import ServiceListSkeleton from './ServiceListSkeleton.vue'
  import ListHeader from '../ListHeader.vue'
  import type { ServiceListItem as ServiceListItemType } from '@/types/service'

  interface Props {
    fetchMore?: () => void
    isLoadingServices?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    fetchMore: () => {},
    isLoadingServices: false,
  })

  const { t } = useI18n()

  const serviceListStore = useServiceListStore()

  const servicesList = computed(() => serviceListStore.servicesList)
  const isLoadingMore = computed(() => serviceListStore.isLoadingMore)
  const hasNextPage = computed(() => serviceListStore.hasNextPage)

  const handleServiceClick = (service: ServiceListItemType) => {
    // This will be used for future functionality (infinite scroll trigger, etc.)
    console.log('Service clicked:', service.name)
  }

  // Set up infinite scroll
  const { target } = useInfiniteScroll(() => {
    console.log('Infinite scroll triggered', {
      hasNextPage: hasNextPage.value,
      isLoadingMore: isLoadingMore.value,
      fetchMoreExists: !!props.fetchMore,
    })
    if (hasNextPage.value && !isLoadingMore.value && props.fetchMore) {
      console.log('Calling fetchMore')
      props.fetchMore()
    } else {
      console.log('Conditions not met for fetchMore')
    }
  }, 200)
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
      <!-- Initial Loading Skeleton -->
      <ServiceListSkeleton
        v-if="isLoadingServices && servicesList.length === 0"
        :count="3"
      />

      <!-- Services List -->
      <div
        v-else
        class="space-y-3"
      >
        <ServiceListItem
          v-for="service in servicesList"
          :key="service.name"
          :service="service"
          @click="handleServiceClick"
        />

        <!-- Loading More Skeleton -->
        <ServiceListSkeleton
          v-if="isLoadingMore"
          :count="2"
        />

        <!-- Infinite Scroll Trigger -->
        <div
          ref="target"
          class="h-4 opacity-0"
          v-if="hasNextPage && !isLoadingMore"
        ></div>

        <!-- End of List Message -->
        <div
          v-if="!hasNextPage && servicesList.length > 0"
          class="text-center py-4 text-gray-500 text-sm"
        >
          {{ t('end_of_list') || 'No more services to load' }}
        </div>
      </div>
    </div>
  </div>
</template>
