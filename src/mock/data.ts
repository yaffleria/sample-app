import type { Banner } from '@/types/discovery'

export const mockBanners: Banner[] = [
  {
    name: 'Campaign MAPO Airdrop',
    imageUrl: {
      en: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/banner_mapo_en.png?raw=true',
      ko: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/banner_mapo_kr.png?raw=true',
    },
    description: {
      en: '',
      ko: '',
    },
    ctaLinkUrl: {
      en: 'https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol',
      ko: 'https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol',
    },
    ctaButtonText: {
      en: '',
      ko: '',
    },
  },
  {
    name: "D'CENT Wallet",
    imageUrl: {
      en: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/banner_dcent.png?raw=true',
      ko: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/banner_dcent.png?raw=true',
    },
    description: {
      en: "Enhance your security with D'CENT biometric wallet",
      ko: '디센트 지문인증형 지갑으로 한층 더 강화된 보안을 경험하세요!',
    },
    ctaLinkUrl: {
      en: 'https://store.dcentwallet.com',
      ko: 'https://store-kr.dcentwallet.com',
    },
    ctaButtonText: {
      en: 'Buy Now',
      ko: '구매하기',
    },
  },
  {
    name: "D'CENT Blog",
    imageUrl: {
      en: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/banner_blog.png?raw=true',
      ko: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/banner_blog.png?raw=true',
    },
    description: {
      en: 'Visit the new D’CENT Blog to explore the latest updates first!',
      ko: '새로운 디센트 블로그를 방문하여 최신 업데이트를 먼저 확인해보세요!',
    },
    ctaLinkUrl: {
      en: 'https://store.dcentwallet.com/blogs/post',
      ko: 'https://store-kr.dcentwallet.com/blogs/post',
    },
    ctaButtonText: {
      en: 'Explore',
      ko: '확인하기',
    },
  },
]
