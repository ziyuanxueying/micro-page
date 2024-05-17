import { componentsType } from '../type'
import ItemTemplate from './ItemTemplate'
import { useDrop } from 'react-dnd'

interface ContentProps {
  components: Array<any>
  selectModule: (meta: componentsType) => void
}

const Content = (props: ContentProps) => {
  const [select, setSelect] = useState<componentsType>({
    id: '',
    temModule: '',
    groupType: '',
    setModule: '',
    data: {},
  })

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Dustbin' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver

  const itemClick = (item: componentsType) => {
    setSelect(item)
    props.selectModule(item)
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
          backgroundColor: isActive ? '#d6d6d6' : canDrop && !isOver ? '#ededed80' : '#ededed',
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
        {props.components.map(item => (
          <div
            key={item.id}
            onClick={() => itemClick(item)}
            css={css`
              cursor: pointer;
              border: ${item.id === select.id ? 'solid 1px #20a0ff' : 'none'};
              border-radius: ${item.id === select.id ? '4px' : '0'};
            `}
          >
            <ItemTemplate type={item.temModule} message={item.data} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Content
