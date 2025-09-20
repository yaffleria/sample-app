import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CarouselButton from '../CarouselButton.vue'

describe('CarouselButton', () => {
  const defaultProps = {
    href: 'https://example.com',
    text: 'Click me',
  }

  it('renders with correct text', () => {
    const wrapper = mount(CarouselButton, {
      props: defaultProps,
    })

    expect(wrapper.text()).toBe('Click me')
  })

  it('renders with correct href attribute', () => {
    const wrapper = mount(CarouselButton, {
      props: defaultProps,
    })

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://example.com')
  })

  it('has correct link attributes for external links', () => {
    const wrapper = mount(CarouselButton, {
      props: defaultProps,
    })

    const link = wrapper.find('a')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('has correct CSS classes for styling', () => {
    const wrapper = mount(CarouselButton, {
      props: defaultProps,
    })

    const link = wrapper.find('a')
    expect(link.classes()).toContain('absolute')
    expect(link.classes()).toContain('bottom-4')
    expect(link.classes()).toContain('left-4')
    expect(link.classes()).toContain('bg-white')
    expect(link.classes()).toContain('text-black')
    expect(link.classes()).toContain('rounded-full')
  })

  it('updates text when prop changes', async () => {
    const wrapper = mount(CarouselButton, {
      props: defaultProps,
    })

    await wrapper.setProps({ text: 'New Text' })
    expect(wrapper.text()).toBe('New Text')
  })

  it('updates href when prop changes', async () => {
    const wrapper = mount(CarouselButton, {
      props: defaultProps,
    })

    await wrapper.setProps({ href: 'https://newsite.com' })
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://newsite.com')
  })
})
