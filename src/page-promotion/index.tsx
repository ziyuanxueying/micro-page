import { generateMPCode, generateURLLink } from '@/api'
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons'
import { WdPlazaSelect } from '@wd/component-ui'
import { Button, message, Modal } from 'antd'
import React from 'react'

interface Props {
  show: boolean
  plazaId?: string
  onCancel?: () => void
}

const TestsProps = {
  show: true,
}

function downloadBase64Image(base64Data: string, filename: string) {
  // 创建一个 Blob 对象
  const blob = base64ToBlob(base64Data)

  // 创建一个 URL 对象
  const blobUrl = URL.createObjectURL(blob)

  // 创建一个 <a> 标签
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = filename

  // 模拟点击下载
  link.click()

  // 清理资源
  URL.revokeObjectURL(blobUrl)
}

function base64ToBlob(base64Data: string) {
  const byteString = atob(base64Data.split(',')[1])
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]

  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new Blob([uint8Array], { type: mimeString })
}

function copyToClipboard(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

/**
 * 推广组件
 * 暂时以页面级做展示，后面接入到列表页
 */
const PromotionModal: React.FC<Props> = function (props) {
  props = TestsProps
  const [messageApi, contextHolder] = message.useMessage()
  const [plazaValue, setPlazaValue] = React.useState()
  const [loading, setLoading] = React.useState<boolean>(!!props.plazaId)
  const [mpCode, setMPCode] = React.useState<string>()
  const [link, setLink] = React.useState<string>()

  const generateMPCodeAndLinkByPlazaId = async (plazaId: string) => {
    const code = await generateMPCode({
      payload: {
        content: JSON.stringify({
          key: 'ActivityLuckyMoney',
          params: {
            actId: 1562,
            plazaId: plazaId,
          },
        }),
        envVersion: 'develop',
      },
    })
    const link = await generateURLLink({
      payload: {
        // 正式版为 "release"，体验版为 "trial"，开发版为 "develop"
        env_version: 'develop',
        // 跳转的页面地址，此处写死
        path: 'pages/waiting/waiting',
        // key: 跳转的小程序页面Key，C端提供
        // 其它小程序页面需要的参数，C端提供
        query: `key=ActivityLuckyMoney&actId=1562&plazaId=${plazaId}`,
      },
    })
    if (code.status === 200 && link.status === 200) {
      setLoading(false)
      setLink(link.data)
      setMPCode(code.data)
    }
  }

  useEffect(() => {
    props.plazaId && generateMPCodeAndLinkByPlazaId(props.plazaId)
  }, [props.plazaId])

  const changePlaza = useCallback((value: any, selectedOptions: any[]) => {
    if (selectedOptions.length > 3) {
      setPlazaValue(value)
      setLoading(true)
      setMPCode('')
      generateMPCodeAndLinkByPlazaId(selectedOptions[3].code)
    }
  }, [])

  const copyLink = useCallback(() => {
    if (!link) return
    copyToClipboard(link)
    messageApi.open({
      type: 'success',
      content: `复制成功：${link}`,
    })
  }, [link, messageApi])

  const downloadMPCode = useCallback(
    () => mpCode && downloadBase64Image(mpCode, '太阳码'),
    [mpCode],
  )

  return (
    <>
      {contextHolder}
      <Modal
        title={<p>推广</p>}
        loading={loading}
        open={props?.show}
        onCancel={() => props.onCancel}
        footer={false}
      >
        <div
          css={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          {!props.plazaId && (
            <>
              <WdPlazaSelect value={plazaValue} style={{ width: 350 }} onChange={changePlaza} />
            </>
          )}
          {mpCode && (
            <>
              <img
                css={css({
                  width: 230,
                  height: 230,
                  marginTop: 30,
                  marginBottom: 30,
                })}
                src={mpCode}
              />
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size="large"
                onClick={downloadMPCode}
              >
                下载太阳码
              </Button>
              <Button
                type="primary"
                style={{ marginTop: 25 }}
                icon={<CopyOutlined />}
                size="large"
                onClick={copyLink}
              >
                复制推广链接
              </Button>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}

export default PromotionModal
