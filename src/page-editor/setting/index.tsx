import useStore from '@/store'
import ItemTemplate from '../components/ItemTemplate'
import PageSet from './pageSet'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

const Setting = () => {
  const { components, selectedComponentId, pageConfig, updatePageConfig } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)
  console.log(selectedComponent)
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '组件设置',
      children: selectedComponent && (
        <ItemTemplate key={selectedComponentId} type={selectedComponent.setModule} />
      ),
    },
    { key: '2', label: '页面设置', children: <PageSet /> },
  ]
  return (
    <div
      css={css({
        width: 400,
        padding: 10,
        borderRadius: 4,
        boxShadow: '0 8px 16px -2px rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flexShrink: 0,
        overflowY: 'auto',
      })}
    >
      <Tabs
        activeKey={pageConfig.tab || '1'}
        items={items}
        onChange={key => {
          console.log('key: ', key)
          updatePageConfig({ ...pageConfig, tab: key })
        }}
      />
    </div>
  )
}

export default Setting
