import type { ServiceListItem } from '@/types/service'

import { httpClient } from '../http'

export default function getServiceList() {
  return httpClient.get<ServiceListItem[]>('/api/services')
}
