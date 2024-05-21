import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools'

export type Component = {
  id?: string | number
  name: string
  group: string
  icon: string
  metaType: string
  temModule: string
  setModule: string
  data?: any // 这里的 any 可以替换为具体的数据类型
}

export type Store = {
  components: Component[]
  selectedComponentId: Component['id'] | undefined
  pushComponent: (component: Component) => void
  updateComponentById: (id: Component['id'], data: Omit<Component, 'id'>) => void
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
          id: Date.now(),
        })
      })
    },
    updateComponentById: (id, data) =>
      set(state => {
        const index = state.components.findIndex(item => item.id === id)
        state.components[index] = { ...data, id: state.components[index].id }
      }),
    updateSelectedComponentId: id => set({ selectedComponentId: id }),
  })),
)

// Inspect your zustand store in React DevTools
if (import.meta.env.DEV) {
  mountStoreDevtool('Store', useStore)
}

export default useStore
