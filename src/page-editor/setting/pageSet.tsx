import React from 'react'
import useStore from '@/store'
import { pageType } from '@/store'
import { ImagePreview, WdMaterial } from '@wd/component-ui'
import { ColorPicker, Form, FormProps, Input, Switch, Button } from 'antd'
import { toHexString } from '@/utils'
import MaterialBtn from '@/page-editor/components/MaterialBtn'

const onFinish: FormProps<pageType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<pageType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

const Index = () => {
  const { pageConfig, updatePageConfig } = useStore()

  const [form] = Form.useForm()
  // 是否打开素材库
  const [openWDMaterial, setOpenWDMaterial] = useState(false)
  // 素材库作用于哪张图片
  const [editImageKey, setEditImageKey] = useState('')

  /** 打开素材库 */
  const openWDMaterialHandler = React.useCallback((key: string) => {
    setOpenWDMaterial(true)
    setEditImageKey(key)
  }, [])

  /** 关闭素材库 */
  const closeWDMaterial = React.useCallback(() => {
    setOpenWDMaterial(false)
  }, [])

  /** 素材库选择资源 */
  const resourceSelected = (url: string) => {
    closeWDMaterial()
    updatePageConfig({ ...pageConfig, [editImageKey]: url })
  }

  return (
    <>
      <WdMaterial
        limit={1}
        maxCount={1}
        disabled={false}
        noValidate={false}
        open={openWDMaterial}
        onCancel={closeWDMaterial}
        onOk={resourceSelected}
      />
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        initialValues={pageConfig}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={(_, allValues) => {
          console.log('allValues: ', allValues)
          updatePageConfig({
            ...pageConfig,
            ...allValues,
            bgColor: toHexString(allValues.bgColor),
            // shareBtnImg: toComponentUrl(allValues.shareBtnImg),
            // bgImage: toComponentUrl(allValues.bgImage),
            // shareImg: toComponentUrl(allValues.shareImg),
            // posterImage: toComponentUrl(allValues.posterImage),
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
          <div>
            <Button onClick={() => openWDMaterialHandler('bgImage')}>选择图片+</Button>
            {pageConfig.bgImage && (
              <ImagePreview
                data={[{ src: pageConfig.bgImage, name: '分享按钮' }]}
                width={100}
                height={100}
                colNum={1}
                onDelete={() => {
                  updatePageConfig({
                    ...pageConfig,
                    bgImage: '',
                  })
                }}
                isDefault={false}
              />
            )}
          </div>
        </Form.Item>
        <Form.Item label="分享设置" name="isShare">
          <Switch />
        </Form.Item>
        {pageConfig.isShare && (
          <div>
            <Form.Item
              label="分享按钮图片"
              name="shareBtnImg"
              extra="支持png、jpg、jpeg、gif格式，最大500k, 100x100像素"
            >
              <div>
                <Button onClick={() => openWDMaterialHandler('shareBtnImg')}>选择图片+</Button>
                {pageConfig.shareBtnImg && (
                  <ImagePreview
                    data={[{ src: pageConfig.shareBtnImg, name: '分享按钮' }]}
                    width={100}
                    height={100}
                    colNum={1}
                    isDefault={false}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item label="分享标题" name="shareTitle" required>
              <Input placeholder="最多15字" />
            </Form.Item>
            <Form.Item
              label="分享图片"
              name="shareImg"
              extra="支持png、jpg、jpeg，分辨率750*600，不超过1M"
              required
            >
              <MaterialBtn />
              {/* <div>
                <Button onClick={() => openWDMaterialHandler('shareImg')}>选择图片+</Button>
                {pageConfig.shareImg && (
                  <ImagePreview
                    data={[{ src: pageConfig.shareImg, name: '分享图片' }]}
                    width={100}
                    height={100}
                    colNum={1}
                    isDefault={false}
                  />
                )}
              </div> */}
            </Form.Item>
            <Form.Item
              label="分享海报"
              name="posterImage"
              extra="支持png、jpg、jpeg，分辨率750*1100，不超过1M"
            >
              <MaterialBtn />
              {/* <div>
                <Button onClick={() => openWDMaterialHandler('posterImage')}>选择图片+</Button>
                {pageConfig.posterImage && (
                  <ImagePreview
                    data={[{ src: pageConfig.posterImage, name: '分享海报' }]}
                    width={100}
                    height={100}
                    colNum={1}
                    isDefault={false}
                  />
                )}
              </div> */}
            </Form.Item>

            <Form.Item label="分享预览" name="showShareModal">
              <Switch />
            </Form.Item>
          </div>
        )}
      </Form>
    </>
  )
}

export default Index
