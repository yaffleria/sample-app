import type { LocalizedText } from './common'

export interface BannerListItem {
  name: string
  imageUrl: {
    [key in LocalizedText]: string
  }
  description: {
    [key in LocalizedText]: string
  }
  ctaLinkUrl: {
    [key in LocalizedText]: string
  }
  ctaButtonText: {
    [key in LocalizedText]: string
  }
}
