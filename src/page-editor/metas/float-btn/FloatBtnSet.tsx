import useStore from '@/store'
import { Divider, Form, Radio, Typography, Switch } from 'antd'
import { WdAllocation } from '@wd/component-ui'
import { toComponentUrl } from '@/utils'
import MaterialBtn from '@/page-editor/components/MaterialBtn'

const { Title } = Typography

const FloatBtnSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()
  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const [form] = Form.useForm()

  // const { buttonImgUrl, modalImgUrl } = selectedComponent?.data || {}

  // const buttonImgList = buttonImgUrl ? [{ url: buttonImgUrl }] : []
  // const modalImgList = modalImgUrl ? [{ url: modalImgUrl }] : []

  const onClickTypeChange = () => {
    const { clickType, ...values } = form.getFieldsValue()

    const next: any = { clickType, ...values }

    if (clickType === 'modal') {
      next.link = ''
    } else {
      next.preview = false
      next.modalImgUrl = ''
    }

    form.setFieldsValue(next)
    updateComponentData(selectedComponentId, {
      ...next,
      buttonImgUrl: toComponentUrl(next.buttonImgUrl),
      modalImgUrl: toComponentUrl(next.modalImgUrl),
    })
  }

  return (
    <>
      <Title level={5} style={{ fontWeight: 500, marginBottom: 0 }} css={css({ textIndent: 10 })}>
        浮标
      </Title>
      <Divider css={css({ margin: '16px 0' })} />
      <Form
        form={form}
        labelCol={{ span: 5 }}
        initialValues={selectedComponent?.data}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, {
            ...allValues,
            buttonImgUrl: toComponentUrl(allValues.buttonImgUrl),
            modalImgUrl: toComponentUrl(allValues.modalImgUrl),
          })
        }}
      >
        <Form.Item
          label="按钮图片"
          extra="支持PNG、JPG、JPEG，GIF格式，大小支持500k，尺寸100X100像素"
          name="buttonImgUrl"
          required
        >
          <MaterialBtn />
        </Form.Item>
        {/* <Form.Item label="按钮位置" name="top">
          <InputNumber />
        </Form.Item> */}
        <Form.Item label="点击效果" name="clickType" required>
          <Radio.Group onChange={onClickTypeChange}>
            <Radio value="modal">弹窗</Radio>
            <Radio value="link">页面跳转</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prev, cur) => prev.clickType !== cur.clickType}>
          {({ getFieldValue }) => {
            const clickType = getFieldValue('clickType')
            if (clickType === 'modal') {
              return (
                <>
                  <Form.Item
                    label="弹窗图片"
                    name="modalImgUrl"
                    extra="支持PNG、JPG、JPEG，GIF格式，大小支持1M，建议比例 1:1"
                  >
                    <MaterialBtn />
                  </Form.Item>
                  <Form.Item label="弹窗预览" name="preview">
                    <Switch />
                  </Form.Item>
                </>
              )
            }

            return (
              <Form.Item label="跳转链接" name="link">
                <WdAllocation
                  status={['none', 'mini', 'external']}
                  onChangeData={function (): void {
                    // todo
                  }}
                />
              </Form.Item>
            )
          }}
        </Form.Item>
      </Form>
    </>
  )
}

export default FloatBtnSet
