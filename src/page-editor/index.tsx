import { MateType, componentsType } from './type'
import Content from './components/Content.tsx'
import Items from './components/items/index.tsx'
import Setting from './components/Setting.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import defaultJson from './json.ts'
console.log('defaultJson: ', defaultJson)

const style = css({
  display: 'flex',
  gap: 12,
  height: '100%',
})

const TemplateEngine = () => {
  const [components, setComponents] = useState<componentsType[]>([])
  const [selected, setSelected] = useState<componentsType>({
    id: 0,
    groupType: '',
    temModule: '',
    setModule: '',
    data: {},
  })

  const pushModule = (meta: MateType) => {
    setComponents((components: componentsType[]) => [
      ...components,
      {
        id: Date.now(),
        groupType: meta.groupType,
        temModule: meta.temModule,
        setModule: meta.setModule,
        data: defaultJson[meta.groupType as keyof typeof defaultJson],
      },
    ])
  }

  const selectModule = (meta: componentsType) => {
    console.log('meta: ', meta)
    setSelected(meta)
  }

  const onDataChange = (data: any) => {
    console.log('data: ', data)
    const item = components.find(item => item.id === selected.id)
    item && (item.data = data)
    // 更新组件数据
    setComponents([...components])
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <main css={style}>
        <Items pushModule={pushModule} />
        <Content components={components} selectModule={selectModule} />
        <Setting selected={selected} onDataChange={onDataChange} />
      </main>
    </DndProvider>
  )
}

export default TemplateEngine
