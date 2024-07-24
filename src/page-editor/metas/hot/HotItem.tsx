import { Typography } from 'antd'
import { Hot } from './HotSet'
import { Resizable } from 're-resizable'
import Draggable from 'react-draggable'

const { Text } = Typography

type HotItemProps = {
  data: Hot
  updateHot: (id: string, value: Partial<Hot>) => void
}

function HotItem({ data, updateHot }: HotItemProps) {
  const { id, name, top, left, width, height } = data
  const nodeRef = useRef(null)

  return (
    <Draggable
      bounds="parent"
      position={{ x: left, y: top }}
      onStop={(_, data) => {
        updateHot(id, {
          left: data.x,
          top: data.y,
        })
      }}
      nodeRef={nodeRef}
    >
      <Resizable
        ref={ref => {
          // @ts-expect-error
          nodeRef.current = ref?.resizable
          return ref
        }}
        size={{ width, height }}
        onResizeStart={e => e.stopPropagation()}
        onResizeStop={(_e, _direction, _ref, d) => {
          updateHot(id, {
            width: width + d.width,
            height: height + d.height,
          })
        }}
        bounds="parent"
        style={{
          position: 'absolute',
        }}
        css={css({
          backgroundColor: '#155bd499',
          border: '1px solid transparent',
          cursor: 'move',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          '&:hover': {
            border: '1px solid #155bd4',
          },
          '&:active': {
            backgroundColor: '#155bd4e6',
          },
        })}
      >
        <Text css={css({ color: '#fff' })}>{name}</Text>
      </Resizable>
    </Draggable>
  )
}

export default HotItem
