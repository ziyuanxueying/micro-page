import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MetasBar from './metas-bar/index.tsx'
import Content from './content/index.tsx'
import Setting from './setting/index.tsx'
import { flexrc } from '@global'
import { Button, Space } from 'antd'
import { updateJson, findByIdForB } from '@/api'
import useStore from '@/store'

const TemplateEngine = () => {
  const { components } = useStore()
  const handleSave = async () => {
    const data = await updateJson({
      content: components,
      id: 'CP0795244269648879616',
      title: '测试数据',
    })
    console.log(data)
  }
  const findById = async () => {
    const data = await findByIdForB('CP0795244269648879616')
    console.log(data)
  }
  return (
    <div
      css={css({
        height: '100%',
        minHeight: '800px',
      })}
    >
      <DndProvider backend={HTML5Backend}>
        <main
          css={css({
            display: 'flex',
            height: ' calc(100% - 60px)',
            gap: 12,
            minHeight: '700px',
          })}
        >
          <MetasBar />
          <Content />
          <Setting />
        </main>
      </DndProvider>
      <Space css={css([flexrc, { padding: '10px' }])}>
        <Button type="primary" onClick={handleSave}>
          保存
        </Button>
        <Button onClick={findById}>查询</Button>
        <Button>取消</Button>
      </Space>
    </div>
  )
}

export default TemplateEngine
