import type { ServiceListItem } from '@/types/service'
import { httpClient } from '../http'

/**
 * Get favorite services list
 * @returns Promise<AxiosResponse<ServiceListItem[]>>
 */
export default function getFavoriteList() {
  return httpClient.get<ServiceListItem[]>('/api/services/favorite')
}
