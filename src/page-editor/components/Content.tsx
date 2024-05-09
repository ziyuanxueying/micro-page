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
    <>
      <div
        ref={drop}
        className={cx('h-full', {
          'bg-#ecd0ad70': canDrop && !isOver,
          'bg-#ecd0ad': isActive,
        })}
        data-testid="dustbin"
      >
        {/* {isActive ? 'Release to drop' : 'Drag a box here'} */}
        {props.components.map(item => (
          <div
            key={item.id}
            onClick={() => itemClick(item)}
            className={cx(
              'p-2 cursor-pointer',
              item.id === select.id ? 'border border-solid border-[#20a0ff] rounded' : '',
            )}
          >
            <ItemTemplate type={item.temModule} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Content
