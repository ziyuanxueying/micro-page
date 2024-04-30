import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { XYCoord } from 'react-dnd'
import update from 'immutability-helper'

export const ItemTypes = {
  BOX: 'box',
}

function App() {
  return <Example />
}

function Example() {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [hideSourceOnDrag])

  return (
    <div className="flex flex-col items-center pt-20">
      <DndProvider backend={HTML5Backend}>
        <Container hideSourceOnDrag={hideSourceOnDrag} />
        <p>
          <label htmlFor="hideSourceOnDrag">
            <input
              id="hideSourceOnDrag"
              type="checkbox"
              role="checkbox"
              checked={hideSourceOnDrag}
              onChange={toggle}
            />
            <small>Hide the source item while dragging</small>
          </label>
        </p>
      </DndProvider>
    </div>
  )
}

export interface DragItem {
  type: string
  id: string
  top: number
  left: number
}
export interface ContainerProps {
  hideSourceOnDrag: boolean
}
export interface ContainerState {
  boxes: { [key: string]: { top: number; left: number; title: string } }
}

function Container({ hideSourceOnDrag }: ContainerProps) {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number
      left: number
      title: string
    }
  }>({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' },
  })

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes, setBoxes],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )

  return (
    <div
      ref={drop}
      style={{
        width: 300,
        height: 300,
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {Object.keys(boxes).map(key => {
        const { left, top, title } = boxes[key] as {
          top: number
          left: number
          title: string
        }
        return (
          <Box key={key} id={key} left={left} top={top} hideSourceOnDrag={hideSourceOnDrag}>
            {title}
          </Box>
        )
      })}
    </div>
  )
}

export interface BoxProps {
  id: any
  left: number
  top: number
  hideSourceOnDrag?: boolean
  children?: React.ReactNode
}

function Box({ id, left, top, hideSourceOnDrag, children }: BoxProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }

  return (
    <div
      className="box"
      ref={drag}
      style={{
        position: 'absolute',
        border: '1px dashed gray',
        backgroundColor: 'white',
        padding: '0.5rem 1rem',
        cursor: 'move',
        left,
        top,
      }}
      data-testid="box"
    >
      {children}
    </div>
  )
}

export default App
