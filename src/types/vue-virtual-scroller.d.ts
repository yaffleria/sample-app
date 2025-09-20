declare module 'vue-virtual-scroller' {
  import type { DefineComponent } from 'vue'

  export const RecycleScroller: DefineComponent<
    {
      items: unknown[]
      itemSize: number | string | ((item: unknown, index: number) => number)
      keyField: string
      direction?: 'vertical' | 'horizontal'
      buffer?: number
      pageMode?: boolean
      prerender?: number
      emitUpdate?: boolean
    },
    object,
    unknown
  >

  export const DynamicScroller: DefineComponent<
    {
      items: unknown[]
      minItemSize: number | string
      keyField: string
      direction?: 'vertical' | 'horizontal'
      buffer?: number
    },
    object,
    unknown
  >

  export const DynamicScrollerItem: DefineComponent<
    {
      item: unknown
      active: boolean
      sizeDependencies: unknown[]
      watchData: boolean
      tag: string
      emitResize: boolean
    },
    object,
    unknown
  >
}
