import { http, HttpResponse } from 'msw'
import { mockBanners } from '@/mock/data'

export const handlers = [
  http.get('/api/banners', async () => {
    // Add 5 second delay to test loading states
    await new Promise((resolve) => setTimeout(resolve, 5000))
    return HttpResponse.json(mockBanners)
  }),
]
