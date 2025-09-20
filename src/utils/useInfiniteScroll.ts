import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

export function useInfiniteScroll(fetchMore: () => void, threshold: number = 100) {
  const target = ref<HTMLElement | null>(null)
  const isIntersecting = ref(false)

  const observer = ref<IntersectionObserver | null>(null)

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    isIntersecting.value = entry.isIntersecting

    if (entry.isIntersecting) {
      console.log('Intersection detected, calling fetchMore')
      fetchMore()
    }
  }

  const startObserving = async () => {
    await nextTick()

    if (!target.value) {
      console.log('Target element not found')
      return
    }

    // Stop previous observer if exists
    stopObserving()

    observer.value = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    })

    observer.value.observe(target.value)
    console.log('Started observing target element')
  }

  const stopObserving = () => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
      console.log('Stopped observing')
    }
  }

  // Watch for target changes and restart observing
  watch(target, () => {
    if (target.value) {
      startObserving()
    }
  })

  onMounted(() => {
    startObserving()
  })

  onUnmounted(() => {
    stopObserving()
  })

  return {
    target,
    isIntersecting,
    startObserving,
    stopObserving,
  }
}
