import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools'

export type Component = {
  id?: string | number
  name: string
  group: string
  icon: string
  groupType: string
  temModule: string
  setModule: string
  data?: any // 这里的 any 可以替换为具体的数据类型
}

export type Store = {
  components: Component[]
  pushComponent: (component: Component) => void
  selectedModule: Component | null
  setSelectedModule: (component: Component) => void
}

export const useStore = create<Store>()(
  immer(set => ({
    components: [],
    pushComponent: component => {
      set(state => {
        state.components.push({
          ...component,
          id: Date.now(),
        })
      })
    },
    selectedModule: null,
    setSelectedModule: module => set({ selectedModule: module }),
  })),
)

// Inspect your zustand store in React DevTools
if (import.meta.env.DEV) {
  mountStoreDevtool('Store', useStore)
}

export default useStore
