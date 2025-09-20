import type { Banner } from '@/types/discovery'

import { httpClient } from '../http'

export default function getBannerList() {
  return httpClient.get<Banner[]>('/api/banners')
}
