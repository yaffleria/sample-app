<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
<template>
  <!-- 메인 컨테이너: 100dvh로 전체 높이, 모바일 퍼스트 -->
  <div class="min-h-[100dvh] bg-gray-50 flex flex-col items-center">
    <!-- 상단 배너 섹션 -->
    <section class="w-full mb-6">상단 배너 섹션</section>

    <!-- 즐겨찾기 리스트 섹션 -->
    <section class="w-full mb-6 bg-white rounded-lg shadow-sm">
      {{ t('favorites') }}
    </section>

    <!-- 서비스 리스트 섹션 -->
    <section class="w-full flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
      {{ t('services') }}
    </section>
  </div>
</template>
