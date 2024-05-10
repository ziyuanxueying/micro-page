import { MateType, MatesType } from '../../type'
import Item from './Item'
import { Typography } from 'antd'

const { Text } = Typography

interface ContentProps {
  pushModule: (meta: MateType) => void
}

const Content = ({ pushModule }: ContentProps) => {
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
  // const customStyles = css`
  //   color: red;
  //   font-size: 16px;
  // `
  return (
    <div className="w-50 p-10px rounded bg-#faebd7 shadow flex flex-col gap-2.5">
      {Object.entries(metas).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-2.5">
          <Text className="text-base">{key}</Text>
          <div className="grid grid-cols-2 gap-2">
            {value.map(meta => (
              <Item data={meta} key={meta.name} pushModule={pushModule} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Content
