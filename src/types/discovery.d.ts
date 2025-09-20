export type LocalizedText = 'en' | 'ko'

export interface ApiResponse {
  banners: Banner[]
}

export interface Banner {
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
