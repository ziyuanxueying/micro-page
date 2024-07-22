import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MetasBar from './metas-bar/index.tsx'
import Content from './content/index.tsx'
import Setting from './setting/index.tsx'
import { flexrc } from '@global'
import { Button, Space } from 'antd'
// import { updateJson, findByIdForB, getCoupons } from '@/api'
import { findByIdForB, updateJson } from '@/api'
import useStore, { ActionEnums, Component, pageType } from '@/store'
type dataType = {
  components: Component[]
  pageConfig: pageType
}
//CP0795244269648879616,三端联调
//CP0811283496616108032,微页面自测
//CP0811527827121074176,全量自测
const TemplateEngine = () => {
  const { components, pageConfig, action, updateComponents, updatePageConfig } = useStore()
  console.log('components: ', components)
  const handleSave = async () => {
    // const data = await createJson({
    //   content: { components, pageConfig },
    //   title: pageConfig.title,
    //   channel: 'MICRO',
    // })
    const data = await updateJson({
      content: { components, pageConfig },
      id: 'CP0811283496616108032',
      title: pageConfig.title,
    })
    console.log(data)
  }
  const findById = async () => {
    // const data = await getCoupons('CP0795244269648879616')
    const data = (await findByIdForB('CP0811283496616108032')) as { content: dataType }
    setTimeout(() => {
      // 防止数据渲染不出来
      updateComponents(data.content.components)
      updatePageConfig(data.content.pageConfig)
    }, 1000)
  }
  useEffect(() => {
    findById()
  }, [])
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
