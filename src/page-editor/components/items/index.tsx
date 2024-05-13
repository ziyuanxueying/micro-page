import { css } from '@emotion/react'
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
    const modules = import.meta.glob<MateType>('../../metas/**/index.tsx', {
      import: 'default',
    })
    const nextMetas: MatesType = {}

    const promises = []
    for (const path in modules) {
      promises.push(modules[path]())
    }

    Promise.all(promises).then(modules => {
      modules.forEach(module => {
        if (Object.keys(nextMetas).includes(module.group)) {
          nextMetas[module.group].push(module)
        } else {
          nextMetas[module.group] = [module]
        }
      })
      setMetas(nextMetas)
    })
  }, [])

  return (
    <div
      css={css`
        width: 200px;
        padding: 10px;
        border-radius: 4px;
        background-color: #faebd7;
        box-shadow: 0 8px 16px -2px rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {Object.entries(metas).map(([key, value]) => (
        <div
          key={key}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          <Text>{key}</Text>
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            `}
          >
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
