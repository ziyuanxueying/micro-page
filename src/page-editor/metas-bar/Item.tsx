import { Typography, message } from 'antd'
import { useDrag } from 'react-dnd'
import useStore, { Component } from '@/store'
import { v4 as uuidv4 } from 'uuid'

const { Text } = Typography

type ItemProps = {
  data: Component
}

const Item = ({ data }: ItemProps) => {
  const { pushComponent, updateSelectedComponentId } = useStore()
  const [messageApi, contextHolder] = message.useMessage()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: data,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ name: string }>()
      if (item && dropResult) {
        const id = uuidv4()
        pushComponent({ ...item, id })
          ? messageApi.open({
              type: 'error',
              content: '该组件只能添加一个',
            })
          : updateSelectedComponentId(id)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (
    <div
      ref={drag}
      data-testid={`box`}
      key={data.name}
      css={css`
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: solid 1px #999;
        border-radius: 4px;
        opacity: ${isDragging ? 0.4 : 1};
        cursor: ${isDragging ? 'grabbing' : 'pointer'};

        &:hover {
          background-color: #ecd0ad;
        }
      `}
    >
      {contextHolder}
      <img
        src={new URL(`@/assets/${data.icon}.svg`, import.meta.url).href}
        css={css`
          height: 25px;
        `}
      />
      <Text
        css={css({
          fontSize: 12,
          marginTop: 2,
        })}
      >
        {data.name}
      </Text>
    </div>
  )
}

export default Item
