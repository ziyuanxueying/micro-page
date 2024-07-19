import useStore from '@/store'
import { Divider, Form, Input, Radio, Typography, Switch, InputNumber } from 'antd'
import { WdUploadPicture } from '@wd/component-ui'
import { toComponentUrl } from '@/utils'

const { Title } = Typography

const FloatBtnSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()
  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const [form] = Form.useForm()

  const { buttonImgUrl, modalImgUrl } = selectedComponent?.data || {}

  const buttonImgList = buttonImgUrl ? [{ url: buttonImgUrl }] : []
  const modalImgList = modalImgUrl ? [{ url: modalImgUrl }] : []

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
        <Form.Item label="按钮图片" name="buttonImgUrl" required>
          <WdUploadPicture
            url="/xapi-pc-web/file/tmpSecret"
            cosType="QD"
            fileList={buttonImgList}
            path="wxxcx/img"
            multiple={false}
            maxCount={1}
            theme="drag"
            noValidate={true}
            defaultTip="更换图片"
            width={100}
            height={100}
          />
        </Form.Item>
        <Form.Item label="按钮位置" name="top">
          <InputNumber />
        </Form.Item>
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
                  <Form.Item label="弹窗图片" name="modalImgUrl">
                    <WdUploadPicture
                      url="/xapi-pc-web/file/tmpSecret"
                      cosType="QD"
                      fileList={modalImgList}
                      path="wxxcx/img"
                      multiple={false}
                      maxCount={1}
                      theme="drag"
                      defaultTip="更换图片"
                      width={100}
                      height={100}
                    />
                  </Form.Item>
                  <Form.Item label="弹窗预览" name="preview">
                    <Switch />
                  </Form.Item>
                </>
              )
            }

            return (
              <Form.Item label="跳转链接" name="link">
                <Input />
              </Form.Item>
            )
          }}
        </Form.Item>
      </Form>
    </>
  )
}

export default FloatBtnSet
