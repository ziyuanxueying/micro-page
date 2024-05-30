import useStore from '@/store'
import { useDrop } from 'react-dnd'
import ContentItem from './Item'

const Content = () => {
  const { components, updateComponents } = useStore()

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Dustbin' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver

  const move = (dragIndex: number, hoverIndex: number) => {
    // console.log({ dragIndex, hoverIndex })

    const newComponents = [...components]
    const [removed] = newComponents.splice(dragIndex, 1)
    newComponents.splice(hoverIndex, 0, removed)
    updateComponents(newComponents)
  }

  return (
    <div
      css={css`
        flex: 1;
        border-radius: 4px;
        box-shadow: 0 8px 16px -2px rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
        padding: 10px;
      `}
    >
      <div
        ref={drop}
        data-testid="dustbin"
        css={css({
          width: 375,
          minHeight: 667,
          maxHeight: 812,
          overflowY: 'auto',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
          margin: '0 auto',
          backgroundColor: isActive ? '#bedcf9' : '#f5f5f5',
          position: 'relative',
        })}
      >
        <div
          css={css({
            width: '100%',
            height: '44px',
            padding: '6px 12px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
            marginBottom: 10,
            textAlign: 'center',
            lineHeight: '32px',
          })}
        >
          标题--后期可设置
        </div>
        {components.map((item, index) => (
          <ContentItem data={item} key={item.id} index={index} id={item.id!} move={move} />
        ))}
      </div>
    </div>
  )
}

export default Content
