import useStore, { Component } from '@/store'
import { Form } from 'antd'
import { WdAllocation } from '@wd/component-ui'
import { authorizePlaza, toComponentUrl } from '@/utils'
import MaterialBtn from '@/page-editor/components/MaterialBtn'
import { SetAuthorize, SetTitle } from '@/styles/global'

const FloatBtnSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()
  const selectedComponent = components.find(c => c.id === selectedComponentId) as Component
  const formDisabled = selectedComponent.data?.authorizePlaza !== authorizePlaza()

  const [form] = Form.useForm()

  // const { buttonImgUrl, modalImgUrl } = selectedComponent?.data || {}

  // const buttonImgList = buttonImgUrl ? [{ url: buttonImgUrl }] : []
  // const modalImgList = modalImgUrl ? [{ url: modalImgUrl }] : []

  // const onClickTypeChange = () => {
  //   const { clickType, ...values } = form.getFieldsValue()

  //   const next: any = { clickType, ...values }

  //   if (clickType === 'modal') {
  //     next.link = ''
  //   } else {
  //     next.preview = false
  //     next.modalImgUrl = ''
  //   }

  //   form.setFieldsValue(next)
  //   updateComponentData(selectedComponentId, {
  //     ...next,
  //     buttonImgUrl: toComponentUrl(next.buttonImgUrl),
  //     modalImgUrl: toComponentUrl(next.modalImgUrl),
  //   })
  // }

  return (
    <>
      <SetTitle>浮标</SetTitle>
      {formDisabled ? <SetAuthorize>集团下发内容，无法修改</SetAuthorize> : null}
      <Form
        form={form}
        labelCol={{ span: 5 }}
        initialValues={selectedComponent?.data}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, {
            ...selectedComponent.data,
            ...allValues,
            buttonImgUrl: toComponentUrl(allValues.buttonImgUrl),
            modalImgUrl: toComponentUrl(allValues.modalImgUrl),
          })
        }}
        disabled={formDisabled}
      >
        <Form.Item label="按钮图片" name="buttonImgUrl" required>
          <MaterialBtn
            limit={0.5}
            proportion={1}
            extra="支持PNG、JPG、JPEG、GIF格式，最大500K，建议尺寸200X200PX"
          />
        </Form.Item>
        <Form.Item label="跳转链接" name="link">
          <WdAllocation status={['poster', 'mini', 'external']} />
        </Form.Item>
      </Form>
    </>
  )
}

export default FloatBtnSet
