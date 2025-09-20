import type { BannerListItem } from './banner'

export interface ApiResponse {
  banners: BannerListItem[]
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationInfo
}
