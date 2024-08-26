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
  review: boolean
  move: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const ContentItem = ({ data, id, index, move, review }: ContentItemProps) => {
  const {
    selectedComponentId,
    components,
    updateSelectedComponentId,
    removeComponent,
    pageConfig,
    updatePageConfig,
    updateComponents,
  } = useStore()
  const [showLabel, setShowLabel] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor: any) {
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
      console.log(clientOffset, hoverBoundingRect.top)

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

  const [{ isDragging /*zoom*/ }, drag /*preview*/] = useDrag({
    type: 'card',
    item: () => {
      return review ? undefined : { id, index }
    },
    collect: (monitor: any) => ({
      // zoom: monitor.isDragging() ? 0.5 : 1,
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const handleClick = (item: Component) => {
    if (review) return
    updateSelectedComponentId(selectedComponentId === item.id ? undefined : item.id)
    selectedComponentId !== item.id && updatePageConfig({ ...pageConfig, tab: '1' })
    const { list } = checkSaveInfo({ components, pageConfig })
    updateComponents(list)
  }

  const onMouseEnter = () => {
    console.log('移入')
    setShowLabel(true)
  }

  const onMouseLeave = () => {
    setShowLabel(false)
  }
  const opacity = isDragging ? 0 : 1

  const content = (style?: ReturnType<typeof css>) => (
    <div
      ref={ref}
      key={data.id}
      data-handler-id={handlerId}
      onClick={() => handleClick(data)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      css={css(
        {
          boxSizing: 'content-box',
          border: '2px dashed',
          borderColor: data.isError
            ? 'red'
            : data.id === selectedComponentId
            ? '#000000'
            : 'transparent',
          opacity,
          position: 'relative',
          zIndex: 1,
          marginTop: -2,
          cursor: review ? 'pointer' : 'move',
          ':hover': !review
            ? {
                borderColor: data.isError ? 'red' : '#000000',
                '.wd-micro-page-comp': {
                  opacity: 1,
                  pointerEvents: 'all',
                },
              }
            : {},
        },
        style,
      )}
    >
      <div
        className="wd-micro-page-comp"
        css={{
          opacity: selectedComponentId === data.id ? 1 : 0,
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
      {showLabel && review && (
        <div
          css={css({
            width: 100,
            height: 38,
            borderRadius: 5,
            color: '#999999',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            margin: 'auto',
            right: -125,
            top: 0,
            bottom: 0,
          })}
        >
          {data.name}
        </div>
      )}
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

        {selectedComponent?.data?.review && (
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
