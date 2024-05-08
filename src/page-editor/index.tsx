import './index.less'
import { MateType } from './type'
import store from './json.tsx'
import Content from './components/content/index.tsx'
import Items from './components/items/index.tsx'

const TemplateEngine = () => {
  const [components, setComponents] = useState<any>(store.components)

  function pushModule(meta: MateType) {
    setComponents((components: any) => [
      ...components,
      {
        id: Date.now(),
        groupType: meta.groupType,
        temModule: meta.temModule,
        setModule: meta.setModule,
      },
    ])
  }
  return (
    <div className="flex-between">
      <div className="editor-meta">
        <Items pushModule={pushModule} />
      </div>
      <div className="editor-content">
        <Content components={components} />
      </div>
      <div className="editor-set">3</div>
    </div>
  )
}

export default TemplateEngine
