<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { ServiceListItem } from '@/types/service'
  import { FallbackImage } from '@/components/Common'

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
    click: [service: ServiceListItem]
  }>()
</script>

<template>
  <div
    class="flex items-center p-3 bg-white hover:shadow-md transition-shadow cursor-pointer"
    @click="$emit('click', service)"
  >
    <!-- Service Icon -->
    <div class="bg-gray-100 rounded-lg flex items-center justify-center mr-3 w-12 h-12">
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
        v-if="service.description"
        class="text-sm text-gray-500 truncate"
      >
        {{ localizedDescription }}
      </p>
      <p
        v-if="service.supportNetwork"
        class="text-xs text-gray-400 mt-1"
      >
        {{ service.supportNetwork.join(', ') }}
      </p>
    </div>
  </div>
</template>
