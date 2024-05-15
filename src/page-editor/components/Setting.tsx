import { componentsType } from '../type'
import ItemTemplate from './ItemTemplate'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
interface SettingProps {
  selected: componentsType
}
const onChange = (key: string) => {
  console.log(key)
}

const Setting = (props: SettingProps) => {
  const items: TabsProps['items'] = [
    { key: '1', label: '组件设置', children: <ItemTemplate type={props.selected.setModule} /> },
    { key: '2', label: '组件管理', children: 'Content of Tab Pane 1' },
    { key: '3', label: '页面设置', children: 'Content of Tab Pane 2' },
  ]
  return (
    <div
      css={css({
        width: 300,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#faebd7',
        boxShadow: '0 8px 16px -2px rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      })}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default Setting
