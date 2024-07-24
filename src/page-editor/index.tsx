import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MetasBar from './metas-bar/index.tsx'
import Content from './content/index.tsx'
import Setting from './setting/index.tsx'
import { flexrc } from '@global'
import { Button, Space, message } from 'antd'
// import { updateJson, findByIdForB, getCoupons } from '@/api'
import { createJson, findByIdForB, updateJson, updateStatus } from '@/api'
import useStore, { Component, pageType } from '@/store'
import { checkSaveInfo } from '@/utils/index.ts'
import { WdModal, WdPlazaSelect } from '@wd/component-ui'
import QRCode from '@/utils/qrcode.js'
import './index.less'

type dataType = {
  components: Component[]
  pageConfig: pageType
}
//CP0795244269648879616,三端联调
//CP0811283496616108032,微页面自测
//CP0811527827121074176,全量自测
const TemplateEngine = (props: any) => {
  // const { id, type } = props
  const { id = undefined, type = undefined } = props
  const navigate = useNavigate()
  console.log('id, type: ', id, type)
  // const [currData, setCurrData] = useState<any>({})
  const [messageApi, contextHolder] = message.useMessage()
  const { components, pageConfig, updateComponents, updateSelectedComponentId, updatePageConfig } =
    useStore()
  const [preview, setPreview] = React.useState<any>({})
  const handleSave = async (status: string) => {
    const { msg, list } = checkSaveInfo({ components, pageConfig })
    console.log('list: ', list)
    if (msg) {
      updateSelectedComponentId(undefined)
      if (list.length > 0) {
        updateComponents(list)
      }
      alert(msg)
      return msg
    }

    if ([undefined, '', 'copy'].includes(type)) {
      const res = await createJson({
        content: { components, pageConfig },
        title: pageConfig.title,
        channel: 'MICRO',
      })
      // setCurrData(res.data)
      if (status !== 'submit') {
        messageApi.open({ type: 'success', content: '页面创建成功' })
        goBack()
      } else {
        const curId = res.data.id || id
        const aaa = await updateStatus({ id: curId, status: '3' })
        console.log('aaa: ', aaa)
        messageApi.open({ type: 'success', content: '页面提交成功' })
        goBack()
      }
    }
    if (['edit'].includes(type)) {
      await updateJson({
        content: { components, pageConfig },
        id,
        title: pageConfig.title,
      })
      if (status !== 'submit') {
        messageApi.open({ type: 'success', content: '页面修改成功' })
        goBack()
      } else {
        const aaa = await updateStatus({ id, status: '3' })
        console.log('aaa: ', aaa)
        messageApi.open({ type: 'success', content: '页面提交成功' })
        goBack()
      }
    }
  }
  const changeStatus = async (status: string) => {
    const aaa = await updateStatus({ id, status })
    messageApi.open({ type: 'success', content: '操作成功' })
    goBack()
    console.log('changeStatus: ', aaa)
  }

  const findById = async () => {
    // const data = await getCoupons('CP0795244269648879616')
    const data = (await findByIdForB(id)) as { content: dataType }
    // setCurrData(data)
    setTimeout(() => {
      // 防止数据渲染不出来
      updateComponents(data.content.components)
      updatePageConfig(data.content.pageConfig)
    }, 1000)
  }

  // const showPreviewCode = useCallback((item: any) => {
  //   setPreview({
  //     show: true,
  //     id: item.id,
  //     onCancel: () => setPreview({}),
  //   })
  // }, [])

  const changePlaza = useCallback(
    (value: any) => {
      if (value.length <= 3) return
      const svgQRCode = QRCode({
        msg: `${
          (globalThis as any).WEB_ENV === 'prod'
            ? 'https://api.wandacm.com.cn/qr'
            : 'https://api.wandacm.com.cn/qre'
        }?key=MicroPageIndex&plazaId=${value[3]}&templateId=${preview.id}`,
        dim: 762,
        pad: 7,
        mtx: 7,
        ecl: 'H',
        pal: ['#000000', '#ffffff'],
      })
      setPreview({
        qrCode: svgQRCode.outerHTML,
        show: true,
        onCancel: () => setPreview({}),
      })
    },
    [preview],
  )

  const goBack = () => {
    setTimeout(() => {
      navigate('/micro-page-list', { replace: true })
    }, 1500)
  }
  useEffect(() => {
    if (id) {
      findById()
    } else {
      console.log(11111111)
      updateComponents([])
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
        maxHeight: '800px',
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
          {!['check', 'review'].includes(type) && <MetasBar />}
          <Content />
          {!['check', 'review'].includes(type) && <Setting />}
        </main>
      </DndProvider>
      <Space css={css([flexrc, { padding: '10px' }])}>
        <Button
          onClick={() => {
            navigate('/micro-page-list', { replace: true })
          }}
        >
          取消
        </Button>
        {/* <Button type="primary" onClick={() => showPreviewCode({ id: 'CP0811283496616108032' })}>
          预览
        </Button> */}
        {['review'].includes(type) && (
          <>
            <Button onClick={() => changeStatus('2')}>驳回</Button>
            <Button type="primary" onClick={() => changeStatus('1')}>
              通过
            </Button>
          </>
        )}
        {[undefined, '', 'edit', 'copy'].includes(type) && (
          <>
            <Button onClick={() => handleSave('')}>存为草稿</Button>
            <Button type="primary" onClick={() => handleSave('submit')}>
              提交
            </Button>
          </>
        )}
      </Space>

      <WdModal
        className="preview-modal"
        modalProps={{
          size: 'small',
          title: '预览',
          footer: false,
          onCancel: preview.onCancel,
        }}
        open={preview.show}
      >
        <Space direction="vertical">
          <Space>
            <div>选择广场：</div>
            <WdPlazaSelect onChange={changePlaza} />
          </Space>
          {preview.qrCode && (
            <>
              <div>
                <p style={{ fontSize: 18, margin: 0, marginTop: 25 }}>使用微信扫一扫预览页面</p>
                <div
                  dangerouslySetInnerHTML={{ __html: preview.qrCode }}
                  className="qr-code-box"
                ></div>
              </div>
              <div className="preview-tips">小程序预览</div>
              <b style={{ marginTop: 20 }}>温馨提示</b>
              <div>
                <span>此二维码仅做页面预览使用</span>
                <div></div>
                <span>预览页面默认展示当前广场数据</span>
              </div>
            </>
          )}
        </Space>
      </WdModal>
    </div>
  )
}

export default TemplateEngine
