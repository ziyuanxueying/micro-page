import './index.less'
import { MateType, MatesType } from './type'
import store from './json.tsx'
import Content from './components/content/index.tsx'
import Items from './components/items/index.tsx'

const modules = import.meta.glob<{ default: MateType }>('./metas/**/index.tsx')
const metas: MatesType = {}
for (const path in modules) {
  modules[path]().then(module => {
    if (Object.keys(metas).includes(module.default.group)) {
      metas[module.default.group].push(module.default)
    } else {
      metas[module.default.group] = [module.default]
    }
  })
}

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
        <Items metas={metas} pushModule={pushModule} />
      </div>
      <div className="editor-content">
        <Content components={components} />
      </div>
      <div className="editor-set">3</div>
    </div>
  )
}

export default TemplateEngine
