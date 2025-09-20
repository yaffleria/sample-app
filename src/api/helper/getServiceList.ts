import type { Service } from '@/types/discovery'

import { httpClient } from '../http'

export default function getServiceList() {
  return httpClient.get<Service[]>('/api/services')
}
