<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { computed, ref } from 'vue'
  import { useInfiniteScroll } from '@/utils'
  import { useBottomSheet } from '@/composables/useBottomSheet'
  import { filterServicesBySearch } from '@/utils/serviceFilter'
  import ServiceListItem from './ServiceListItem.vue'
  import ServiceListSkeleton from './ServiceListSkeleton.vue'
  import ListHeader from '../ListHeader.vue'
  import { SearchBar } from '@/components/Search'
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

  const searchQuery = ref('')

  // Filter services based on search query
  const filteredServices = computed(() => {
    return filterServicesBySearch(props.services, searchQuery.value)
  })

  const handleShowDetails = (service: ServiceListItemType) => {
    showBottomSheet({
      service,
      onClose: () => {
        console.log('BottomSheet closed for:', service.name)
      },
    })
  }

  const handleSearch = (query: string) => {
    searchQuery.value = query
  }

  const handleClearSearch = () => {
    searchQuery.value = ''
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
      :count="filteredServices.length"
    />

    <!-- Content -->
    <div class="p-4">
      <!-- Search Bar -->
      <div class="mb-4">
        <SearchBar
          v-model="searchQuery"
          :placeholder="t('search_services_placeholder')"
          @search="handleSearch"
          @clear="handleClearSearch"
        />
      </div>

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
        <!-- No results message when searching -->
        <div
          v-if="searchQuery && filteredServices.length === 0"
          class="text-center py-8 text-gray-500"
        >
          <p class="text-sm">{{ t('no_search_results') }}</p>
          <p class="text-xs mt-1">{{ t('try_different_keywords') }}</p>
        </div>

        <!-- Filtered Services -->
        <ServiceListItem
          v-for="service in filteredServices"
          :key="service.id"
          :service="service"
          @show-details="handleShowDetails"
        />

        <!-- Loading More Skeleton (only show when not searching) -->
        <ServiceListSkeleton
          v-if="isLoadingMore && !searchQuery"
          :count="3"
        />

        <!-- Infinite Scroll Trigger (only when not searching) -->
        <div
          ref="target"
          class="h-4 opacity-0"
          v-if="hasNextPage && !isLoadingMore && !searchQuery"
        ></div>

        <!-- End of List Message (only when not searching) -->
        <div
          v-if="!hasNextPage && filteredServices.length > 0 && !searchQuery"
          class="text-center py-4 text-gray-500 text-sm"
        >
          {{ t('end_of_list') || 'No more services to load' }}
        </div>
      </div>
    </div>
  </div>
</template>
