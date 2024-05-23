import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { v4 as uuidv4 } from 'uuid'

export type Group = '业务组件' | '基础组件'

export type Component = {
  id?: string
  name: string
  group: Group
  icon: string
  metaType: string
  temModule: string
  setModule: string
  data?: Record<string, any> // 这里的 any 可以替换为具体的数据类型
}

export type Store = {
  components: Component[]
  selectedComponentId: Component['id'] | undefined
  pushComponent: (component: Component) => void
  updateComponents: (components: Component[]) => void
  updateComponent: (id: Component['id'], data: Omit<Component, 'id'>) => void
  removeComponent: (id: Component['id']) => void
  updateSelectedComponentId: (id: Store['selectedComponentId']) => void
}

export const useStore = create<Store>()(
  immer(set => ({
    components: [],
    selectedComponentId: undefined,
    pushComponent: component => {
      set(state => {
        state.components.push({
          ...component,
          id: uuidv4(),
        })
      })
    },
    updateComponents: components => set({ components }),
    updateComponent: (id, data) =>
      set(state => {
        const index = state.components.findIndex(item => item.id === id)
        state.components[index] = { ...data, id: state.components[index].id }
      }),
    removeComponent: id =>
      set(state => {
        state.components = state.components.filter(item => item.id !== id)
      }),
    updateSelectedComponentId: id => set({ selectedComponentId: id }),
  })),
)

// Inspect your zustand store in React DevTools
if (import.meta.env.DEV) {
  mountStoreDevtool('Store', useStore)
}

export default useStore
