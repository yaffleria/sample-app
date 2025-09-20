<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { computed, ref } from 'vue'
  import { useBottomSheet } from '@/composables/useBottomSheet'
  import { filterServicesBySearch } from '@/utils/serviceFilter'
  import VirtualServiceList from './VirtualServiceList.vue'
  import ServiceSearchList from './ServiceSearchList.vue'
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

  // When searching, disable infinite scroll and show filtered results
  const shouldUseVirtualList = computed(() => !searchQuery.value)
</script>

<template>
  <section
    class="bg-white flex-1 flex flex-col"
    aria-labelledby="service-list-title"
  >
    <!-- Header -->
    <ListHeader
      :title="t('dapp_list_title')"
      :count="filteredServices.length"
    />

    <!-- Content -->
    <div class="p-4 flex flex-col flex-1 min-h-0">
      <!-- Search Bar -->
      <div class="mb-4 flex-shrink-0">
        <SearchBar
          v-model="searchQuery"
          :placeholder="t('search_services_placeholder')"
          @search="handleSearch"
          @clear="handleClearSearch"
          aria-label="Search services"
        />
      </div>

      <!-- Virtual List (when not searching) -->
      <VirtualServiceList
        v-if="shouldUseVirtualList"
        :services="props.services"
        :has-next-page="props.hasNextPage"
        :is-loading-more="props.isLoadingMore"
        :fetch-more="props.fetchMore"
        :is-loading-services="props.isLoadingServices"
        @show-details="handleShowDetails"
        class="flex-1 min-h-0"
        role="list"
        aria-label="Service list"
      />

      <!-- Regular List (when searching) -->
      <ServiceSearchList
        v-else
        :filtered-services="filteredServices"
        :search-query="searchQuery"
        @show-details="handleShowDetails"
        class="flex-1 min-h-0"
        role="list"
        :aria-label="`Search results for '${searchQuery}' - ${filteredServices.length} services found`"
      />
    </div>
  </section>
</template>
