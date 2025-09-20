<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import type { ServiceListItem } from '@/types/service'
  import { BookmarkIcon, ExternalLinkIcon } from '@/components/Icon'

  const { t } = useI18n()

  interface Props {
    service: ServiceListItem
  }

  defineProps<Props>()

  defineEmits<{
    removeFromFavorites: [serviceName: string]
    openService: [service: ServiceListItem]
  }>()
</script>

<template>
  <div class="flex items-center p-3 bg-white hover:shadow-md transition-shadow">
    <!-- Service Icon -->
    <div class="bg-gray-100 rounded-lg flex items-center justify-center mr-3 w-10 h-10">
      <img
        v-if="service.iconUrl"
        :src="service.iconUrl"
        :alt="service.name"
        class="w-6 h-6 object-contain"
      />
      <div
        v-else
        class="bg-gray-300 rounded flex items-center justify-center text-gray-600 w-6 h-6 text-xs"
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
        {{ service.description }}
      </p>
    </div>

    <!-- Actions -->
    <div class="flex items-center space-x-2">
      <!-- Open Service Button -->
      <button
        @click="$emit('openService', service)"
        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        :title="t('go_to_dapp')"
      >
        <ExternalLinkIcon class="w-4 h-4" />
      </button>

      <!-- Remove from Favorites Button -->
      <button
        @click="$emit('removeFromFavorites', service.name)"
        class="p-2 rounded-lg transition-colors text-red-600 hover:bg-red-50"
        :title="t('dapp_favorite_delete')"
      >
        <BookmarkIcon
          class="w-5 h-5"
          fill="currentColor"
        />
      </button>
    </div>
  </div>
</template>
