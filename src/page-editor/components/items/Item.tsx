import { Typography } from 'antd'
import { useDrag } from 'react-dnd'
import { MateType } from '../../type'

const { Text } = Typography

type ItemProps = {
  data: MateType
  pushModule: (meta: MateType) => void
}

const Item = ({ data, pushModule }: ItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: data,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{
        name: string
      }>()
      if (item && dropResult) {
        console.log(item)
        pushModule(item)
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
      className={cx(
        'py-2.5 flex flex-col items-center justify-center border border-solid border-#999 rounded-sm hover:bg-#ecd0ad',
        isDragging ? 'opacity-40 cursor-grabbing' : 'opacity-100 cursor-pointer',
      )}
    >
      <img
        src={new URL(`../../../assets/${data.icon}.svg`, import.meta.url).href}
        className="w-30px h-30px"
      />
      <Text>{data.name}</Text>
    </div>
  )
}

export default Item
