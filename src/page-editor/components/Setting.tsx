import { componentsType } from '../type'
import ItemTemplate from './ItemTemplate'
interface SettingProps {
  selected: componentsType
}
const Setting = (props: SettingProps) => {
  return (
    <>
      <ItemTemplate type={props.selected.temModule} />
    </>
  )
}

export default Setting
