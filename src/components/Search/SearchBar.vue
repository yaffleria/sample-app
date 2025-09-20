<template>
  <div class="relative">
    <div class="relative">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('search_services_placeholder')"
        class="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 transition-colors duration-200"
        @input="handleSearchInput"
        @keyup.enter="handleSearchSubmit"
      />

      <!-- Search Icon -->
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchGlassIcon class="h-5 w-5 text-gray-400" />
      </div>

      <!-- Clear Button -->
      <button
        v-if="searchQuery"
        @click="handleClear"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <SearchClearIcon class="h-5 w-5" />
      </button>
    </div>

    <!-- Search suggestions (optional for future enhancement) -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
    >
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="handleSuggestionClick(suggestion)"
        class="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-100 last:border-b-0"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { SearchGlassIcon, SearchClearIcon } from '@/components/Icon'

  interface Props {
    modelValue: string
    placeholder?: string
    suggestions?: string[]
    showSuggestions?: boolean
    debounceMs?: number
  }

  interface Emits {
    (e: 'update:modelValue', value: string): void
    (e: 'search', value: string): void
    (e: 'clear'): void
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '',
    suggestions: () => [],
    showSuggestions: false,
    debounceMs: 300,
  })

  const emit = defineEmits<Emits>()
  const { t } = useI18n()

  const searchQuery = ref(props.modelValue)
  let debounceTimeout: number

  // Watch for external changes to modelValue
  watch(
    () => props.modelValue,
    (newValue) => {
      searchQuery.value = newValue
    }
  )

  // Watch for search query changes with debounce
  watch(searchQuery, (newValue) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      emit('update:modelValue', newValue)
      emit('search', newValue)
    }, props.debounceMs)
  })

  const handleSearchInput = () => {
    // Input is handled by v-model and watchers
  }

  const handleSearchSubmit = () => {
    clearTimeout(debounceTimeout)
    emit('search', searchQuery.value)
  }

  const handleClear = () => {
    clearTimeout(debounceTimeout)
    searchQuery.value = ''
    emit('clear')
  }

  const handleSuggestionClick = (suggestion: string) => {
    clearTimeout(debounceTimeout)
    searchQuery.value = suggestion
    emit('search', suggestion)
  }
</script>
