import useStore from '@/store'
import { pageType } from '@/store'
import { ColorPicker, Form, FormProps, Input, Switch } from 'antd'
import { toHexString } from '@/utils'
import MaterialBtn from '@/page-editor/components/MaterialBtn'
import { WdUtils } from '@wd/component-ui'

const onFinish: FormProps<pageType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<pageType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

const Index = () => {
  const { pageConfig, updatePageConfig } = useStore()

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(pageConfig)
  }, [pageConfig, form])

  return (
    <>
      <div css={css({ height: 28 })}></div>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        initialValues={pageConfig}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={(_, allValues) => {
          updatePageConfig({
            ...pageConfig,
            ...allValues,
            bgColor: toHexString(allValues.bgColor),
            tab: '2',
          })
        }}
      >
        <Form.Item<pageType>
          label="页面名称"
          name="title"
          rules={[{ required: true, validator: (_, val) => WdUtils.validateText(_, val) }]}
        >
          <Input placeholder="请输入页面名称" showCount maxLength={10} />
        </Form.Item>

        <Form.Item<pageType> label="背景色" name="bgColor">
          <ColorPicker showText />
        </Form.Item>
        <Form.Item label="添加背景图" name="bgImage">
          <MaterialBtn />
        </Form.Item>
        <Form.Item label="分享设置" name="isShare">
          <Switch />
        </Form.Item>
        {pageConfig.isShare && (
          <>
            <Form.Item label="分享按钮图片" name="shareBtnImg">
              <MaterialBtn
                accept=".jpg,.png,.jpeg,.gif,.JPG,.JPEG,.PNG,.GIT"
                proportion={1}
                extra="支持png,jpg，jpeg，gif格式，最大500k，100x100像素"
              />
            </Form.Item>
            <Form.Item
              label="分享标题"
              name="shareTitle"
              required
              rules={[{ required: true, validator: (_, val) => WdUtils.validateText(_, val) }]}
            >
              <Input placeholder="请输入分享标题" showCount maxLength={15} />
            </Form.Item>
            <Form.Item label="分享图片" name="shareImg" required>
              <MaterialBtn
                accept=".jpg,.png,.jpeg,.JPG,.JPEG,.PNG"
                limit={1}
                proportion={1.25}
                extra="支持png/jpg/jpeg,分辨率750*600，不超过1M"
              />
            </Form.Item>
            <Form.Item label="分享海报" name="posterImage">
              <MaterialBtn
                accept=".jpg,.png,.jpeg,.JPG,.JPEG,.PNG"
                limit={1}
                proportion={750 / 1100}
                extra="支持 png/jpg/jpeg，分辨率750x1100，不超过1M"
              />
            </Form.Item>

            <Form.Item label="分享预览" name="showShareModal">
              <Switch />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  )
}

export default Index
