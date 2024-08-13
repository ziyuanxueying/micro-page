import useStore, { type Component } from '@/store'
import ItemTemplate from '../components/ItemTemplate'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import { Image } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { checkSaveInfo, defaultImage } from '@/utils'

type ContentItemProps = {
  data: Component
  index: number
  id: string
  move: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const ContentItem = ({ data, id, index, move }: ContentItemProps) => {
  const {
    selectedComponentId,
    components,
    updateSelectedComponentId,
    removeComponent,
    pageConfig,
    updatePageConfig,
    updateComponents,
  } = useStore()
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

  const handleClick = (item: Component) => {
    updateSelectedComponentId(selectedComponentId === item.id ? undefined : item.id)
    selectedComponentId !== item.id && updatePageConfig({ ...pageConfig, tab: '1' })
    const { list } = checkSaveInfo({ components, pageConfig })
    updateComponents(list)
  }

  const content = (style?: ReturnType<typeof css>) => (
    <div
      ref={ref}
      key={data.id}
      data-handler-id={handlerId}
      onClick={() => handleClick(data)}
      css={css(
        {
          boxSizing: 'content-box',
          cursor: 'move',
          border: '2px dashed',
          borderColor: data.isError
            ? 'red'
            : data.id === selectedComponentId
            ? '#000000'
            : 'transparent',
          opacity: isDragging ? 0 : 1,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          marginTop: -2,
          flexDirection: 'column',
          alignItems: 'center',
          ':hover': {
            borderColor: data.isError ? 'red' : '#000000',
            div: {
              opacity: 1,
              pointerEvents: 'all',
            },
          },
        },
        style,
      )}
    >
      <div
        css={{
          opacity: selectedComponentId === data.id ? 1 : 0,
          pointerEvents: selectedComponentId === data.id ? 'all' : 'none',
          width: 24,
          height: 24,
          borderRadius: '50%',
          position: 'absolute',
          top: -12,
          right: -12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          background: 'rgba(0,0,0,0.85)',
          color: '#ffffff',
          cursor: 'pointer',
          ':hover': {
            opacity: 0.75,
          },
        }}
        onClick={e => {
          e.stopPropagation()
          removeComponent(data.id)
        }}
      >
        <CloseOutlined style={{ width: 12, height: 12 }} />
      </div>
      <ItemTemplate key={id} type={data.temModule} id={id} />
    </div>
  )

  // 单独处理浮标组件样式
  if (data.metaType === 'bas-floatBtn') {
    const selectedComponent = components.find(c => c.metaType === 'bas-floatBtn')
    return (
      <>
        {content(
          css({
            position: 'absolute',
            right: 10,
            top: selectedComponent?.data?.top ?? 345,
            zIndex: 10,
          }),
        )}

        {selectedComponent?.data?.preview && (
          <div
            css={css({
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.3)',
              zIndex: 100,
            })}
          >
            <Image
              src={selectedComponent?.data?.modalImgUrl}
              fallback={defaultImage}
              preview={false}
              width="90%"
              wrapperStyle={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -60%)',
              }}
              css={css({
                borderRadius: 2,
              })}
            />
          </div>
        )}
      </>
    )
  }
  // 单独处理红包组件样式
  if (data.metaType === 'biz-red') {
    return (
      <>
        {content(
          css({
            position: 'absolute',
            right: 0,
            top: 200,
            zIndex: 10,
          }),
        )}
      </>
    )
  }
  return content()
}

export default ContentItem
