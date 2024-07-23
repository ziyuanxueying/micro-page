import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MetasBar from './metas-bar/index.tsx'
import Content from './content/index.tsx'
import Setting from './setting/index.tsx'
import { flexrc } from '@global'
import { Button, Space, message } from 'antd'
// import { updateJson, findByIdForB, getCoupons } from '@/api'
import { createJson, findByIdForB, updateJson } from '@/api'
import useStore, { ActionEnums, Component, pageType } from '@/store'
import { checkSaveInfo } from '@/utils/index.ts'
type dataType = {
  components: Component[]
  pageConfig: pageType
}
//CP0795244269648879616,三端联调
//CP0811283496616108032,微页面自测
//CP0811527827121074176,全量自测
const TemplateEngine = (props: any) => {
  const { id, type } = props
  console.log('id, type: ', id, type)
  const [messageApi, contextHolder] = message.useMessage()
  const {
    components,
    pageConfig,
    action,
    updateComponents,
    updateSelectedComponentId,
    updatePageConfig,
  } = useStore()
  const handleSave = async () => {
    const { msg, list } = checkSaveInfo({ components, pageConfig })
    console.log('list: ', list)
    if (msg) {
      updateSelectedComponentId(undefined)
      alert(msg)
    }
    if (list.length > 0) {
      updateComponents(list)
    }
    if ([undefined, 'copy'].includes(type)) {
      await createJson({
        content: { components, pageConfig },
        title: pageConfig.title,
        channel: 'MICRO',
      })
      messageApi.open({ type: 'success', content: '页面创建成功' })
    }
    if (['edit'].includes(type)) {
      await updateJson({
        content: { components, pageConfig },
        id: 'CP0811283496616108032',
        title: pageConfig.title,
      })
      messageApi.open({ type: 'success', content: '页面修改成功' })
    }
  }
  const findById = async () => {
    // const data = await getCoupons('CP0795244269648879616')
    const data = (await findByIdForB(id)) as { content: dataType }
    setTimeout(() => {
      // 防止数据渲染不出来
      updateComponents(data.content.components)
      updatePageConfig(data.content.pageConfig)
    }, 1000)
  }
  useEffect(() => {
    if (id) findById()
  }, [])
  return (
    <div
      css={css({
        height: '100%',
        minHeight: '800px',
      })}
    >
      {contextHolder}
      <DndProvider backend={HTML5Backend}>
        <main
          css={css({
            display: 'flex',
            height: ' calc(100% - 60px)',
            gap: 12,
            minHeight: '700px',
          })}
        >
          {action !== ActionEnums.preview && <MetasBar />}
          <Content />
          {action !== ActionEnums.preview && <Setting />}
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
