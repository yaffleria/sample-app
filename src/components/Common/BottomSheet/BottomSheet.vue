<template>
  <div
    v-if="isVisible && service"
    class="fixed inset-0 z-50 flex items-end justify-center"
    @click="handleBackdropClick"
    @touchmove.prevent
    @wheel.prevent
  >
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>

    <!-- Bottom sheet -->
    <div
      class="relative bg-white rounded-t-2xl shadow-2xl w-full max-w-md mx-4 mb-0"
      style="height: 40vh; min-height: 300px"
      @click.stop
    >
      <!-- Handle bar -->
      <div class="flex justify-center pt-3 pb-2">
        <div class="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>

      <!-- Content -->
      <div class="px-6 pb-6 h-full flex flex-col">
        <!-- First row: Icon and Name/Network -->
        <div class="flex items-center space-x-4 mb-4">
          <!-- Service Icon -->
          <div class="flex-shrink-0">
            <FallbackImage
              :src="service.iconUrl"
              :alt="service.name"
              class="w-16 h-16 rounded-lg"
            />
          </div>

          <!-- Name and Network -->
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {{ service.name }}
            </h3>
            <p
              v-if="service.supportNetwork?.length"
              class="text-sm text-gray-500 truncate"
            >
              {{ service.supportNetwork.join(', ') }}
            </p>
          </div>
        </div>

        <!-- Second row: Service URL -->
        <div class="mb-4">
          <p class="text-sm text-gray-700 break-all">
            {{ service.serviceUrl }}
          </p>
        </div>

        <!-- Third row: Description label -->
        <div class="mb-2">
          <h4 class="text-sm font-bold text-gray-900">Description</h4>
        </div>

        <!-- Fourth row: Localized description -->
        <div class="flex-1 mb-6 overflow-y-auto">
          <p class="text-sm text-gray-500 leading-relaxed">
            {{ localizedDescription }}
          </p>
        </div>

        <!-- Go button -->
        <div class="pt-4 border-t border-gray-100">
          <button
            @click="handleGoClick"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
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
