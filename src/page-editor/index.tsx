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
import { WdModal, WdPlazaSelect } from '@wd/component-ui'
import QRCode from '../utils/qrcode.js'
import './index.less'

type dataType = {
  components: Component[]
  pageConfig: pageType
}
//CP0795244269648879616,三端联调
//CP0811283496616108032,微页面自测
//CP0811527827121074176,全量自测
const TemplateEngine = () => {
  const [preview, setPreview] = React.useState<any>({})
  const { components, pageConfig, action, updateComponents, updatePageConfig } = useStore()
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
    console.log('data: ', data)
    setTimeout(() => {
      // 防止数据渲染不出来
      updateComponents(data.content.components)
      updatePageConfig(data.content.pageConfig)
    }, 1000)
  }

  const showPreviewCode = useCallback((item: any) => {
    setPreview({
      show: true,
      id: item.id,
      onCancel: () => setPreview({}),
    })
  }, [])

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
        <Button type="primary" onClick={() => showPreviewCode({ id: 'CP0811283496616108032' })}>
          预览
        </Button>
        <Button type="primary" onClick={handleSave}>
          保存
        </Button>
        <Button onClick={findById}>查询</Button>
        <Button>取消</Button>
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
