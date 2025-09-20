/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        mobile: '100%', // 모바일: 100% (기본)
        tablet: '640px', // 태블릿: 640px
        desktop: '1024px', // 데스크톱: 1024px
      },
      screens: {
        tablet: '640px', // 커스텀 브레이크포인트
        desktop: '1024px', // 커스텀 브레이크포인트
      },
    },
  },
}
