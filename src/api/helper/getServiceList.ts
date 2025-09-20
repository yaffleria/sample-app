import type { ServiceListItem } from '@/types/service'
import type { PaginatedResponse } from '@/types/api'

import { httpClient } from '../http'

export default function getServiceList(page: number = 1, limit: number = 3) {
  return httpClient.get<PaginatedResponse<ServiceListItem>>('/api/services', {
    params: { page, limit },
  })
}
