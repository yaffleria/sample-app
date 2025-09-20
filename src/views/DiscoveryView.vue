<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
<template>
  <div>
    <h1>{{ t('dapp_favorite_title') }}</h1>
    <h1>{{ t('dapp_list_title') }}</h1>
  </div>
</template>
