import { pageType } from '@/store'
import { WdUploadPicture } from '@wd/component-ui'
import { ColorPicker, Form, FormProps, Input, Switch } from 'antd'
import useStore from '@/store'
import { toComponentUrl, toHexString } from '@/utils'

const onFinish: FormProps<pageType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<pageType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

const Index = () => {
  const { pageConfig, updatePageConfig } = useStore()
  const [, setShowShareModal] = useState(pageConfig.showShareModal)
  const [isShare, setIsShare] = useState(pageConfig.isShare)
  const shareBtnImgList = pageConfig?.shareBtnImg ? [{ url: pageConfig.shareBtnImg }] : []
  const bgImageList = pageConfig?.bgImage ? [{ url: pageConfig.bgImage }] : []
  const posterImageList = pageConfig?.posterImage ? [{ url: pageConfig.posterImage }] : []
  const shareImgList = pageConfig?.shareImg ? [{ url: pageConfig.shareImg }] : []
  const onShareChange = (checked: boolean) => {
    setIsShare(checked)
  }
  const onShowShareModalChange = setShowShareModal

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
          console.log('allValues: ', allValues)
          updatePageConfig({
            ...allValues,
            bgColor: toHexString(allValues.bgColor),
            shareBtnImg: toComponentUrl(allValues.shareBtnImg),
            bgImage: toComponentUrl(allValues.bgImage),
            shareImg: toComponentUrl(allValues.shareImg),
            posterImage: toComponentUrl(allValues.posterImage),
            tab: '2',
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
            url="/xapi-pc-web/file/tmpSecret"
            cosType="QD"
            fileList={bgImageList}
            path="wxxcx/img"
            multiple={false}
            maxCount={1}
            theme="drag"
            defaultTip="更换图片"
            noValidate={true}
            width={100}
            height={100}
          />
        </Form.Item>
        <Form.Item label="分享设置" name="isShare">
          <Switch onChange={onShareChange} />
        </Form.Item>
        {isShare && (
          <>
            <Form.Item
              label="分享按钮图片"
              name="shareBtnImg"
              extra="支持png/jpg/jpeg/gif格式，最大500k, 100x100像素"
            >
              <WdUploadPicture
                url="/xapi-pc-web/file/tmpSecret"
                cosType="QD"
                fileList={shareBtnImgList}
                path="wxxcx/img"
                multiple={false}
                maxCount={1}
                theme="drag"
                defaultTip="更换图片"
                noValidate={true}
                width={100}
                height={100}
              />
            </Form.Item>
            <Form.Item label="分享标题" name="shareTitle" required>
              <Input placeholder="最多15字" />
            </Form.Item>
            <Form.Item
              label="分享图片"
              name="shareImg"
              extra="支持png/jpg/jpeg，分辨率750*600，不超过1M"
              required
            >
              <WdUploadPicture
                url="/xapi-pc-web/file/tmpSecret"
                cosType="QD"
                fileList={shareImgList}
                path="wxxcx/img"
                multiple={false}
                maxCount={1}
                theme="drag"
                defaultTip="更换图片"
                noValidate={true}
                width={100}
                height={100}
              />
            </Form.Item>
            <Form.Item
              label="分享海报"
              name="posterImage"
              extra="支持png/jpg/jpeg，分辨率750*1100，不超过1M"
            >
              <WdUploadPicture
                url="/xapi-pc-web/file/tmpSecret"
                cosType="QD"
                fileList={posterImageList}
                path="wxxcx/img"
                multiple={false}
                maxCount={1}
                theme="drag"
                defaultTip="更换图片"
                noValidate={true}
                width={100}
                height={100}
              />
            </Form.Item>

            <Form.Item label="分享预览" name="showShareModal">
              <Switch onChange={onShowShareModalChange} />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  )
}

export default Index
