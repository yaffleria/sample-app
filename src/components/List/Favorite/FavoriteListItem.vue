<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { ServiceListItem } from '@/types/service'
  import { BookmarkIcon } from '@/components/Icon'
  import { FallbackImage } from '@/components/List'

  const { t } = useI18n()

  interface Props {
    service: ServiceListItem
  }

  const props = defineProps<Props>()

  const serviceUrl = computed(() => {
    return props.service.serviceUrl || '#'
  })

  defineEmits<{
    removeFromFavorites: [serviceId: string]
    openService: [service: ServiceListItem]
    showDetails: [service: ServiceListItem]
  }>()
</script>

<template>
  <div class="flex items-center p-3 bg-white hover:shadow-md transition-shadow border-b border-gray-200 h-[72px]">
    <!-- Clickable Service Content -->
    <div
      class="flex items-center flex-1 min-w-0 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 mr-2"
      @click="$emit('showDetails', service)"
    >
      <!-- Service Icon -->
      <div class="bg-gray-100 rounded-lg flex items-center justify-center mr-3 w-12 h-12 flex-shrink-0">
        <FallbackImage
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
          v-if="serviceUrl && serviceUrl !== '#'"
          class="text-sm text-gray-500 truncate"
        >
          {{ serviceUrl }}
        </p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center space-x-2 flex-shrink-0">
      <!-- Remove from Favorites Button -->
      <button
        @click.stop="$emit('removeFromFavorites', service.id)"
        class="p-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 flex items-center"
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
