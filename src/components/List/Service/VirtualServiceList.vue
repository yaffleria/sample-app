<script setup lang="ts">
  import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
  import { RecycleScroller } from 'vue-virtual-scroller'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  import ServiceListItem from './ServiceListItem.vue'
  import ServiceListSkeleton from './ServiceListSkeleton.vue'
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

  const emit = defineEmits<{
    showDetails: [service: ServiceListItemType]
  }>()

  // Virtual scroller ref
  const virtualScroller = ref<InstanceType<typeof RecycleScroller>>()

  // Only use actual service items for virtual scrolling
  const virtualItems = computed(() => {
    return props.services.map((service, index) => ({
      ...service,
      // Use index + id to ensure unique keys
      virtualId: `${service.id}-${index}`,
    }))
  })

  // Handle scroll to bottom for infinite loading
  const handleScrollEnd = () => {
    if (props.hasNextPage && !props.isLoadingMore && props.fetchMore) {
      console.log('Virtual scroller reached end, fetching more...')
      props.fetchMore()
    }
  }

  // Add additional scroll handling for more reliable infinite scroll
  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement
    const scrollTop = target.scrollTop
    const scrollHeight = target.scrollHeight
    const clientHeight = target.clientHeight
    const scrollBottom = scrollTop + clientHeight

    // Trigger fetch when near bottom (within 100px)
    if (scrollHeight - scrollBottom < 100) {
      handleScrollEnd()
    }
  }

  // Fallback scroll detection using window scroll for page-mode
  const handleWindowScroll = () => {
    if (props.hasNextPage && !props.isLoadingMore) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Trigger when within 200px of bottom
      if (scrollTop + windowHeight >= documentHeight - 200) {
        console.log('Window scroll triggered fetch more')
        handleScrollEnd()
      }
    }
  }

  // Handle item click
  const handleShowDetails = (service: ServiceListItemType) => {
    emit('showDetails', service)
  }

  // Setup window scroll listener as fallback
  onMounted(() => {
    window.addEventListener('scroll', handleWindowScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleWindowScroll)
  })

  // Watch for service changes and update scroller
  watch(
    () => props.services.length,
    async () => {
      if (virtualScroller.value) {
        await nextTick()
        // Force refresh of visible items when data changes
        virtualScroller.value.$forceUpdate()
      }
    },
    { flush: 'post' }
  )

  // Watch for layout changes that might affect scroll detection
  watch(
    [() => props.hasNextPage, () => props.isLoadingMore],
    async () => {
      if (virtualScroller.value) {
        await nextTick()
        // Refresh the scroller to ensure scroll events work properly
        virtualScroller.value.$forceUpdate()
      }
    },
    { flush: 'post' }
  )
</script>

<template>
  <div class="h-full">
    <!-- Show skeleton during initial loading -->
    <ServiceListSkeleton
      v-if="isLoadingServices && services.length === 0"
      :count="5"
    />

    <!-- Virtual Scroller -->
    <div
      v-else
      class="h-full flex flex-col"
      style="min-height: 400px"
    >
      <RecycleScroller
        ref="virtualScroller"
        class="scroller flex-1"
        :items="virtualItems"
        :item-size="72"
        key-field="virtualId"
        :buffer="200"
        :prerender="10"
        :pool-size="20"
        :emit-update="true"
        direction="vertical"
        page-mode
        @scroll-end="handleScrollEnd"
        @scroll="handleScroll"
        v-slot="{ item }"
      >
        <!-- Regular Service Item -->
        <ServiceListItem
          :service="item"
          @show-details="handleShowDetails"
        />
      </RecycleScroller>

      <!-- Loading More Skeleton (positioned below virtual scroller) -->
      <div
        v-if="isLoadingMore"
        class="flex-shrink-0"
      >
        <ServiceListSkeleton :count="3" />
      </div>

      <!-- End of List Message -->
      <div
        v-if="!hasNextPage && services.length > 0 && !isLoadingServices"
        class="text-center py-4 text-gray-500 text-sm flex-shrink-0"
      >
        No more services to load
      </div>
    </div>
  </div>
</template>

<style scoped>
  .scroller {
    height: 100%;
  }

  /* Override vue-virtual-scroller styles for proper virtualization */
  :deep(.vue-recycle-scroller) {
    height: 100%;
    overflow-y: auto;
  }

  :deep(.vue-recycle-scroller__item-wrapper) {
    overflow: hidden;
    position: relative;
  }

  :deep(.vue-recycle-scroller__item-view) {
    /* Let virtual scroller handle positioning */
    width: 100%;
  }
</style>
