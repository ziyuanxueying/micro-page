import { ItemType } from '../type'
const moduleTem = import.meta.glob<{ default: React.ComponentType<any> }>('../metas/**/*Tem.tsx')
const moduleSet = import.meta.glob<{ default: React.ComponentType<any> }>('../metas/**/*Set.tsx')
const components: ItemType = {}
for (const path in moduleTem) {
  const module = await moduleTem[path]()
  const filename = (path.split('/').pop() || '').slice(0, -4) // 提取文件名
  components[filename] = module.default
}
for (const path in moduleSet) {
  const module = await moduleSet[path]()
  const filename = (path.split('/').pop() || '').slice(0, -4) // 提取文件名
  components[filename] = module.default
}
interface ItemProps {
  type: string
}
const ItemTemplate = (props: ItemProps) => {
  const Component = components[props.type]
  return Component ? <Component /> : null
}

export default ItemTemplate
