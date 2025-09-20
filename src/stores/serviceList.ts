import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ServiceListItem } from '@/types/service'

export const useServiceListStore = defineStore('serviceList', () => {
  // State
  const favoriteIds = ref<Set<string>>(new Set())
  const services = ref<ServiceListItem[]>([])

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

  // Set services data from external source
  function setServices(servicesList: ServiceListItem[]) {
    services.value = [...servicesList]
    // Initialize favorites from the data
    servicesList.forEach((service) => {
      if (service.isFavorite) {
        addToFavorites(service.name)
      }
    })
  }

  return {
    // State
    favoriteIds,
    services,
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
  }
})
