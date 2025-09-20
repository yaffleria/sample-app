import type { BannerListItem } from '@/types/banner'
import type { ServiceListItem } from '@/types/service'

export const mockBanners: BannerListItem[] = [
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
export const mockServices: ServiceListItem[] = [
  {
    id: 's1',
    name: 'MoonPay',
    description: {
      en: 'MoonPay offers simple and safer way to buy crypto instantly using VISA/Mastercard payment',
      ko: '',
    },
    serviceUrl: 'https://buy.moonpay.com',
    iconUrl: {
      webp: '',
      png: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/icon_moonpay.png?raw=true',
      jpg: '',
    },
    supportedLang: ['en'],
    supportedDevice: ['iphone'],
    isFavorite: false,
  },
  {
    id: 's2',
    name: 'FTSO Portal',
    description: {
      en: 'FTSO Portal is a service by D’CENT to provide fast and easy way to delegate Vote Power to the user’s favorite FTSO provider. By delegating Vote Power, users can earn passive income as reward',
      ko: 'FTSO Portal은 사용자가 원하는 FTSO provider에 Vote Power 쉽고 빠르게 위임할 수 있는 기능을 제공하는 디센트의 서비스입니다. 사용자는 Vote Power 위임을 통해 패시브인컴(passive income)을 보상으로 받을 수 있습니다.',
    },
    serviceUrl: 'https://ftsoportal.com',
    iconUrl: {
      webp: '',
      png: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/icon_ftso.png?raw=true',
      jpg: '',
    },
    supportNetwork: ['Songbird', 'Flare'],
    isFavorite: false,
  },
  {
    id: 's3',
    name: 'Astar Portal',
    description: {
      en: 'Astar Portal is the official Astar Network application for using everything that Astar Network offers.',
      ko: '아스타포탈은 Astar Network에서 제공하는 모든 것을 사용하기 위한 Astar Network의 공식 애플리케이션입니다.',
    },
    serviceUrl: 'https://portal.astar.network',
    iconUrl: {
      webp: '',
      png: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/icon_ftso.png?raw=true',
      jpg: '',
    },
    supportNetwork: ['Astar'],
    supportEnv: ['dev', 'stage'],
    isFavorite: true,
  },
  {
    id: 's4',
    name: '1inch',
    description: {
      en: "1inch is a decentralized exchange (DEX) aggregator. It's designed to roll liquidity and pricing from all major DEXes into one platform, making it easy to get the best price for the desired trade.",
      ko: '1inch는 모든 주요 DEX 거래소의 유동성과 가격 정보를 하나의 플랫폼에서 제공합니다. 원하는 거래의 가격을 쉽게 조회하여 토큰을 교환할 수 있습니다.',
    },
    serviceUrl: 'https://app.1inch.io',
    iconUrl: {
      webp: '',
      png: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/icon_1inch.png?raw=true',
      jpg: '',
    },
    supportNetwork: ['Ethereum'],
    isFavorite: false,
  },
  {
    id: 's5',
    name: 'XDSea',
    description: {
      en: "XDSea is the world's first and largest peer-to-peer decentralized marketplace for buying and selling NFTs built on the XDC Network.",
      ko: 'XDSea는 XDC 네트워크에 구축된 NFT를 사고 파는 세계 최초이자 최대 규모의 P2P 분산형 시장입니다.',
    },
    serviceUrl: '',
    iconUrl: {
      webp: '',
      png: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/icon_xdsea.png?raw=true',
      jpg: '',
    },
    supportNetwork: ['XDC Network'],
    isFavorite: false,
  },
  {
    id: 's6',
    name: 'Compound',
    description: {
      en: "Compound is Ethereum's algorithmic money market protocol that allows users to earn interest or borrow assets through collateral. Anyone can supply assets to Compound's liquidity pool and earn continuous compound interest immediately.",
      ko: 'Compound는 담보를 통해 이자를 얻거나 자산을 빌릴 수 있는 이더리움 기반의 머니 마켓 프로토콜입니다. 컴파운드의 유동성 풀에 자산을 공급하면 복리이자를 얻을 수 있습니다.',
    },
    serviceUrl: 'https://app.compound.finance/',
    iconUrl: {
      webp: '',
      png: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/icon_compound.png?raw=true',
      jpg: '',
    },
    supportNetwork: ['Ethereum'],
    isFavorite: false,
  },
  {
    id: 's7',
    name: 'PoolTogether',
    description: {
      en: 'PoolTogether is an Ethereum based application that makes saving money as fun as a game. You join a pool by getting a “savings ticket”. Each Savings Ticket gives you a chance to win a prize, but even if you don’t win, you keep all your money!',
      ko: "PoolTogether는 저축을 재미있게 하는 이더리움 기반의 서비스입니다. 자산을 예치하면 “저축 티켓“을 받아 '풀'에 참여합니다. 각 저축 티켓은 풀에서 발생한 이자를 받을 수 있는 기회를 제공하지만, 당첨되지 않더라도 손실이 없습니다.",
    },
    serviceUrl: 'https://app.pooltogether.com/',
    iconUrl: {
      webp: '',
      png: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/icon_pooltogether.png?raw=true',
      jpg: '',
    },
    supportNetwork: ['Ethereum'],
    isFavorite: false,
  },
  {
    id: 's8',
    name: 'OpenSea',
    description: {
      en: 'OpenSea is a marketplace for digital goods, including collectibles, game items, digital art, and other digital assets backed by blockchain such as Ethereum.',
      ko: 'OpenSea는 수집품, 게임 아이템, 디지털 아트와 같은 이더리움 기반의 디지털 상품 및 디지털 자산을 거래할 수 있는 마켓 플레이스입니다.',
    },
    serviceUrl: 'https://opensea.io/',
    iconUrl: {
      webp: '',
      png: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/icon_opensea.png?raw=true',
      jpg: '',
    },
    supportNetwork: ['Ethereum', 'Polygon'],
    isFavorite: false,
  },
  {
    id: 's9',
    name: 'BlueWhale',
    description: {
      en: '', // 영문 미제공
      ko: '블루웨일 프로토콜은 사용하기 쉬운 디파이 서비스를 지향하는 프로젝트입니다. 디파이 대시보드, DEX 어그리게이터, 자동 재예치 서비스 등 탈중앙화 금융(DeFi) 관련 서비스 제공을 통해 클레이튼 디파이 생태계 활동을 더 쉽고 효율적으로 만듭니다.',
    },
    serviceUrl: 'https://bwpm.io/',
    iconUrl: {
      webp: '',
      png: 'https://github.com/KyungeunKim/iotrust-frontend-homework/blob/main/images/icon_bluewhale.png?raw=true',
      jpg: '',
    },
    supportNetwork: ['Kaia'],
    supportedLang: ['ko'],
    isFavorite: false,
  },
]
