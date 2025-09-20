<template>
  <div
    v-if="isVisible && service"
    class="fixed inset-0 z-50 flex items-end justify-center"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }"
    @click="handleBackdropClick"
    @touchmove.prevent
    @wheel.prevent
    role="dialog"
    aria-modal="true"
    :aria-labelledby="`bottomsheet-title-${service.name}`"
    :aria-describedby="`bottomsheet-description-${service.name}`"
  >
    <!-- Bottom sheet -->
    <div
      class="relative bg-white rounded-t-2xl shadow-2xl w-full mb-0"
      style="height: 55vh; min-height: 300px"
      @click.stop
      role="document"
    >
      <!-- Content -->
      <div class="px-8 mt-6 pb-6 h-full flex flex-col">
        <!-- First row: Icon and Name/Network -->
        <div class="flex items-center space-x-4 mb-4">
          <!-- Service Icon -->
          <div class="flex-shrink-0">
            <FallbackImage
              :src="service.iconUrl"
              :alt="`${service.name} icon`"
              class="w-14 h-14 rounded-lg"
            />
          </div>

          <!-- Name and Network -->
          <div class="flex-1 min-w-0">
            <h3
              :id="`bottomsheet-title-${service.name}`"
              class="text-lg font-semibold text-gray-900 truncate"
            >
              {{ service.name }}
            </h3>
            <p
              v-if="service.supportNetwork?.length"
              class="text-sm text-gray-500 truncate"
              :aria-label="`Supported networks: ${service.supportNetwork.join(', ')}`"
            >
              {{ service.supportNetwork.join(', ') }}
            </p>
          </div>
        </div>

        <!-- Second row: Service URL -->
        <div
          v-if="service.serviceUrl"
          class="mb-4"
        >
          <p
            class="text-sm text-gray-700 break-all"
            aria-label="Service URL"
          >
            {{ service.serviceUrl }}
          </p>
        </div>

        <!-- Third row: Description label -->
        <div class="mb-2">
          <h4 class="text-sm font-bold text-gray-900">Description</h4>
        </div>

        <!-- Fourth row: Localized description -->
        <div class="flex-1 mb-6 overflow-y-auto">
          <p
            :id="`bottomsheet-description-${service.name}`"
            class="text-sm text-gray-500 leading-relaxed"
          >
            {{ localizedDescription }}
          </p>
        </div>

        <!-- Go button -->
        <div class="pt-4 mb-4 flex justify-center">
          <button
            @click="handleGoClick"
            class="w-[70%] bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            type="button"
            :aria-label="`Go to ${service.name} service`"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { FallbackImage } from '@/components/List'
  import type { ServiceListItem } from '@/types/service'

  interface Props {
    isVisible: boolean
    service: ServiceListItem | null
  }

  interface Emits {
    (e: 'close'): void
    (e: 'go', service: ServiceListItem): void
  }

  const props = withDefaults(defineProps<Props>(), {
    isVisible: false,
    service: null,
  })

  const emit = defineEmits<Emits>()
  const { locale } = useI18n()

  // Body scroll management
  let originalOverflow = ''
  let originalPaddingRight = ''

  const preventBodyScroll = () => {
    const body = document.body
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    originalOverflow = body.style.overflow
    originalPaddingRight = body.style.paddingRight

    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollBarWidth}px`
  }

  const restoreBodyScroll = () => {
    const body = document.body
    body.style.overflow = originalOverflow
    body.style.paddingRight = originalPaddingRight
  }

  // Watch for visibility changes
  watch(
    () => props.isVisible,
    (newVisible) => {
      if (newVisible) {
        preventBodyScroll()
      } else {
        restoreBodyScroll()
      }
    },
    { immediate: true }
  )

  // Cleanup on unmount
  onUnmounted(() => {
    if (props.isVisible) {
      restoreBodyScroll()
    }
  })

  const localizedDescription = computed(() => {
    if (!props.service?.description) return ''
    const currentLocale = locale.value as 'ko' | 'en'
    return (
      props.service.description[currentLocale] || props.service.description.ko || props.service.description.en || ''
    )
  })

  const handleBackdropClick = () => {
    emit('close')
  }

  const handleGoClick = () => {
    if (props.service) {
      emit('go', props.service)
    }
  }
</script>

<style scoped>
  /* Slide-up animation */
  .fixed {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .relative.bg-white {
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
