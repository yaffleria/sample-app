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
