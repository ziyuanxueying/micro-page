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

  console.log(components)

  return (
    <div
      css={css`
        flex: 1;
        max-height: calc(100vh - 200px);
        overflow-y: scroll;
        overflow-x: hodden;
      `}
    >
      <div
        css={css`
          border-radius: 4px;
          max-width: 400px;
          min-width: 400px;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #d9d9d9;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          padding-bottom: 12px;
          display: flex;
          flex-direction: column;
          margin: 35px 0;
          zoom: 0.8;
        `}
      >
        <div
          css={css({
            width: 200,
            borderBottom: '1px solid #E9E9E9',
            height: '49px',
            backgroundColor: '#fff',
            textAlign: 'center',
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
                minHeight: 'calc(100vh - 220px)',
                paddingTop: 1,
                paddingBottom: 5,
                backgroundColor: isActive ? '#bedcf9' : pageConfig.bgColor || '#f5f5f5',
                backgroundImage: `url(${pageConfig.bgImage || ''})`,
                backgroundSize: '100% ',
                backgroundRepeat: 'no-repeat',
                borderBottomLeftRadius: 13,
                borderBottomRightRadius: 13,
                pointerEvents: props.preview ? 'none' : 'all',
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
    </div>
  )
}

export default Content
