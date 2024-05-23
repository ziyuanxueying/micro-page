import useStore, { type Component } from '@/store'
import ItemTemplate from '../components/ItemTemplate'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

type ContentItemProps = {
  data: Component
  index: number
  id: any
  move: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const ContentItem = ({ data, id, index, move }: ContentItemProps) => {
  const { selectedComponentId, updateSelectedComponentId, removeComponent } = useStore()
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      move(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const handleClick = (item: Component) =>
    updateSelectedComponentId(selectedComponentId === item.id ? undefined : item.id)

  return (
    <div
      ref={ref}
      key={data.id}
      data-handler-id={handlerId}
      onClick={() => handleClick(data)}
      css={css`
        cursor: pointer;
        border: 1px dashed;
        cursor: move;
        border-color: ${data.id === selectedComponentId ? '#20a0ff' : 'transparent'};
        opacity: ${isDragging ? 0 : 1};
        position: relative;
      `}
    >
      <>
        {selectedComponentId === data.id && (
          <Button
            type="text"
            css={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
            icon={<DeleteOutlined />}
            onClick={() => removeComponent(data.id)}
          />
        )}
        <ItemTemplate key={id} type={data.temModule} id={id} />
      </>
    </div>
  )
}

export default ContentItem
