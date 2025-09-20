import { http, HttpResponse } from 'msw'
import { mockBanners, mockServices } from '@/mock/data'

export const handlers = [
  http.get('/api/banners', async () => {
    // Add 5 second delay to test loading states
    await new Promise((resolve) => setTimeout(resolve, 5000))
    return HttpResponse.json(mockBanners)
  }),
  http.get('/api/services', async () => {
    return HttpResponse.json(mockServices)
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
