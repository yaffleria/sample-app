<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useInfiniteScroll } from '@/utils'
  import { useBottomSheet } from '@/composables/useBottomSheet'
  import ServiceListItem from './ServiceListItem.vue'
  import ServiceListSkeleton from './ServiceListSkeleton.vue'
  import ListHeader from '../ListHeader.vue'
  import type { ServiceListItem as ServiceListItemType } from '@/types/service'

  interface Props {
    services: ServiceListItemType[]
    hasNextPage: boolean
    isLoadingMore: boolean
    fetchMore?: () => void
    isLoadingServices?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    services: () => [],
    hasNextPage: false,
    isLoadingMore: false,
    fetchMore: () => {},
    isLoadingServices: false,
  })

  const { t } = useI18n()
  const { showBottomSheet } = useBottomSheet()

  const handleShowDetails = (service: ServiceListItemType) => {
    showBottomSheet({
      service,
      onClose: () => {
        console.log('BottomSheet closed for:', service.name)
      },
    })
  }

  // Set up infinite scroll
  const { target } = useInfiniteScroll(() => {
    console.log('Infinite scroll triggered', {
      hasNextPage: props.hasNextPage,
      isLoadingMore: props.isLoadingMore,
      fetchMoreExists: !!props.fetchMore,
    })
    if (props.hasNextPage && !props.isLoadingMore && props.fetchMore) {
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
      :count="services.length"
    />

    <!-- Content -->
    <div class="p-4">
      <!-- Initial Loading Skeleton -->
      <ServiceListSkeleton
        v-if="isLoadingServices && services.length === 0"
        :count="5"
      />

      <!-- Services List -->
      <div
        v-else
        class="space-y-3"
      >
        <ServiceListItem
          v-for="service in services"
          :key="service.name"
          :service="service"
          @show-details="handleShowDetails"
        />

        <!-- Loading More Skeleton -->
        <ServiceListSkeleton
          v-if="isLoadingMore"
          :count="3"
        />

        <!-- Infinite Scroll Trigger -->
        <div
          ref="target"
          class="h-4 opacity-0"
          v-if="hasNextPage && !isLoadingMore"
        ></div>

        <!-- End of List Message -->
        <div
          v-if="!hasNextPage && services.length > 0"
          class="text-center py-4 text-gray-500 text-sm"
        >
          {{ t('end_of_list') || 'No more services to load' }}
        </div>
      </div>
    </div>
  </div>
</template>
