import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ServiceListItem } from '@/types/service'

export const useServiceListStore = defineStore('serviceList', () => {
  // State
  const favoriteIds = ref<Set<string>>(new Set())
  const services = ref<ServiceListItem[]>([])
  const currentPage = ref(1)
  const hasNextPage = ref(true)
  const isLoadingMore = ref(false)

  // Getters
  const favoriteServices = computed(() => services.value.filter((service) => favoriteIds.value.has(service.name)))

  const servicesList = computed(() =>
    services.value.map((service) => ({
      ...service,
      isFavorite: favoriteIds.value.has(service.name),
    }))
  )

  const favoriteCount = computed(() => favoriteIds.value.size)

  // Actions
  function addToFavorites(serviceName: string) {
    favoriteIds.value.add(serviceName)
  }

  function removeFromFavorites(serviceName: string) {
    favoriteIds.value.delete(serviceName)
  }

  function toggleFavorite(serviceName: string) {
    if (favoriteIds.value.has(serviceName)) {
      removeFromFavorites(serviceName)
    } else {
      addToFavorites(serviceName)
    }
  }

  function isFavorite(serviceName: string): boolean {
    return favoriteIds.value.has(serviceName)
  }

  // Set initial services data (첫 페이지)
  function setServices(servicesList: ServiceListItem[]) {
    services.value = [...servicesList]
    // Initialize favorites from the data
    servicesList.forEach((service) => {
      if (service.isFavorite) {
        addToFavorites(service.name)
      }
    })
  }

  // Append services data (다음 페이지들)
  function appendServices(servicesList: ServiceListItem[]) {
    const newServices = servicesList.filter(
      (newService) => !services.value.some((existing) => existing.id === newService.id)
    )
    services.value.push(...newServices)

    // Initialize favorites from the new data
    newServices.forEach((service) => {
      if (service.isFavorite) {
        addToFavorites(service.name)
      }
    })
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
    favoriteIds,
    services,
    currentPage,
    hasNextPage,
    isLoadingMore,
    // Getters
    favoriteServices,
    servicesList,
    favoriteCount,
    // Actions
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    setServices,
    appendServices,
    setCurrentPage,
    setHasNextPage,
    setIsLoadingMore,
    reset,
  }
})
