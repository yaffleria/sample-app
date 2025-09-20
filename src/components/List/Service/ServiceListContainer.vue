<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { computed, ref } from 'vue'
  import { useBottomSheet } from '@/composables/useBottomSheet'
  import { filterServicesBySearch } from '@/utils/serviceFilter'
  import VirtualServiceList from './VirtualServiceList.vue'
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
  <div class="bg-white flex-1 flex flex-col">
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
      />

      <!-- Regular List (when searching) -->
      <div
        v-else
        class="space-y-3 flex-1 overflow-y-auto min-h-0"
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
        <div
          v-for="service in filteredServices"
          :key="service.id"
          class="flex items-center p-3 bg-white hover:shadow-md transition-shadow cursor-pointer border-b border-gray-200"
          @click="handleShowDetails(service)"
        >
          <!-- Service Icon -->
          <div class="bg-gray-100 rounded-lg flex items-center justify-center mr-3 w-12 h-12">
            <img
              v-if="service.iconUrl"
              :src="service.iconUrl"
              :alt="service.name"
              class="w-8 h-8 object-contain"
            />
            <div
              v-else
              class="bg-gray-300 rounded flex items-center justify-center text-gray-600 w-8 h-8 text-sm"
            >
              {{ service.name.charAt(0) }}
            </div>
          </div>

          <!-- Service Info -->
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-gray-900 truncate">{{ service.name }}</h3>
            <p
              v-if="service.description"
              class="text-sm text-gray-500 truncate"
            >
              {{ service.description.ko || service.description.en }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
