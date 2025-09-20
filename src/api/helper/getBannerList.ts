import type { BannerListItem } from '@/types/banner'

import { httpClient } from '../http'

export default function getBannerList() {
  return httpClient.get<BannerListItem[]>('/api/banners')
}
