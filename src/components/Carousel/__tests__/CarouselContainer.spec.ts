import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CarouselContainer from '../CarouselContainer.vue'
import type { Banner } from '@/types/discovery'

// Mock Swiper components
vi.mock('swiper/vue', () => ({
  Swiper: {
    name: 'Swiper',
    props: ['modules', 'slidesPerView', 'spaceBetween', 'loop', 'autoplay'],
    emits: ['slide-change'],
    template: '<div data-testid="swiper"><slot /></div>',
  },
  SwiperSlide: {
    name: 'SwiperSlide',
    template: '<div data-testid="swiper-slide"><slot /></div>',
  },
}))

vi.mock('swiper/modules', () => ({
  Autoplay: {},
}))

vi.mock('swiper/css', () => ({}))

// Mock the i18n composable
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: { value: 'en' },
  }),
}))

// Mock CarouselSlide component
vi.mock('../CarouselSlide.vue', () => ({
  default: {
    name: 'CarouselSlide',
    props: ['banner', 'currentLocale', 'currentSlide', 'totalSlides'],
    template: '<div data-testid="carousel-slide">{{ banner.name }}</div>',
  },
}))

describe('CarouselContainer', () => {
  const mockBanners: Banner[] = [
    {
      name: 'Banner 1',
      imageUrl: { en: 'image1-en.jpg', ko: 'image1-ko.jpg' },
      description: { en: 'Description 1', ko: '설명 1' },
      ctaLinkUrl: { en: 'link1-en', ko: 'link1-ko' },
      ctaButtonText: { en: 'Button 1', ko: '버튼 1' },
    },
    {
      name: 'Banner 2',
      imageUrl: { en: 'image2-en.jpg', ko: 'image2-ko.jpg' },
      description: { en: 'Description 2', ko: '설명 2' },
      ctaLinkUrl: { en: 'link2-en', ko: 'link2-ko' },
      ctaButtonText: { en: 'Button 2', ko: '버튼 2' },
    },
    {
      name: 'Banner 3',
      imageUrl: { en: 'image3-en.jpg', ko: 'image3-ko.jpg' },
      description: { en: 'Description 3', ko: '설명 3' },
      ctaLinkUrl: { en: 'link3-en', ko: 'link3-ko' },
      ctaButtonText: { en: 'Button 3', ko: '버튼 3' },
    },
  ]

  it('renders Swiper component with correct props', () => {
    const wrapper = mount(CarouselContainer, {
      props: { banners: mockBanners },
    })

    const swiper = wrapper.findComponent({ name: 'Swiper' })
    expect(swiper.exists()).toBe(true)
    expect(swiper.props()).toEqual({
      modules: [{}], // Autoplay module (mocked as empty object)
      slidesPerView: 1,
      spaceBetween: 100,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    })
  })

  it('renders correct number of slides', () => {
    const wrapper = mount(CarouselContainer, {
      props: { banners: mockBanners },
    })

    const slides = wrapper.findAllComponents({ name: 'SwiperSlide' })
    expect(slides).toHaveLength(3)
  })

  it('renders CarouselSlide components with correct props', () => {
    const wrapper = mount(CarouselContainer, {
      props: { banners: mockBanners },
    })

    const carouselSlides = wrapper.findAllComponents({ name: 'CarouselSlide' })
    expect(carouselSlides).toHaveLength(3)

    // Check first slide props
    expect(carouselSlides[0].props()).toEqual({
      banner: mockBanners[0],
      currentLocale: 'en',
      currentSlide: 1, // currentSlideIndex (0) + 1
      totalSlides: 3,
    })

    // Check second slide props
    expect(carouselSlides[1].props()).toEqual({
      banner: mockBanners[1],
      currentLocale: 'en',
      currentSlide: 1, // currentSlideIndex starts at 0
      totalSlides: 3,
    })
  })

  it('handles empty banners array', () => {
    const wrapper = mount(CarouselContainer, {
      props: { banners: [] },
    })

    const slides = wrapper.findAllComponents({ name: 'SwiperSlide' })
    expect(slides).toHaveLength(0)

    const swiper = wrapper.findComponent({ name: 'Swiper' })
    expect(swiper.exists()).toBe(true)
  })

  it('updates slide index on slide change', async () => {
    const wrapper = mount(CarouselContainer, {
      props: { banners: mockBanners },
    })

    const swiper = wrapper.findComponent({ name: 'Swiper' })

    // Simulate slide change event
    await swiper.vm.$emit('slide-change', { realIndex: 2 })

    // Check that slide index was updated
    const carouselSlides = wrapper.findAllComponents({ name: 'CarouselSlide' })

    // All slides should now show currentSlide as 3 (realIndex 2 + 1)
    carouselSlides.forEach((slide) => {
      expect(slide.props('currentSlide')).toBe(3)
    })
  })

  it('handles single banner', () => {
    const singleBanner = [mockBanners[0]]
    const wrapper = mount(CarouselContainer, {
      props: { banners: singleBanner },
    })

    const slides = wrapper.findAllComponents({ name: 'SwiperSlide' })
    expect(slides).toHaveLength(1)

    const carouselSlide = wrapper.findComponent({ name: 'CarouselSlide' })
    expect(carouselSlide.props()).toEqual({
      banner: singleBanner[0],
      currentLocale: 'en',
      currentSlide: 1,
      totalSlides: 1,
    })
  })

  it('updates when banners prop changes', async () => {
    const wrapper = mount(CarouselContainer, {
      props: { banners: mockBanners.slice(0, 2) },
    })

    // Initially 2 slides
    expect(wrapper.findAllComponents({ name: 'SwiperSlide' })).toHaveLength(2)

    // Update to 3 slides
    await wrapper.setProps({ banners: mockBanners })
    expect(wrapper.findAllComponents({ name: 'SwiperSlide' })).toHaveLength(3)

    // Check totalSlides prop is updated
    const carouselSlides = wrapper.findAllComponents({ name: 'CarouselSlide' })
    carouselSlides.forEach((slide) => {
      expect(slide.props('totalSlides')).toBe(3)
    })
  })

  it('maintains correct slide numbering across different slide indices', async () => {
    const wrapper = mount(CarouselContainer, {
      props: { banners: mockBanners },
    })

    const swiper = wrapper.findComponent({ name: 'Swiper' })

    // Test different slide indices
    for (let i = 0; i < mockBanners.length; i++) {
      await swiper.vm.$emit('slide-change', { realIndex: i })

      const carouselSlides = wrapper.findAllComponents({ name: 'CarouselSlide' })
      carouselSlides.forEach((slide) => {
        expect(slide.props('currentSlide')).toBe(i + 1)
        expect(slide.props('totalSlides')).toBe(mockBanners.length)
      })
    }
  })

  it('renders banner names in slides (through mocked CarouselSlide)', () => {
    const wrapper = mount(CarouselContainer, {
      props: { banners: mockBanners },
    })

    const slideElements = wrapper.findAll('[data-testid="carousel-slide"]')
    expect(slideElements[0].text()).toBe('Banner 1')
    expect(slideElements[1].text()).toBe('Banner 2')
    expect(slideElements[2].text()).toBe('Banner 3')
  })
})
