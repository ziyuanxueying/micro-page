import './index.less'
import { MateType, componentsType } from './type'
import Content from './components/Content.tsx'
import Items from './components/items/index.tsx'
import Setting from './components/Setting.tsx'

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
  }
  return (
    <div className="flex-between">
      <div className="editor-meta">
        <Items pushModule={pushModule} />
      </div>
      <div className="editor-content">
        <Content components={components} selectModule={selectModule} />
      </div>
      <div className="editor-set">
        <Setting selected={selected} />
      </div>
    </div>
  )
}

export default TemplateEngine
