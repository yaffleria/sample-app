import type { ServiceListItem } from '@/types/service'
import type { PaginatedResponse } from '@/types/api'

import { httpClient } from '../http'

export default function searchServices(query: string, page: number = 1, limit: number = 10) {
  return httpClient.get<PaginatedResponse<ServiceListItem>>('/api/services/search', {
    params: { q: query, page, limit },
  })
}
