import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CarouselSlide from '../CarouselSlide.vue'
import type { BannerListItem } from '@/types/banner'

// Mock the sub-components
vi.mock('../CarouselImage.vue', () => ({
  default: {
    name: 'CarouselImage',
    props: ['src', 'alt', 'href', 'isClickable'],
    template: '<div data-testid="carousel-image">{{ src }}</div>',
  },
}))

vi.mock('../CarouselButton.vue', () => ({
  default: {
    name: 'CarouselButton',
    props: ['href', 'text'],
    template: '<div data-testid="carousel-button">{{ text }}</div>',
  },
}))

vi.mock('../CarouselSlideIndex.vue', () => ({
  default: {
    name: 'CarouselSlideIndex',
    props: ['currentSlide', 'totalSlides'],
    template: '<div data-testid="carousel-slide-index">{{ currentSlide }}/{{ totalSlides }}</div>',
  },
}))

vi.mock('../CarouselDescription.vue', () => ({
  default: {
    name: 'CarouselDescription',
    props: ['description'],
    template: '<div data-testid="carousel-description">{{ description }}</div>',
  },
}))

describe('CarouselSlide', () => {
  const mockBanner: BannerListItem = {
    name: 'Test Banner',
    imageUrl: {
      en: 'https://example.com/image-en.jpg',
      ko: 'https://example.com/image-ko.jpg',
    },
    description: {
      en: 'Test description in English',
      ko: 'Test description in Korean',
    },
    ctaLinkUrl: {
      en: 'https://example.com/en',
      ko: 'https://example.com/ko',
    },
    ctaButtonText: {
      en: 'Click Here',
      ko: '클릭하세요',
    },
  }

  const defaultProps = {
    banner: mockBanner,
    currentLocale: 'en' as const,
    currentSlide: 2,
    totalSlides: 5,
  }

  it('renders all required sub-components', () => {
    const wrapper = mount(CarouselSlide, {
      props: defaultProps,
    })

    expect(wrapper.find('[data-testid="carousel-image"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="carousel-button"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="carousel-slide-index"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="carousel-description"]').exists()).toBe(true)
  })

  it('passes correct props to CarouselImage when button text exists', () => {
    const wrapper = mount(CarouselSlide, {
      props: defaultProps,
    })

    const image = wrapper.findComponent({ name: 'CarouselImage' })
    expect(image.props()).toEqual({
      src: 'https://example.com/image-en.jpg',
      alt: 'Test description in English',
      href: 'https://example.com/en',
      isClickable: false, // Because button text exists
    })
  })

  it('passes correct props to CarouselButton when button text exists', () => {
    const wrapper = mount(CarouselSlide, {
      props: defaultProps,
    })

    const button = wrapper.findComponent({ name: 'CarouselButton' })
    expect(button.props()).toEqual({
      href: 'https://example.com/en',
      text: 'Click Here',
    })
  })

  it('passes correct props to CarouselSlideIndex', () => {
    const wrapper = mount(CarouselSlide, {
      props: defaultProps,
    })

    const slideIndex = wrapper.findComponent({ name: 'CarouselSlideIndex' })
    expect(slideIndex.props()).toEqual({
      currentSlide: 2,
      totalSlides: 5,
    })
  })

  it('passes correct props to CarouselDescription', () => {
    const wrapper = mount(CarouselSlide, {
      props: defaultProps,
    })

    const description = wrapper.findComponent({ name: 'CarouselDescription' })
    expect(description.props()).toEqual({
      description: 'Test description in English',
    })
  })

  it('makes image clickable when button text is empty', () => {
    const bannerWithoutButton: BannerListItem = {
      ...mockBanner,
      ctaButtonText: {
        en: '',
        ko: '',
      },
    }

    const wrapper = mount(CarouselSlide, {
      props: {
        ...defaultProps,
        banner: bannerWithoutButton,
      },
    })

    const image = wrapper.findComponent({ name: 'CarouselImage' })
    expect(image.props('isClickable')).toBe(true)

    // Button should not render when text is empty
    const button = wrapper.findComponent({ name: 'CarouselButton' })
    expect(button.exists()).toBe(false)
  })

  it('uses correct locale for Korean', () => {
    const wrapper = mount(CarouselSlide, {
      props: {
        ...defaultProps,
        currentLocale: 'ko',
      },
    })

    const image = wrapper.findComponent({ name: 'CarouselImage' })
    expect(image.props('src')).toBe('https://example.com/image-ko.jpg')
    expect(image.props('alt')).toBe('Test description in Korean')

    const button = wrapper.findComponent({ name: 'CarouselButton' })
    expect(button.props('href')).toBe('https://example.com/ko')
    expect(button.props('text')).toBe('클릭하세요')

    const description = wrapper.findComponent({ name: 'CarouselDescription' })
    expect(description.props('description')).toBe('Test description in Korean')
  })

  it('has correct container classes', () => {
    const wrapper = mount(CarouselSlide, {
      props: defaultProps,
    })

    const container = wrapper.find('.relative')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('w-full')
    expect(container.classes()).toContain('aspect-[16/9]')
  })

  it('updates when banner prop changes', async () => {
    const wrapper = mount(CarouselSlide, {
      props: defaultProps,
    })

    const newBanner: BannerListItem = {
      ...mockBanner,
      ctaButtonText: {
        en: 'New Button Text',
        ko: '새 버튼 텍스트',
      },
    }

    await wrapper.setProps({ banner: newBanner })

    const button = wrapper.findComponent({ name: 'CarouselButton' })
    expect(button.props('text')).toBe('New Button Text')
  })

  it('updates when slide index props change', async () => {
    const wrapper = mount(CarouselSlide, {
      props: defaultProps,
    })

    await wrapper.setProps({ currentSlide: 4, totalSlides: 8 })

    const slideIndex = wrapper.findComponent({ name: 'CarouselSlideIndex' })
    expect(slideIndex.props()).toEqual({
      currentSlide: 4,
      totalSlides: 8,
    })
  })
})
