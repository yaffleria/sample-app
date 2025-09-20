<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { ServiceListItem } from '@/types/service'
  import { FallbackImage } from '@/components/List'

  const { locale } = useI18n()

  interface Props {
    service: ServiceListItem
  }

  const props = defineProps<Props>()

  const localizedDescription = computed(() => {
    if (!props.service.description) return ''
    const currentLocale = locale.value as 'ko' | 'en'
    return props.service.description[currentLocale] || props.service.description.ko || props.service.description.en
  })

  defineEmits<{
    showDetails: [service: ServiceListItem]
  }>()
</script>

<template>
  <article role="listitem">
    <button
      class="w-full flex items-center p-3 bg-white hover:shadow-md transition-shadow cursor-pointer border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset text-left"
      @click="$emit('showDetails', service)"
      type="button"
      :aria-label="`View details for ${service.name}${localizedDescription ? ': ' + localizedDescription : ''}`"
    >
      <!-- Service Icon -->
      <div
        class="bg-gray-100 rounded-lg flex items-center justify-center mr-3 w-12 h-12"
        aria-hidden="true"
      >
        <FallbackImage
          v-if="service.iconUrl"
          :src="service.iconUrl"
          :alt="`${service.name} icon`"
          class="w-8 h-8 object-contain"
        />
        <div
          v-else
          class="bg-gray-300 rounded flex items-center justify-center text-gray-600 w-8 h-8 text-sm"
          :aria-label="`${service.name} icon`"
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
          {{ localizedDescription }}
        </p>
      </div>
    </button>
  </article>
</template>
