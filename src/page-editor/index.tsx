import MetasBar from './metas-bar/index.tsx'
import Content from './content/index.tsx'
import Setting from './setting/index.tsx'
import QRCode from '../utils/qrcode.js'
import useStore, { Component, pageType } from '@/store'
import { flexrc } from '@global'
import { Button, Modal, Space, Spin, Typography, message } from 'antd'
import { createJson, findByIdForB, updateJson, updateStatus } from '@/api'
import { checkSaveInfo } from '@/utils/index.ts'
import { getTemp } from '@/temps.ts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './index.less'
import { WdPlazaSelect } from '@wd/component-ui'

type dataType = {
  components: Component[]
  pageConfig: pageType
}
//CP0795244269648879616,三端联调
//CP0811283496616108032,微页面自测
//CP0811527827121074176,全量自测
const TemplateEngine = (props: any) => {
  // const { id = 'CP0860518641702019072', type = 'edit', temp } = props
  const { id, type, temp } = props
  const saveLock = React.useRef<boolean>(false)

  const [preview, setPreview] = React.useState<any>({})

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

  const showPreviewCode = useCallback(
    (item: any) => {
      setPreview({
        show: true,
        id: item.id,
        onCancel: () => setPreview({}),
      })
    },
    [setPreview],
  )

  const getQRLink = () => {
    const env = (window as any).WEB_ENV || 'develop'
    switch (env) {
      case 'prod':
        return 'https://wdmp-api.wandawic.com/qr'
      // return 'https://api.wandacm.com.cn/qr'
      default:
        return 'https://wdmp-api.wandawic.com/qre'
      // return 'https://api.wandacm.com.cn/qre'
    }
  }

  const changePlaza = useCallback(
    (value: any, options: any) => {
      if (!options?.length) return
      const lastOption = options[options.length - 1]
      if (lastOption.orgTypeCode !== '10003') return
      // https://api.wandacm.com.cn/qre  体验版
      // https://api.wandacm.com.cn/qr 正式版
      const svgQRCode = QRCode({
        msg: `${getQRLink()}?key=MicroPageIndex&plazaId=${lastOption.code}&templateId=${
          preview.id
        }`,
        dim: 762,
        pad: 0,
        mtx: 0,
        ecl: 'H',
        pal: ['#000000', '#ffffff'],
      })
      setPreview({
        qrCode: svgQRCode.outerHTML,
        show: true,
        selectValues: value,
        id: preview.id,
        onCancel: () => setPreview({}),
      })
    },
    [preview],
  )

  const handleSave = async (status: string) => {
    console.log('saveLock: ', saveLock)
    if (saveLock.current) return
    saveLock.current = true
    try {
      const { msg, list, item } = checkSaveInfo({ components, pageConfig })
      if (msg) {
        updateSelectedComponentId(item?.id || undefined)
        updatePageConfig({ ...pageConfig, tab: '1' })
        if (list?.length > 0) {
          updateComponents(list)
        }
        messageApi.error(msg)
        saveLock.current = false
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
          showPreviewCode(res.data)
          // goBack()
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
      saveLock.current = false
    }
  }

  const findById = async () => {
    const data = (await findByIdForB(id)) as { content: dataType; status: string }
    data.content.pageConfig.tab = '2'
    setTimeout(() => {
      // 防止数据渲染不出来
      updateComponents(data.content.components)
      updatePageConfig(data.content.pageConfig)
      storeUpdateStatus(type === 'copy' ? '0' : data.status)
      setSpinning(false)
    }, 1000)
  }

  const goBack = () => {
    setTimeout(() => {
      navigate('/micro-page-list')
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
            {!['check', 'review'].includes(type) && <MetasBar />}
            <Content review={['check', 'review'].includes(type)} />
            {!['check', 'review'].includes(type) && <Setting />}
          </main>
        </DndProvider>

        <Space css={css([flexrc, { padding: '10px', paddingTop: 20, justifyContent: 'center' }])}>
          {!['check', 'review'].includes(type) && <div css={css({ width: 220, height: 10 })}></div>}
          <div css={css([flexrc, { flex: 1, boxSizing: 'border-box', justifyContent: 'center' }])}>
            {[undefined, '', 'edit', 'copy'].includes(type) && status !== '1' && (
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
                保存并预览
              </Button>
            )}
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
                {status !== '1' ? '发布' : '保存'}
              </Button>
            )}
            <Button
              onClick={() => navigate('/micro-page-list')}
              css={css({ width: 90, height: 32, fontSize: 13, borderRadius: 4, margin: '0 10px' })}
            >
              {!['check', 'review'].includes(type) ? '取消' : '返回'}
            </Button>
          </div>
          {!['check', 'review'].includes(type) && <div css={css({ width: 408, height: 10 })}></div>}
        </Space>
      </Spin>

      <Modal
        className="preview-modal"
        title="预览"
        footer={false}
        width={440}
        onCancel={preview.onCancel}
        open={preview.show}
        styles={{
          header: {
            lineHeight: 1,
          },
        }}
      >
        <Space direction="vertical">
          <Space>
            <div>选择广场：</div>
            <WdPlazaSelect
              value={preview.selectValues}
              onChange={changePlaza}
              size="middle"
              style={{ width: 255 }}
            />
          </Space>
          {preview.qrCode && (
            <>
              <Space align="center" direction="vertical" style={{ rowGap: 0, width: 392 }}>
                <p style={{ fontSize: 18, margin: 0, marginTop: 28 }}>使用微信扫一扫预览页面</p>
                <div
                  dangerouslySetInnerHTML={{ __html: preview.qrCode }}
                  className="qr-code-box"
                ></div>
                <div className="preview-tips">小程序预览</div>
              </Space>
              <span
                style={{
                  fontSize: 14,
                  lineHeight: '20px',
                }}
              >
                温馨提示
              </span>
              <div>
                <Typography.Text type="secondary">此二维码仅做页面预览使用</Typography.Text>
                <div></div>
                <Typography.Text type="secondary">预览页面默认展示当前广场数据</Typography.Text>
              </div>
            </>
          )}
        </Space>
      </Modal>
    </div>
  )
}

export default TemplateEngine
