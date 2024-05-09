import { componentsType } from '../type'
import ItemTemplate from './ItemTemplate'
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
  const itemClick = (item: componentsType) => {
    setSelect(item)
    props.selectModule(item)
  }
  return (
    <>
      {props.components.map(item => (
        <div
          key={item.id}
          onClick={() => itemClick(item)}
          className={item.id === select.id ? 'border border-solid border-[#20a0ff]' : ''}
        >
          <ItemTemplate type={item.temModule} />
        </div>
      ))}
    </>
  )
}

export default Content
