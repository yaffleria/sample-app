import type { ServiceListItem } from '@/types/service'
import type { LocalizedText, SupportedEnv, SupportedDevice } from '@/types/common'
import i18n from '@/i18n'

/**
 * 현재 언어 감지
 */
export function getCurrentLanguage(): LocalizedText {
  // URL 파라미터로 언어 오버라이드 가능 (테스트용)
  const urlParams = new URLSearchParams(window.location.search)
  const forceLocale = urlParams.get('locale')
  if (forceLocale === 'en' || forceLocale === 'ko') {
    return forceLocale as LocalizedText
  }

  // 개발 환경에서 localStorage로 언어 오버라이드 가능
  const devLocale = localStorage.getItem('dev-locale')
  if ((devLocale === 'en' || devLocale === 'ko') && import.meta.env.DEV) {
    return devLocale as LocalizedText
  }

  // i18n의 현재 locale을 사용
  const currentLocale = i18n.global.locale.value as string
  return currentLocale === 'ko' ? 'ko' : 'en'
}

/**
 * 현재 환경 감지
 */
export function getCurrentEnvironment(): SupportedEnv {
  const env = import.meta.env.VITE_APP_ENV as SupportedEnv
  return env || 'dev'
}

/**
 * 현재 디바이스 감지
 */
export function getCurrentDevice(): SupportedDevice | null {
  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.includes('android')) {
    return 'android'
  } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
    return 'iphone'
  }

  // 웹 브라우저인 경우 null 반환 (모든 서비스 표시)
  return null
}

/**
 * 서비스가 현재 환경에서 지원되는지 확인
 */
export function isServiceSupported(service: ServiceListItem): boolean {
  const currentLang = getCurrentLanguage()
  const currentEnv = getCurrentEnvironment()
  const currentDevice = getCurrentDevice()

  // 언어 지원 확인
  if (service.supportedLang && service.supportedLang.length > 0) {
    if (!service.supportedLang.includes(currentLang)) {
      return false
    }
  }

  // 환경 지원 확인
  if (service.supportEnv && service.supportEnv.length > 0) {
    if (!service.supportEnv.includes(currentEnv)) {
      return false
    }
  }

  // 디바이스 지원 확인
  if (service.supportedDevice && service.supportedDevice.length > 0) {
    // 웹 브라우저인 경우 (currentDevice가 null) 모든 서비스 표시
    if (currentDevice && !service.supportedDevice.includes(currentDevice)) {
      return false
    }
  }

  return true
}

/**
 * 서비스 리스트 필터링
 */
export function filterSupportedServices(services: ServiceListItem[]): ServiceListItem[] {
  return services.filter(isServiceSupported)
}

/**
 * 검색어로 서비스 필터링
 */
export function filterServicesBySearch(services: ServiceListItem[], query: string): ServiceListItem[] {
  if (!query.trim()) return services

  const lowercaseQuery = query.toLowerCase()
  return services.filter((service) => {
    // Search in service name
    if (service.name.toLowerCase().includes(lowercaseQuery)) return true

    // Search in service description
    if (service.description?.ko?.toLowerCase().includes(lowercaseQuery)) return true
    if (service.description?.en?.toLowerCase().includes(lowercaseQuery)) return true

    // Search in service URL
    if (service.serviceUrl.toLowerCase().includes(lowercaseQuery)) return true

    // Search in supported networks
    if (service.supportNetwork?.some((network) => network.toLowerCase().includes(lowercaseQuery))) return true

    return false
  })
}

/**
 * 디버깅용 함수 - 현재 환경 정보 출력
 */
export function debugEnvironment() {
  console.log('=== Debug Environment ===')
  console.log('Current Language:', getCurrentLanguage())
  console.log('Current Environment:', getCurrentEnvironment())
  console.log('Current Device:', getCurrentDevice())
  console.log('User Agent:', navigator.userAgent)
  console.log('Navigator Language:', navigator.language)
  console.log('i18n Locale:', i18n.global.locale.value)
  console.log('========================')
}
