// import { MateType, MatesType } from '../type'
import { Component, Group } from '@/store'
import Item from './Item'
import { Typography } from 'antd'
import { flex, flexc } from '@/styles/global'
import { DragOutlined } from '@ant-design/icons'

const { Text } = Typography

type Metas = Record<Group, Component[]>

const MetasBar = () => {
  const [metas, setMetas] = useState<Metas>({
    业务组件: [],
    基础组件: [],
  })
  // const [collapsed,setCollapsed] = useState(true)
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
      modules = modules.sort((a: any, b: any) => (a.sort > b.sort ? 1 : -1))
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
    <div css={css([flex])}>
      {/* {collapsed ? null : ( */}
      <div
        css={css([
          flexc,
          {
            width: 220,
            boxSizing: 'border-box',
            borderRadius: 4,
            paddingLeft: 5,
            background: '#fff',
            borderRight: '1px solid #F3F5F7',
            flexShrink: 0,
          },
        ])}
      >
        <Text type="secondary" css={css({ fontSize: 12, color: '#BABABA', marginBottom: 16 })}>
          <DragOutlined />
          拖拽进行组件添加
        </Text>
        {Object.entries(metas).map(([key, value]) => (
          <div
            key={key}
            css={css`
              width: 235px;
              margin-bottom: 4px;
            `}
          >
            <Text>{key}</Text>
            <div css={css({ marginBottom: 10 })}></div>
            {value.map(meta => (
              <Item key={meta.metaType} data={meta} />
            ))}
          </div>
        ))}
      </div>
      {/* )} */}

      {/* <Button
        type="link"
        size="small"
        onClick={() => {
          setCollapsed(!collapsed)
        }}
        style={{
          position: 'relative',
          top: 230,
          height: 100,
          width: 20,
          left: -10,
          background: '#f7f7f7',
          color: '#636363',
          marginLeft: `${collapsed ? 20 : 0}px`,
        }}
      >
        <DoubleRightOutlined
          style={{
            transition: '0.3s all',
            transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
          }}
        />
      </Button> */}
    </div>
  )
}

export default MetasBar
