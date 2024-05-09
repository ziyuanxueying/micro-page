import { MateType, MatesType } from '../../type'
import './index.less'
interface ItemProps {
  pushModule: (meta: MateType) => void
}
const Content = (props: ItemProps) => {
  const [metas, setMetas] = useState<MatesType>({})

  useEffect(() => {
    const modules = import.meta.glob<{ default: MateType }>('../../metas/**/index.tsx')
    const nextMetas: MatesType = {}

    const promises = []
    for (const path in modules) {
      promises.push(modules[path]())
    }

    Promise.all(promises).then(modules => {
      modules.forEach(module => {
        if (Object.keys(nextMetas).includes(module.default.group)) {
          nextMetas[module.default.group].push(module.default)
        } else {
          nextMetas[module.default.group] = [module.default]
        }
      })
      setMetas(nextMetas)
    })
  }, [])

  return (
    <>
      {Object.entries(metas).map(([key, value]) => (
        <div key={key}>
          <div>{`${key}`}</div>
          <div className="flex flex-row flex-wrap justify-between mt-2.5">
            {value.map(meta => (
              <div
                key={meta.groupType}
                className="flex-column meta"
                onClick={() => props.pushModule(meta)}
              >
                <img
                  src={new URL(`../../../assets/${meta.icon}.svg`, import.meta.url).href}
                  alt=""
                />
                {meta.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default Content
