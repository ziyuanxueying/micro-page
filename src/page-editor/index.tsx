import './index.less'
import { MateType, MatesType } from './type'
const modules = import.meta.glob<{ default: MateType }>('../page-editor/**/index.tsx')
const metas: MatesType = {}
for (const path in modules) {
  // const mod = modules[path]
  // console.log('path', path, 'mod', mod)
  modules[path]().then(module => {
    if (Object.keys(metas).includes(module.default.group)) {
      metas[module.default.group].push(module.default)
    } else {
      metas[module.default.group] = [module.default]
    }
    console.log(`Content from ${path}:`, module.default)
  })
}
console.log('metas: ', metas)
const TemplateEngine = () => {
  return (
    <div className="flex-between">
      <div className="editor-meta">
        {Object.entries(metas).map(([key, value]) => (
          <>
            <div key={key}>{`${key}`}</div>
            <div className="meta-group flex-row">
              {value.map((meta, index) => (
                <div key={index} className="flex-column meta">
                  <img src={new URL(`../assets/${meta.icon}.svg`, import.meta.url).href} alt="" />
                  {meta.name}
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
      <div className="editor-content">模板引擎</div>
      <div className="editor-set">3</div>
    </div>
  )
}

export default TemplateEngine
