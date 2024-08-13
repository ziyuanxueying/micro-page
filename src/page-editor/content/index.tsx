import useStore from '@/store'
import { useDrop } from 'react-dnd'
import ContentItem from './Item'
import { ShareModal } from './share'

const Content = (props: any) => {
  const { components, pageConfig, updateComponents } = useStore()

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
        max-width: 400px;
        min-width: 400px;
        background: #ffffff;
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid #d9d9d9;
        position: relative;
        height: 100%;
        padding-bottom: 17px;
        ${props.preview && `margin-left: 50%; transform: translateX(-50%)`}
      `}
    >
      <div
        css={css({
          width: 200,
          borderBottom: '1px solid #E9E9E9',
          height: '49px',
          backgroundColor: '#fff',
          textAlign: 'center',
          zIndex: 99,
          lineHeight: '49px',
          position: 'sticky',
          marginLeft: 100,
          top: 0,
        })}
      >
        {pageConfig.title}
      </div>
      <div
        ref={drop}
        data-testid="dustbin"
        css={css({
          width: 400,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          boxSizing: 'border-box',
          overflowY: 'scroll',
          overflowX: 'auto',
          maxHeight: 'calc(100vh - 345px)',
          scrollbarWidth: 'none',
        })}
      >
        <div
          css={css({
            width: 375,
            borderRadius: 10,
            position: 'relative',
          })}
        >
          <div
            css={css({
              width: 375,
              minHeight: 'calc(100vh - 345px)',
              paddingTop: 1,
              backgroundColor: isActive ? '#bedcf9' : pageConfig.bgColor || '#f5f5f5',
              backgroundImage: `url(${pageConfig.bgImage || ''})`,
              backgroundSize: '100% ',
              backgroundRepeat: 'no-repeat',
            })}
          >
            {components.map((item, index) => (
              <ContentItem data={item} key={item.id} index={index} id={item.id!} move={move} />
            ))}
          </div>
        </div>
      </div>

      {pageConfig.isShare && <ShareModal />}
    </div>
  )
}

export default Content
