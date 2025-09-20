import { http, HttpResponse } from 'msw'
import { mockBanners, mockServices, mockServiceFavorite } from '@/mock/data'

export const handlers = [
  http.get('/api/banners', async () => {
    // Add 5 second delay to test loading states
    await new Promise((resolve) => setTimeout(resolve, 2500))
    return HttpResponse.json(mockBanners)
  }),
  http.get('/api/services/favorite', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2500))
    return HttpResponse.json(mockServiceFavorite)
  }),
  http.get('/api/services', async ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '3')

    // Add 3 second delay to test loading states
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const services = mockServices.slice(startIndex, endIndex)

    return HttpResponse.json({
      data: services,
      pagination: {
        page,
        limit,
        total: mockServices.length,
        totalPages: Math.ceil(mockServices.length / limit),
        hasNextPage: endIndex < mockServices.length,
        hasPreviousPage: page > 1,
      },
    })
  }),
  http.get('/api/services/search', async ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q') || ''
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')

    // Add 800ms delay to test loading states and simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Filter services based on search query
    const filteredServices = mockServices.filter((service) => {
      const lowercaseQuery = query.toLowerCase()
      return (
        service.name.toLowerCase().includes(lowercaseQuery) ||
        service.description?.ko?.toLowerCase().includes(lowercaseQuery) ||
        service.description?.en?.toLowerCase().includes(lowercaseQuery) ||
        service.serviceUrl.toLowerCase().includes(lowercaseQuery) ||
        service.supportNetwork?.some((network) => network.toLowerCase().includes(lowercaseQuery))
      )
    })

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const services = filteredServices.slice(startIndex, endIndex)

    return HttpResponse.json({
      data: services,
      pagination: {
        page,
        limit,
        total: filteredServices.length,
        totalPages: Math.ceil(filteredServices.length / limit),
        hasNextPage: endIndex < filteredServices.length,
        hasPreviousPage: page > 1,
      },
    })
  }),
  http.get('/*', () => {
    return
  }),
  http.get('/src/*', () => {
    return
  }),
  http.get('/node_modules/*', () => {
    return
  }),
]
