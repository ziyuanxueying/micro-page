import MetasBar from './metas-bar/index.tsx'
import Content from './content/index.tsx'
import Setting from './setting/index.tsx'
import useStore, { Component, pageType } from '@/store'
import { flexrc } from '@global'
import { Button, Space, Spin, message } from 'antd'
import { createJson, findByIdForB, updateJson, updateStatus } from '@/api'
import { checkSaveInfo } from '@/utils/index.ts'
import { getTemp } from '@/temps.ts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './index.less'

type dataType = {
  components: Component[]
  pageConfig: pageType
}
//CP0795244269648879616,三端联调
//CP0811283496616108032,微页面自测
//CP0811527827121074176,全量自测
const TemplateEngine = (props: any) => {
  // const { id = "CP0821082077948776448" , type = "edit", temp } = props
  const { id, type, temp } = props
  const saveLock = React.useRef<boolean>(false)
  // const { id = undefined, type = undefined, temp = undefined } = props

  const navigate = useNavigate()
  // const [currData, setCurrData] = useState<any>({})
  const [messageApi, contextHolder] = message.useMessage()
  const {
    components,
    status,
    pageConfig,
    updateStatus: storeUpdateStatus,
    updateComponents,
    updateSelectedComponentId,
    updatePageConfig,
    updateType,
  } = useStore()
  const [spinning, setSpinning] = React.useState(true)
  const handleSave = async (status: string) => {
    if (saveLock.value) return
    saveLock.value = true
    try {
      const { msg, list, item } = checkSaveInfo({ components, pageConfig })
      if (msg) {
        updateSelectedComponentId(item?.id || undefined)
        updatePageConfig({ ...pageConfig, tab: '1' })
        if (list?.length > 0) {
          updateComponents(list)
        }
        messageApi.error(msg)
        saveLock.value = false
        return msg
      }
      const parseComponents = components.map(v => {
        return { ...v, isError: '' }
      })

      if ([undefined, '', 'copy'].includes(type)) {
        const res = await createJson({
          content: { components: parseComponents, pageConfig },
          title: pageConfig.title,
          actKey: 'micro_page',
          channel: 'MICRO',
        })
        // setCurrData(res.data)
        if (status !== 'submit') {
          messageApi.open({ type: 'success', content: '页面创建成功' })
          goBack()
        } else {
          const curId = res.data.id || id
          await updateStatus({ id: curId, status: '1' })
          messageApi.open({ type: 'success', content: '页面提交成功' })
          goBack()
        }
      }
      if (['edit'].includes(type)) {
        await updateJson({
          content: { components: parseComponents, pageConfig, actKey: 'micro_page' },
          id,
          title: pageConfig.title,
        })
        if (status !== 'submit') {
          messageApi.open({ type: 'success', content: '页面修改成功' })
          goBack()
        } else {
          await updateStatus({ id, status: '1' })
          messageApi.open({ type: 'success', content: '页面提交成功' })
          goBack()
        }
      }
    } catch (err) {
      // console.log(err)
      saveLock.value = false
    }
  }

  const findById = async () => {
    const data = (await findByIdForB(id)) as { content: dataType; status: string }
    setTimeout(() => {
      // 防止数据渲染不出来
      updateComponents(data.content.components)
      updatePageConfig(data.content.pageConfig)
      storeUpdateStatus(data.status)
      setSpinning(false)
    }, 1000)
  }

  const goBack = () => {
    setTimeout(() => {
      navigate('/micro-page-list', { replace: true })
    }, 1500)
  }
  useEffect(() => {
    updateType(type)
    if (id) {
      findById()
    } else if (temp) {
      const tempData = getTemp(temp)
      if (tempData) {
        setTimeout(() => {
          updateComponents(tempData?.components)
          updatePageConfig(tempData?.pageConfig)
          setSpinning(false)
        }, 1000)
      }
    } else setSpinning(false)
    return () => {
      storeUpdateStatus('0')
      updateComponents([])
      updateSelectedComponentId('')
      updatePageConfig({
        title: '默认标题',
        shareBtnImg: '',
        bgImage: '',
        shareImg: '',
        posterImage: '',
        bgColor: '#F5F5F5',
        showShareModal: false,
      })
    }
  }, [])
  return (
    <div
      css={css({
        height: '100%',
      })}
    >
      {contextHolder}

      <Spin spinning={spinning} tip="加载中" size="large">
        <DndProvider backend={HTML5Backend}>
          <main
            css={css({
              display: 'flex',
              justifyContent: 'space-between',
            })}
          >
            {(!['check', 'review'].includes(type) && <MetasBar />) || (
              <div css={css({ width: 220 })}></div>
            )}
            <Content preview={['check', 'review'].includes(type)} />
            {(!['check', 'review'].includes(type) && <Setting />) || (
              <div css={css({ width: 408 })}></div>
            )}
          </main>
        </DndProvider>
        <Space css={css([flexrc, { padding: '10px', justifyContent: 'space-between' }])}>
          <div css={css({ width: 220, height: 10 })}></div>
          <div css={css([flexrc, { flex: 1, boxSizing: 'border-box', justifyContent: 'center' }])}>
            <Button
              onClick={() => {
                navigate('/micro-page-list', { replace: true })
              }}
              css={css({ width: 90, height: 32, fontSize: 13, borderRadius: 4, margin: '0 10px' })}
            >
              {!['check', 'review'].includes(type) ? '取消' : '返回'}
            </Button>
            {['edit'].includes(type) && (
              <Button
                type="primary"
                onClick={() => handleSave('submit')}
                css={css({
                  width: 90,
                  height: 32,
                  fontSize: 13,
                  borderRadius: 4,
                  margin: '0 10px',
                })}
              >
                提交
              </Button>
            )}
            {[undefined, '', 'edit', 'copy'].includes(type) && (
              <Button
                type="primary"
                onClick={() => handleSave('')}
                css={css({
                  width: 90,
                  height: 32,
                  fontSize: 13,
                  borderRadius: 4,
                  margin: '0 10px',
                })}
              >
                {status === '1' ? '保存并发布' : '保存为草稿'}
              </Button>
            )}
          </div>
          <div css={css({ width: 408, height: 10 })}></div>
        </Space>
      </Spin>
    </div>
  )
}

export default TemplateEngine
