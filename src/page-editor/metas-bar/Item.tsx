import { Typography, message } from 'antd'
import { useDrag } from 'react-dnd'
import useStore, { Component } from '@/store'
import { v4 as uuidv4 } from 'uuid'

const { Text } = Typography

type ItemProps = {
  data: Component
}

const Item = ({ data }: ItemProps) => {
  const {
    pushComponent,
    updateSelectedComponentId,
    updatePageConfig,
    updateComponents,
    pageConfig,
    components,
  } = useStore()
  const [messageApi, contextHolder] = message.useMessage()
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'box',
      item: data,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<{ name: string }>()
        if (item && dropResult) {
          const id = uuidv4()
          if (pushComponent({ ...item, id })) {
            messageApi.open({
              type: 'error',
              content: '该组件只能添加一个',
            })
          } else {
            updatePageConfig({ ...pageConfig, tab: '1' })
            updateSelectedComponentId(id)
          }
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [pageConfig, updatePageConfig, components, updateComponents],
  )

  return (
    <div
      ref={drag}
      data-testid={`box`}
      key={data.name}
      css={css`
        width: 90px;
        height: 75px;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        margin-right: 10px;
        margin-bottom: 10px;
        background: #f7f7f7f7;
        opacity: ${isDragging ? 0.4 : 1};
        cursor: ${isDragging ? 'grabbing' : 'pointer'};
        &:hover {
          background: #e5e5e5;
        }
      `}
    >
      {contextHolder}
      {/* <img
        src="/assets/vite.svg"
        css={css`
          height: 25px;
        `}
      /> */}
      <img
        // src={`/public/assets/${data.icon}.svg`}
        src={`https://xcx02-test-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/micro-page/${data.icon}.svg`}
        css={css({ width: 25, height: 25, marginBottom: 6 })}
      />
      <Text
        css={css({
          fontSize: 12,
          color: '#636363',
        })}
      >
        {data.name}
      </Text>
    </div>
  )
}

export default Item
