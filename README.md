# D'CENT Discovery Mobile Web

> IoTrust 프론트엔드 실기 과제 - 디센트 모바일 앱 Discovery 화면 구현

## 📋 프로젝트 개요

이 프로젝트는 디센트(D'CENT) 지갑의 Discovery 메인 화면을 모바일 웹으로 구현한 Vue 3 기반 애플리케이션입니다. 
실무 환경에서 요구되는 성능 최적화, 다국어 지원, 환경별 분기 등의 기능을 포함하여 개발되었습니다.

## 🚀 빠른 시작

### 개발 환경 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (로컬 환경)
pnpm local

# 환경별 실행
pnpm dev    # 개발 환경
pnpm stage  # 스테이징 환경
pnpm prod   # 프로덕션 환경
```

### 환경 설정

로컬 개발을 위해 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
VITE_APP_ENV=local
VITE_API_BASE_URL=
```

### 빌드

```bash
# 기본 빌드
pnpm build

# 환경별 빌드
pnpm build:dev    # 개발 환경용
pnpm build:stage  # 스테이징 환경용
pnpm build:prod   # 프로덕션 환경용
```

### 미리보기

빌드된 애플리케이션을 미리보기하려면:

```bash
pnpm preview
```

**중요**: 브라우저 개발자 도구의 모바일 디바이스 모드로 확인해야 정상적으로 보입니다.

## 🛠 기술 스택

### 핵심 프레임워크
- **Vue 3** - Composition API 기반 모던 프레임워크
- **TypeScript** - 타입 안정성 및 개발 생산성 향상
- **Vite** - 빠른 빌드 도구

### UI/UX 라이브러리
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Swiper** - 터치 기반 슬라이더 컴포넌트
- **Vue Virtual Scroller** - 대용량 리스트 가상화

### 상태 관리 & API
- **TanStack Query (Vue Query)** - 서버 상태 관리 및 캐싱
- **Vue Router** - SPA 라우팅
- **Vue i18n** - 다국어 지원

### 개발 도구
- **MSW (Mock Service Worker)** - API 모킹
- **Vitest** - 단위 테스트 프레임워크
- **Playwright** - E2E 테스트
- **ESLint & Prettier** - 코드 품질 관리

## 🏗 컴포넌트 구조도

```
src/components/
├── Carousel/                # 배너 슬라이더 관련
│   ├── CarouselContainer.vue    # 메인 컨테이너
│   ├── CarouselSlide.vue        # 개별 슬라이드
│   ├── CarouselImage.vue        # 이미지 컴포넌트
│   ├── CarouselButton.vue       # CTA 버튼
│   ├── CarouselDescription.vue  # 설명 텍스트
│   ├── CarouselSlideIndex.vue   # 슬라이드 인디케이터
│   └── CarouselSkeleton.vue     # 로딩 스켈레톤
├── List/                    # 리스트 관련 컴포넌트
│   ├── ListHeader.vue           # 리스트 헤더
│   ├── FallbackImage.vue        # 이미지 최적화 컴포넌트
│   ├── Favorite/                # 즐겨찾기 리스트
│   │   ├── FavoriteListContainer.vue
│   │   ├── FavoriteListItem.vue
│   │   └── FavoriteListSkeleton.vue
│   └── Service/                 # 서비스 리스트
│       ├── ServiceListContainer.vue
│       ├── ServiceListItem.vue
│       ├── ServiceListSkeleton.vue
│       ├── ServiceSearchList.vue
│       └── VirtualServiceList.vue
├── Search/                  # 검색 관련
│   └── SearchBar.vue
├── Icon/                    # 아이콘 컴포넌트
│   ├── Bookmark.vue
│   ├── ExternalLink.vue
│   ├── SearchGlass.vue
│   └── SearchClear.vue
└── Common/                  # 공통 UI 컴포넌트
    ├── Alert/               # 알림 시스템
    │   ├── AlertProvider.vue
    │   └── AlertWindow.vue
    └── BottomSheet/         # 바텀시트
        ├── BottomSheetProvider.vue
        └── BottomSheet.vue
```

## 📊 데이터 흐름도

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   MSW Handler   │ => │   HTTP Client    │ => │   TanStack Query    │
│                 │    │  (Axios + Base)  │    │   (Server State)    │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│  View Component │ <= │  List Container  │ <= │     Query Hook      │
│ (DiscoveryView) │    │   Components     │    │ (useQuery, etc...)  │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│  Local State    │    │  Service Filter  │
│  (Search, UI)   │    │  (Language, Env) │
└─────────────────┘    └──────────────────┘
```

### 데이터 레이어별 역할

1. **MSW Layer**: 개발 환경에서 실제 API를 모방하는 Mock 데이터 제공
2. **HTTP Client**: Axios 기반 HTTP 클라이언트로 API 요청/응답 처리
3. **TanStack Query**: 서버 상태 캐싱, 로딩 상태 관리, 무한 스크롤 구현
4. **Container Components**: 비즈니스 로직과 상태 관리를 담당하는 컨테이너
5. **View Components**: 실제 UI 렌더링과 사용자 인터랙션 처리
6. **Local State**: 검색어, UI 상태 등 클라이언트 전용 상태
7. **Service Filter**: 환경, 언어, 디바이스별 서비스 필터링 로직

## ⚡ 가상화목록 동작 구조

### 가상 스크롤링 + 무한 스크롤 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                    VirtualServiceList                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────────────────────────┐  │
│  │ RecycleScroller │  │       TanStack Query             │  │
│  │                 │  │  ┌─────────────────────────────┐ │  │
│  │ • 가시영역만     │  │  │    useInfiniteQuery         │ │  │
│  │   렌더링        │  │  │                             │ │  │
│  │ • 가상화로       │  │  │ • 페이지별 데이터 관리        │ │  │
│  │   성능 최적화    │  │  │ • 자동 캐싱                 │ │  │
│  │                 │  │  │ • 로딩 상태 관리             │ │  │
│  └─────────────────┘  │  └─────────────────────────────┘ │  │
│                       └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
                ┌──────────────────────────────┐
                │      Scroll Detection        │
                │                              │
                │ • Window scroll 감지         │
                │ • RecycleScroller 이벤트     │
                │ • 임계점 도달 시 fetch 트리거 │
                └──────────────────────────────┘
```

### 핵심 최적화 기법

1. **가상 스크롤링**: `vue-virtual-scroller`로 화면에 보이는 아이템만 DOM에 렌더링
2. **무한 스크롤**: `useInfiniteQuery`로 스크롤 시 자동으로 다음 페이지 로드
3. **이중 스크롤 감지**: RecycleScroller 이벤트 + Window 스크롤 fallback
4. **메모리 최적화**: 가상화로 1000+ 아이템도 성능 저하 없이 처리
5. **스켈레톤 UI**: 로딩 중 레이아웃 시프트 방지

### 스크롤 이벤트 처리 흐름

```typescript
// 1. 스크롤 감지
onScroll() -> handleScrollEnd() -> fetchNextPage()

// 2. 데이터 로딩
fetchNextPage() -> API 호출 -> 새 데이터 추가 -> UI 업데이트

// 3. 가상화 업데이트
$forceUpdate() -> 가시영역 재계산 -> DOM 업데이트
```

## 🔍 검색 구조

### 실시간 검색 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                     SearchBar                               │
├─────────────────────────────────────────────────────────────┤
│  Input Field  →  Debounced Handler  →  Search Query State   │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│               ServiceListContainer                          │
├─────────────────────────────────────────────────────────────┤
│  Watch searchQuery  →  Filter allServices  →  Update UI    │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│               filterServicesBySearch()                      │
├─────────────────────────────────────────────────────────────┤
│  • 서비스명 검색 (service.name)                              │
│  • 설명 검색 (description.ko/en)                            │
│  • URL 검색 (serviceUrl)                                   │
│  • 네트워크 검색 (supportNetwork)                           │
└─────────────────────────────────────────────────────────────┘
```

### 검색 기능 특징

1. **실시간 필터링**: 입력과 동시에 리스트 필터링 (debounce 적용)
2. **다중 필드 검색**: 서비스명, 설명, URL, 지원 네트워크 등 검색
3. **다국어 검색 지원**: 한국어/영어 설명 내용 모두 검색 가능
4. **검색 상태 관리**: 검색어 입력 시 가상 스크롤러와 연동
5. **사용자 친화적 UI**: 검색 아이콘, 클리어 버튼, 플레이스홀더

### 검색 알고리즘

```typescript
// 검색 로직 의사코드
function filterServicesBySearch(services, query) {
  if (!query.trim()) return services;
  
  const searchTerm = query.toLowerCase();
  
  return services.filter(service => 
    service.name.toLowerCase().includes(searchTerm) ||
    service.description?.ko?.toLowerCase().includes(searchTerm) ||
    service.description?.en?.toLowerCase().includes(searchTerm) ||
    service.serviceUrl.toLowerCase().includes(searchTerm) ||
    service.supportNetwork?.some(network => 
      network.toLowerCase().includes(searchTerm)
    )
  );
}
```

## 🌟 주요 구현 기능

### ✅ 필수 기능

- **🎠 상단 배너 슬라이더**
  - Swiper 기반 자동 슬라이드
  - 슬라이드 인디케이터
  - CTA 버튼 또는 이미지 클릭 시 URL 이동
  - 로딩 중 스켈레톤 UI

- **⭐ 즐겨찾기 리스트**
  - 삭제 버튼 클릭 시 확인 팝업
  - 삭제 후 UI 즉시 반영
  - 공통 Alert 컴포넌트 활용

- **📋 서비스 리스트**
  - 언어별 필터링 (한국어/영어)
  - 플랫폼별 필터링 (Android/iPhone)
  - 환경별 필터링 (dev/stage/prod)
  - 조건 조합에 따른 동적 표시

### ⚡ 성능 최적화

- **🚀 가상 스크롤링**
  - 1000+ 아이템 성능 저하 없이 렌더링
  - `vue-virtual-scroller` 활용
  - 메모리 효율적인 DOM 관리

- **♾️ 무한 스크롤**
  - TanStack Query `useInfiniteQuery` 사용
  - 스크롤 임계점 도달 시 자동 로딩
  - 페이지별 캐싱 및 상태 관리

- **🖼️ 이미지 최적화**
  - WebP 우선 지원 + fallback
  - Lazy Loading 적용
  - `<picture>` 태그 활용한 반응형 이미지

- **💀 스켈레톤 UI**
  - 로딩 중 레이아웃 시프트 방지
  - 각 섹션별 최적화된 스켈레톤
  - 사용자 경험 향상

### 🔍 검색 및 필터링

- **🔎 실시간 검색**
  - 서비스명, 설명, URL 검색 지원
  - 다국어 검색 (한국어/영어)
  - Debounce 적용으로 성능 최적화

- **🎯 스마트 필터링**
  - 현재 환경에 맞는 서비스만 표시
  - User Agent 기반 디바이스 감지
  - 환경변수 기반 빌드 환경 분기

### 🌍 다국어 지원

- **🗣️ Vue i18n 활용**
  - 한국어/영어 지원
  - 브라우저 언어 자동 감지
  - URL 기반 언어 전환 (`/ko/discovery`, `/en/discovery`)

## 🔧 환경별 구성

### 환경 분리

- **Development**: Mock 데이터 사용 (MSW)
- **Staging**: 스테이징 API 서버 연동
- **Production**: 프로덕션 API 서버 연동

### 환경변수

```bash
# .env.dev
VITE_APP_ENV=dev
VITE_API_BASE_URL=https://dev.api.dcentwallet.com

# .env.stage  
VITE_APP_ENV=stage
VITE_API_BASE_URL=https://stage.api.dcentwallet.com

# .env.prod
VITE_APP_ENV=prod
VITE_API_BASE_URL=https://prod.api.dcentwallet.com
```

## 🧪 테스트

```bash
# 단위 테스트
pnpm test:unit

# E2E 테스트  
pnpm test:e2e

# 린팅
pnpm lint

# 포맷팅
pnpm format
```

## 📝 개발 가이드

### 컴포넌트 개발 원칙

1. **단일 책임 원칙**: 각 컴포넌트는 하나의 명확한 역할
2. **Props 인터페이스**: TypeScript 인터페이스로 Props 타입 정의
3. **Composition API**: `<script setup>` 문법 사용
4. **반응형 상태**: `ref`, `computed`, `watch` 적절히 활용

### 상태 관리 전략

- **전역 상태**: 서버 데이터는 TanStack Query로 관리
- **지역 상태**: 컴포넌트별 UI 상태는 `ref`/`reactive` 사용  
- **공통 UI**: Alert, BottomSheet는 Composable 패턴 활용

## 🚧 알려진 이슈 및 개선사항

### 현재 알려진 이슈

- 가상화 목록에서 간헐적인 layout shift 발생
- 일부 브라우저에서 스크롤 감지 지연

### 향후 개선 계획

- [ ] 웹 접근성 강화 (ARIA 속성, 키보드 네비게이션)
- [ ] 테스트 커버리지 확대
- [ ] PWA 기능 추가
- [ ] 성능 모니터링 도구 연동 (Sentry)

## 🤖 AI 도구 활용

### 사용된 AI 도구

- **개발환경 구성**: Grok, Gemini CLI 활용한 기술 스택 선정
- **코딩**: GitHub Copilot (Claude Sonnet 4) 활용
  - 컴포넌트 구조 설계 및 구현
  - TypeScript 타입 정의
  - 테스트 코드 작성
- **문서화**: README 작성 시 구조 정리

### 프롬프트 전략

- 명확한 요구사항과 제약조건 명시
- 단계별 구현 지시 (배너 → 리스트 → 검색)
- 코드 리뷰 반복을 통한 품질 개선

## 📄 라이선스

이 프로젝트는 IoTrust 실기 과제 목적으로 개발되었습니다.
