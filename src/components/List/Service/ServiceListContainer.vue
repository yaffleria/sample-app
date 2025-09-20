<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { computed, ref, watch } from 'vue'
  import { useQuery } from '@tanstack/vue-query'
  import { useInfiniteScroll } from '@/utils'
  import { useBottomSheet } from '@/composables/useBottomSheet'
  import searchServices from '@/api/helper/searchServices'
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
  const debouncedSearchQuery = ref('')
  let debounceTimeout: number

  // Debounce search query (500ms delay)
  watch(searchQuery, (newQuery) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      debouncedSearchQuery.value = newQuery
    }, 500)
  })

  // Search API query - only enabled when there's a search query
  const {
    data: searchResponse,
    isLoading: isSearchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ['search', debouncedSearchQuery],
    queryFn: () => searchServices(debouncedSearchQuery.value, 1, 20),
    enabled: computed(() => debouncedSearchQuery.value.trim().length > 0),
    retry: 1,
  })

  // Computed properties for displaying data
  const isSearchMode = computed(() => debouncedSearchQuery.value.trim().length > 0)
  const searchResults = computed(() => searchResponse.value?.data.data || [])

  const displayServices = computed(() => {
    return isSearchMode.value ? searchResults.value : props.services
  })

  const displayCount = computed(() => {
    if (isSearchMode.value) {
      return searchResponse.value?.data.pagination?.total || 0
    }
    return props.services.length
  })

  const isLoading = computed(() => {
    if (isSearchMode.value) {
      return isSearchLoading.value
    }
    return props.isLoadingServices
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
    debouncedSearchQuery.value = ''
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
      :count="displayCount"
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
        v-if="isLoading && displayServices.length === 0"
        :count="5"
      />

      <!-- Services List -->
      <div
        v-else
        class="space-y-3"
      >
        <!-- No results message when searching -->
        <div
          v-if="isSearchMode && displayServices.length === 0 && !isLoading"
          class="text-center py-8 text-gray-500"
        >
          <p class="text-sm">{{ t('no_search_results') }}</p>
          <p class="text-xs mt-1">{{ t('try_different_keywords') }}</p>
        </div>

        <!-- Search Error Message -->
        <div
          v-if="searchError && isSearchMode"
          class="text-center py-8 text-red-500"
        >
          <p class="text-sm">{{ t('search_error') }}</p>
          <p class="text-xs mt-1">{{ t('try_again_later') }}</p>
        </div>

        <!-- Services -->
        <ServiceListItem
          v-for="service in displayServices"
          :key="service.id"
          :service="service"
          @show-details="handleShowDetails"
        />

        <!-- Loading More Skeleton (only show when not searching) -->
        <ServiceListSkeleton
          v-if="isLoadingMore && !isSearchMode"
          :count="3"
        />

        <!-- Search Loading -->
        <ServiceListSkeleton
          v-if="isSearchLoading && isSearchMode"
          :count="3"
        />

        <!-- Infinite Scroll Trigger (only when not searching) -->
        <div
          ref="target"
          class="h-4 opacity-0"
          v-if="hasNextPage && !isLoadingMore && !isSearchMode"
        ></div>

        <!-- End of List Message (only when not searching) -->
        <div
          v-if="!hasNextPage && displayServices.length > 0 && !isSearchMode"
          class="text-center py-4 text-gray-500 text-sm"
        >
          {{ t('end_of_list') || 'No more services to load' }}
        </div>
      </div>
    </div>
  </div>
</template>
