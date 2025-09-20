<template>
  <div class="space-y-3 flex-1 overflow-y-auto min-h-0">
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
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import type { ServiceListItem as ServiceListItemType } from '@/types/service'

  interface Props {
    filteredServices: ServiceListItemType[]
    searchQuery: string
  }

  interface Emits {
    (e: 'show-details', service: ServiceListItemType): void
  }

  defineProps<Props>()
  const emit = defineEmits<Emits>()
  const { t } = useI18n()

  const handleShowDetails = (service: ServiceListItemType) => {
    emit('show-details', service)
  }
</script>
