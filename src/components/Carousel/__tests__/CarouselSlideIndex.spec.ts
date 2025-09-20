import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CarouselSlideIndex from '../CarouselSlideIndex.vue'

describe('CarouselSlideIndex', () => {
  it('renders slide index in correct format', () => {
    const wrapper = mount(CarouselSlideIndex, {
      props: {
        currentSlide: 2,
        totalSlides: 5,
      },
    })

    expect(wrapper.text()).toBe('2/5')
  })

  it('handles first slide correctly', () => {
    const wrapper = mount(CarouselSlideIndex, {
      props: {
        currentSlide: 1,
        totalSlides: 3,
      },
    })

    expect(wrapper.text()).toBe('1/3')
  })

  it('handles last slide correctly', () => {
    const wrapper = mount(CarouselSlideIndex, {
      props: {
        currentSlide: 10,
        totalSlides: 10,
      },
    })

    expect(wrapper.text()).toBe('10/10')
  })

  it('has correct CSS classes for positioning and styling', () => {
    const wrapper = mount(CarouselSlideIndex, {
      props: {
        currentSlide: 1,
        totalSlides: 3,
      },
    })

    const div = wrapper.find('div')
    expect(div.classes()).toContain('absolute')
    expect(div.classes()).toContain('bottom-4')
    expect(div.classes()).toContain('right-4')
    expect(div.classes()).toContain('text-white')
    expect(div.classes()).toContain('text-sm')
    expect(div.classes()).toContain('font-medium')
    expect(div.classes()).toContain('bg-black')
    expect(div.classes()).toContain('bg-opacity-50')
    expect(div.classes()).toContain('rounded')
  })

  it('updates when currentSlide changes', async () => {
    const wrapper = mount(CarouselSlideIndex, {
      props: {
        currentSlide: 1,
        totalSlides: 5,
      },
    })

    expect(wrapper.text()).toBe('1/5')

    await wrapper.setProps({ currentSlide: 3 })
    expect(wrapper.text()).toBe('3/5')
  })

  it('updates when totalSlides changes', async () => {
    const wrapper = mount(CarouselSlideIndex, {
      props: {
        currentSlide: 2,
        totalSlides: 3,
      },
    })

    expect(wrapper.text()).toBe('2/3')

    await wrapper.setProps({ totalSlides: 7 })
    expect(wrapper.text()).toBe('2/7')
  })

  it('handles single slide scenario', () => {
    const wrapper = mount(CarouselSlideIndex, {
      props: {
        currentSlide: 1,
        totalSlides: 1,
      },
    })

    expect(wrapper.text()).toBe('1/1')
  })

  it('handles edge case with zero values gracefully', () => {
    const wrapper = mount(CarouselSlideIndex, {
      props: {
        currentSlide: 0,
        totalSlides: 0,
      },
    })

    expect(wrapper.text()).toBe('0/0')
  })

  it('updates both props simultaneously', async () => {
    const wrapper = mount(CarouselSlideIndex, {
      props: {
        currentSlide: 1,
        totalSlides: 3,
      },
    })

    expect(wrapper.text()).toBe('1/3')

    await wrapper.setProps({ currentSlide: 4, totalSlides: 8 })
    expect(wrapper.text()).toBe('4/8')
  })
})
