import { ItemType } from '../../page-editor/type'
import './index.less'
const modulePaths = import.meta.glob<{ default: React.ComponentType<any> }>(
  '../../page-editor/**/*Tem.tsx',
)
const components: ItemType = {}
for (const path in modulePaths) {
  const module = await modulePaths[path]()
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
