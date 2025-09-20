import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CarouselImage from '../CarouselImage.vue'

describe('CarouselImage', () => {
  const defaultProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
  }

  it('renders non-clickable image by default', () => {
    const wrapper = mount(CarouselImage, {
      props: defaultProps,
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    expect(img.attributes('alt')).toBe('Test image')

    // Should not be wrapped in a link
    const link = wrapper.find('a')
    expect(link.exists()).toBe(false)
  })

  it('renders clickable image when isClickable is true and href is provided', () => {
    const wrapper = mount(CarouselImage, {
      props: {
        ...defaultProps,
        href: 'https://example.com',
        isClickable: true,
      },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')

    const img = link.find('img')
    expect(img.exists()).toBe(true)
    expect(img.classes()).toContain('cursor-pointer')
  })

  it('renders non-clickable image when isClickable is false', () => {
    const wrapper = mount(CarouselImage, {
      props: {
        ...defaultProps,
        href: 'https://example.com',
        isClickable: false,
      },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(false)

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.classes()).not.toContain('cursor-pointer')
  })

  it('renders non-clickable image when href is not provided', () => {
    const wrapper = mount(CarouselImage, {
      props: {
        ...defaultProps,
        isClickable: true,
      },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(false)

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
  })

  it('has correct CSS classes for image styling', () => {
    const wrapper = mount(CarouselImage, {
      props: defaultProps,
    })

    const img = wrapper.find('img')
    expect(img.classes()).toContain('w-full')
    expect(img.classes()).toContain('h-full')
    expect(img.classes()).toContain('object-cover')
  })

  it('updates image source when prop changes', async () => {
    const wrapper = mount(CarouselImage, {
      props: defaultProps,
    })

    await wrapper.setProps({ src: 'https://example.com/new-image.jpg' })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/new-image.jpg')
  })

  it('toggles between clickable and non-clickable states', async () => {
    const wrapper = mount(CarouselImage, {
      props: {
        ...defaultProps,
        href: 'https://example.com',
        isClickable: false,
      },
    })

    // Initially non-clickable
    expect(wrapper.find('a').exists()).toBe(false)

    // Make it clickable
    await wrapper.setProps({ isClickable: true })
    expect(wrapper.find('a').exists()).toBe(true)

    // Make it non-clickable again
    await wrapper.setProps({ isClickable: false })
    expect(wrapper.find('a').exists()).toBe(false)
  })
})
