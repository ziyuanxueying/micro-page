import { MateType, componentsType } from './type'
import Content from './components/Content.tsx'
import Items from './components/items/index.tsx'
import Setting from './components/Setting.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const TemplateEngine = () => {
  const [components, setComponents] = useState<componentsType[]>([])
  const [selected, setSelected] = useState<componentsType>({
    id: 0,
    groupType: '',
    temModule: '',
    setModule: '',
  })

  const pushModule = (meta: MateType) => {
    setComponents((components: componentsType[]) => [
      ...components,
      {
        id: Date.now(),
        groupType: meta.groupType,
        temModule: meta.temModule,
        setModule: meta.setModule,
      },
    ])
  }

  const selectModule = (meta: componentsType) => {
    console.log('meta: ', meta)
    setSelected(meta)
    // setComponents((components: componentsType[]) => [
    //   ...components,
    //   {
    //     id: Date.now(),
    //     groupType: meta.groupType,
    //     temModule: meta.temModule,
    //     setModule: meta.setModule,
    //   },
    // ])
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="h-full flex gap-3">
        <Items pushModule={pushModule} />
        <div className="flex-1">
          <Content components={components} selectModule={selectModule} />
        </div>
        <div className="w-50 bg-#ffe4c4 rounded shadow">
          <Setting selected={selected} />
        </div>
      </main>
    </DndProvider>
  )
}

export default TemplateEngine
