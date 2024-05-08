import './index.less'
import { MateType, MatesType } from './type'
import ItemTemplate from '../components/item-template'
import store from './json.tsx'

const modules = import.meta.glob<{ default: MateType }>('../page-editor/**/index.tsx')
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
// function
const TemplateEngine = () => {
  return (
    <div className="flex-between">
      <div className="editor-meta">
        {Object.entries(metas).map(([key, value]) => (
          <div key={key}>
            <div>{`${key}`}</div>
            <div className="meta-group flex-row">
              {value.map(meta => (
                <div key={meta.groupType} className="flex-column meta">
                  <img src={new URL(`../assets/${meta.icon}.svg`, import.meta.url).href} alt="" />
                  {meta.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="editor-content">
        {store.components.map(item => (
          <ItemTemplate key={item.id} type={item.temModule} />
        ))}
      </div>
      <div className="editor-set">3</div>
    </div>
  )
}

export default TemplateEngine
