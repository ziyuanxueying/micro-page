import { Component } from '@/store'

export type TemProps = {
  id: Component['id']
}

export type SetProps = Record<string, any>

const moduleTem = import.meta.glob<(props: TemProps) => JSX.Element>('../metas/**/*Tem.tsx', {
  import: 'default',
})
const moduleSet = import.meta.glob<(props: SetProps) => JSX.Element>('../metas/**/*Set.tsx', {
  // eager: true, // 如果你希望立即加载模块
  import: 'default',
})

const modules: Record<string, (props: TemProps | SetProps) => JSX.Element> = {}

const importAll = async () => {
  for (const path in moduleTem) {
    const module = await moduleTem[path]()
    const filename = (path.split('/').pop() || '').slice(0, -4) // 提取文件名
    modules[filename] = module as (props: TemProps | SetProps) => JSX.Element
  }
  for (const path in moduleSet) {
    const module = await moduleSet[path]()
    const filename = (path.split('/').pop() || '').slice(0, -4) // 提取文件名
    modules[filename] = module
  }
}
importAll()

interface ItemProps {
  type: Component['temModule'] | Component['setModule']
  id?: Component['id']
}

const ItemTemplate = (props: ItemProps) => {
  const Component = modules[props.type]
  return Component ? <Component id={props.id} /> : null
}

export default ItemTemplate
