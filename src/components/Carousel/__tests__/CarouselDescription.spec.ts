import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CarouselDescription from '../CarouselDescription.vue'

describe('CarouselDescription', () => {
  it('renders description when text is provided', () => {
    const wrapper = mount(CarouselDescription, {
      props: {
        description: 'This is a test description',
      },
    })

    expect(wrapper.text()).toBe('This is a test description')
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('does not render when description is empty', () => {
    const wrapper = mount(CarouselDescription, {
      props: {
        description: '',
      },
    })

    expect(wrapper.find('div').exists()).toBe(false)
    expect(wrapper.text()).toBe('')
  })

  it('does not render when description is falsy', () => {
    const wrapper1 = mount(CarouselDescription, {
      props: {
        description: '',
      },
    })

    const wrapper2 = mount(CarouselDescription, {
      props: {
        description: '   ', // whitespace only
      },
    })

    expect(wrapper1.find('div').exists()).toBe(false)
    // Note: whitespace-only string will still render, but empty string won't
    expect(wrapper2.find('div').exists()).toBe(true)
  })

  it('has correct CSS classes for positioning and styling', () => {
    const wrapper = mount(CarouselDescription, {
      props: {
        description: 'Test description',
      },
    })

    const div = wrapper.find('div')
    expect(div.classes()).toContain('absolute')
    expect(div.classes()).toContain('top-6')
    expect(div.classes()).toContain('left-4')
    expect(div.classes()).toContain('text-white')
    expect(div.classes()).toContain('text-lg')
    expect(div.classes()).toContain('font-medium')
    expect(div.classes()).toContain('bg-opacity-50')
    expect(div.classes()).toContain('rounded')
    expect(div.classes()).toContain('max-w-xs')
  })

  it('updates description when prop changes', async () => {
    const wrapper = mount(CarouselDescription, {
      props: {
        description: 'Original description',
      },
    })

    expect(wrapper.text()).toBe('Original description')

    await wrapper.setProps({ description: 'Updated description' })
    expect(wrapper.text()).toBe('Updated description')
  })

  it('shows and hides based on description content', async () => {
    const wrapper = mount(CarouselDescription, {
      props: {
        description: 'Initial description',
      },
    })

    // Initially shown
    expect(wrapper.find('div').exists()).toBe(true)

    // Hide when empty
    await wrapper.setProps({ description: '' })
    expect(wrapper.find('div').exists()).toBe(false)

    // Show again when content is provided
    await wrapper.setProps({ description: 'New description' })
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.text()).toBe('New description')
  })

  it('handles long descriptions within max-width constraint', () => {
    const longDescription =
      'This is a very long description that should be constrained by the max-width class to prevent it from taking up too much space on the carousel slide'

    const wrapper = mount(CarouselDescription, {
      props: {
        description: longDescription,
      },
    })

    expect(wrapper.text()).toBe(longDescription)
    expect(wrapper.find('div').classes()).toContain('max-w-xs')
  })
})
