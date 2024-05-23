import { Typography } from 'antd'
import { useDrag } from 'react-dnd'
import useStore, { Component } from '@/store'

const { Text } = Typography

type ItemProps = {
  data: Component
}

const Item = ({ data }: ItemProps) => {
  const { pushComponent } = useStore()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: data,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{
        name: string
      }>()
      if (item && dropResult) {
        pushComponent(item)
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
      <img
        src={new URL(`../../assets/${data.icon}.svg`, import.meta.url).href}
        css={css`
          width: 30px;
          height: 30px;
        `}
      />
      <Text style={{ fontSize: 12 }}>{data.name}</Text>
    </div>
  )
}

export default Item
