import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 실제로 API 서버 연동 시는 Cross origin 요청을 위해 proxy 설정이 추가됨
  // 배포 환경은 Cross origin일 수도, 아닐 수도 있으니 인프라 구성에 따라 결정
})
