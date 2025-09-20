# sample-app

## Working hours

> 평일 업무 하듯 도전

- 10~12:30 - 개발 환경 구성, 요건 확인
- 12:30-1:30 - Lunch
- 1:30~ - 구현

## Tech Stack

- Vue3: 가장 경험이 많은 프로젝트 사용, Nuxt/Next와 같은 SSR 지원 메타프레임워크는 이번 샘플 제작에 고려하지 않음
- i18n: 다국어 지원 라이브러리 사용
- tailwindcss: 신속한 스타일링을 위해 선정(Figma 토큰 스튜디오 연동을 가정)
- msw: Mock 서버용 도구
- Swiper: Carousel 구현 용도, 리소스 여유에 따라 인하우스 구현이나 shadcn 을 선호

## Comment

- 배너
  - 영역 데이터가 준비되지 않은 경우 레이아웃 쉬프트 방지를 위해 스켈레톤 이미지 제공
  - 버튼이 존재하지 않는 경우 이미지 클릭 시 링크 이동하도록 설정
- 다국어는 useI18n composable을 전역에서 참조하여, 필요 영역에서 올바르게 표시할 수 있도록 사용

## AI 도구

- 개발환경 구성과 요구사항 이해를 위해 Grok, Gemini CLI 를 사용
  - 프롬프트는 짧은 문답형으로, Carousl 사용에 가장 널리 사용되는 라이브러리나 모듈은?
  - 구성된 프로젝트 구조에 대해, 문제가 있는 부분이 존재하는지, 구조적으로 합리적인지?
- 코딩에서는 vscode, copilot(agent: claude sonnet 4)을 사용함(docs 폴더 내 요구사항 보존, 실제 업무할때는 다른 방식의 prompt 문서를 적거나, 연동을 할 것 같음)
  - 코딩의 비율은 50:50, 명확한 지시 후, 코드 리뷰, 주로 영어를 사용하며 한글은 답이 만족스럽지 못한 경우가 많아 잘 사용하지 않음
    - 배너 지시 사항 사례
      - components/Carousel 폴더 아래 CarouselContainer.vue 생성, bannerData 참조하여 locale에 맞도록 슬라이드 표시
      - 로딩 중 layout shift 를 방지 하기 위한 CarouselSkeleton.vue 컴포넌트 생성 및 적용
      - CarouselButton, Description, Image, SlideIndex 를 각각 파일별로 분리 생성을 지시하며 컴포넌트를 작은 단위로 생성함
  - 테스트 코드는 100% 위임

## 주절주절

- 블록체인 환경이면 dev, stage, prod가 testnet, mainnet 구분과 동일한 것 같단 추측
- 샘플이지만 favicon도 있다
