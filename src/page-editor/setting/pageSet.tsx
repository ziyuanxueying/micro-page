import { pageType } from '@/store'
import { WdUploadPicture } from '@wd/component-ui'
import { ColorPicker, Form, FormProps, Input, Switch } from 'antd'
import useStore from '@/store'
import { toComponentUrl } from '@/utils'

const onFinish: FormProps<pageType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<pageType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

const Index = () => {
  const { pageConfig, updatePageConfig } = useStore()
  const [isShare, setIsShare] = useState(false)
  const bgImageList = pageConfig?.bgImage ? [{ url: pageConfig.bgImage }] : []
  const shareImgList = pageConfig?.shareImg ? [{ url: pageConfig.shareImg }] : []
  const onShareChange = (checked: boolean) => {
    setIsShare(checked)
  }

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        initialValues={pageConfig}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={(_, allValues) => {
          updatePageConfig({
            ...allValues,
            bgImage: toComponentUrl(allValues.bgImage),
            shareImg: toComponentUrl(allValues.shareImg),
          })
        }}
      >
        <Form.Item<pageType>
          label="页面名称"
          name="title"
          rules={[{ required: true, message: '请输入页面名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<pageType> label="背景色" name="bgColor">
          <ColorPicker showText />
        </Form.Item>
        <Form.Item label="添加背景图" name="bgImage">
          <WdUploadPicture
            url="/cos-api/xapi-pc-web/file/tmpSecret"
            cosType="QD"
            fileList={bgImageList}
            path="wxxcx/img"
            multiple={false}
            maxCount={1}
            theme="drag"
            defaultTip="更换图片"
            width={100}
            height={100}
          />
        </Form.Item>
        <Form.Item label="分享设置" name="isShare">
          <Switch onChange={onShareChange} />
        </Form.Item>
        {isShare && (
          <>
            <Form.Item label="自定义分享标题" name="shareTitle">
              <Input />
            </Form.Item>
            <Form.Item label="自定义分享描述" name="shareDesc">
              <Input />
            </Form.Item>
            <Form.Item label="自定义分享图标" name="shareImg">
              <WdUploadPicture
                url="/cos-api/xapi-pc-web/file/tmpSecret"
                cosType="QD"
                fileList={shareImgList}
                path="wxxcx/img"
                multiple={false}
                maxCount={1}
                theme="drag"
                defaultTip="更换图片"
                width={100}
                height={100}
              />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  )
}

export default Index
