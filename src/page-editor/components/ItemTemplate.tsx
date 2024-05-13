import { ItemType } from '../type'

const moduleTem = import.meta.glob<React.ComponentType<any>>('../metas/**/*Tem.tsx', {
  import: 'default',
})
const moduleSet = import.meta.glob<React.ComponentType<any>>('../metas/**/*Set.tsx', {
  import: 'default',
})

const components: ItemType = {}

const importAll = async () => {
  for (const path in moduleTem) {
    const module = await moduleTem[path]()
    const filename = (path.split('/').pop() || '').slice(0, -4) // 提取文件名
    components[filename] = module
  }
  for (const path in moduleSet) {
    const module = await moduleSet[path]()
    const filename = (path.split('/').pop() || '').slice(0, -4) // 提取文件名
    components[filename] = module
  }
}
importAll()

interface ItemProps {
  type: string
}

const ItemTemplate = (props: ItemProps) => {
  const Component = components[props.type]
  return Component ? <Component /> : null
}

export default ItemTemplate
