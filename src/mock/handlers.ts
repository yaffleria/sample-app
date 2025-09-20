import { http, HttpResponse } from 'msw'
import { mockBanners } from '@/mock/data'

export const handlers = [
  http.get('/api/banners', () => {
    return HttpResponse.json(mockBanners)
  }),
]
