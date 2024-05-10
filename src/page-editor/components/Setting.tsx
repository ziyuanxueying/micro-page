import { componentsType } from '../type'
import ItemTemplate from './ItemTemplate'

interface SettingProps {
  selected: componentsType
}

const Setting = (props: SettingProps) => {
  return (
    <div
      css={css({
        width: 200,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#faebd7',
        boxShadow: '0 8px 16px -2px rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      })}
    >
      <ItemTemplate type={props.selected.setModule} />
    </div>
  )
}

export default Setting
