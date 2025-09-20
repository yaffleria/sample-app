import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ServiceListItem } from '@/types/service'

export const useServiceListStore = defineStore('serviceList', () => {
  // State
  const services = ref<ServiceListItem[]>([])
  const currentPage = ref(1)
  const hasNextPage = ref(true)
  const isLoadingMore = ref(false)

  // Getters
  const servicesList = computed(() => services.value)

  // Actions
  // Set initial services data (첫 페이지)
  function setServices(servicesList: ServiceListItem[]) {
    services.value = [...servicesList]
  }

  // Append services data (다음 페이지들)
  function appendServices(servicesList: ServiceListItem[]) {
    const newServices = servicesList.filter(
      (newService) => !services.value.some((existing) => existing.id === newService.id)
    )
    services.value.push(...newServices)
  }

  function setCurrentPage(page: number) {
    currentPage.value = page
  }

  function setHasNextPage(hasNext: boolean) {
    hasNextPage.value = hasNext
  }

  function setIsLoadingMore(loading: boolean) {
    isLoadingMore.value = loading
  }

  function reset() {
    services.value = []
    currentPage.value = 1
    hasNextPage.value = true
    isLoadingMore.value = false
  }

  return {
    // State
    services,
    currentPage,
    hasNextPage,
    isLoadingMore,
    // Getters
    servicesList,
    // Actions
    setServices,
    appendServices,
    setCurrentPage,
    setHasNextPage,
    setIsLoadingMore,
    reset,
  }
})
