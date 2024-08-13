import useStore from '@/store'
import ItemTemplate from '../components/ItemTemplate'
import PageSet from './pageSet'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

const Setting = () => {
  const { components, selectedComponentId, pageConfig, updatePageConfig } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)
  const items: TabsProps['items'] = [
    { key: '2', label: '页面设置', children: <PageSet /> },
    {
      key: '1',
      label: '组件设置',
      children: selectedComponent && (
        <div css={css({ paddingLeft: 28 })}>
          <ItemTemplate key={selectedComponentId} type={selectedComponent.setModule} />
        </div>
      ),
    },
  ]
  return (
    <div
      css={css({
        width: 408,
        padding: 10,
        paddingTop: 0,
        paddingLeft: 0,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflowY: 'scroll',
        minHeight: 'calc(-210px + 100vh)',
        maxHeight: 'calc(-210px + 100vh)',
        borderLeft: '1px solid #F3F5F7',
      })}
    >
      <Tabs
        activeKey={pageConfig.tab || '2'}
        items={items}
        css={css({
          '.ant-tabs-nav': {
            top: 0,
            position: 'sticky',
            background: 'rgba(255, 255, 255)',
            zIndex: 9,
            marginBottom: 0,
            paddingLeft: 28,
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            ':before': {
              opacity: 0,
            },
          },
          '.ant-tabs-nav-wrap': {
            background: '#ffffff',
          },
        })}
        onChange={key => {
          updatePageConfig({ ...pageConfig, tab: key })
        }}
      />
    </div>
  )
}

export default Setting
