// import { MateType, MatesType } from '../type'
import { Component, Group } from '@/store'
import Item from './Item'
import { Typography } from 'antd'
import { flexc } from '@/styles/global'
import { DragOutlined } from '@ant-design/icons'

const { Text } = Typography

type Metas = Record<Group, Component[]>

const MetasBar = () => {
  const [metas, setMetas] = useState<Metas>({
    业务组件: [],
    基础组件: [],
  })

  useEffect(() => {
    const modules = import.meta.glob<Component>('../metas/**/index.ts', {
      import: 'default',
    })

    const nextMetas: Metas = {
      业务组件: [],
      基础组件: [],
    }

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

      // sort nextMetas by order
      Object.keys(nextMetas).forEach(key => {
        // @ts-expect-error
        nextMetas[key] = nextMetas[key].sort((a, b) => a.order - b.order)
      })

      setMetas(nextMetas)
    })
  }, [])

  return (
    <div
      css={css([
        flexc,
        {
          width: 200,
          padding: 10,
          borderRadius: 4,
          background: '#fff',
          boxShadow: '0 8px 16px -2px rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)',
          gap: 12,
          flexShrink: 0,
        },
      ])}
    >
      <Text type="secondary">
        <DragOutlined />
        拖拽进行组件添加
      </Text>
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
              <Item key={meta.metaType} data={meta} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MetasBar
