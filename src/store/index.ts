import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools'

export type Group = '业务组件' | '基础组件'

export type Component = {
  id?: string
  name: string
  group: Group
  icon: string
  metaType: string
  moduleType?: string
  temModule: string
  setModule: string
  data?: Record<string, any> // 这里的 any 可以替换为具体的数据类型
}

export type pageType = {
  id?: string
  title: string
  bgColor: string
  bgImage: string
  isShare?: boolean
  shareTitle?: string
  shareDesc?: string
  shareImg: string
  tab?: string
}
export type Store = {
  components: Component[]
  selectedComponentId: Component['id'] | undefined
  pushComponent: (component: Component) => void
  updateComponents: (components: Component[]) => void
  updateComponent: (id: Component['id'], component: Omit<Component, 'id'>) => void
  updateComponentData: (id: Component['id'], data: Component['data']) => void
  removeComponent: (id: Component['id']) => void
  updateSelectedComponentId: (id: Store['selectedComponentId']) => void
  pageConfig: pageType
  updatePageConfig: (pageData: pageType) => void
}

export const useStore = create<Store>()(
  immer(set => ({
    components: [],
    selectedComponentId: undefined,
    pushComponent: component => {
      set(state => {
        state.components.push(component)
      })
    },
    updateComponents: components => set({ components }),
    updateComponent(id, component) {
      set(state => {
        const index = state.components.findIndex(item => item.id === id)
        state.components[index] = component
      })
    },
    updateComponentData: (id, data) =>
      set(state => {
        const index = state.components.findIndex(item => item.id === id)
        state.components[index].data = data
      }),
    removeComponent: id =>
      set(state => {
        state.components = state.components.filter(item => item.id !== id)
      }),
    updateSelectedComponentId: id => set({ selectedComponentId: id }),
    pageConfig: { title: '默认标题', bgImage: '', shareImg: '', bgColor: '' },
    updatePageConfig: pageConfig => set({ pageConfig }),
  })),
)

// Inspect your zustand store in React DevTools
if (import.meta.env.DEV) {
  mountStoreDevtool('Store', useStore)
}

export default useStore
