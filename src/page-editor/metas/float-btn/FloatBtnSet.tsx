import useStore from '@/store'
import { Form } from 'antd'
import { WdAllocation } from '@wd/component-ui'
import { toComponentUrl } from '@/utils'
import MaterialBtn from '@/page-editor/components/MaterialBtn'
import { SetTitle } from '@/styles/global'

const FloatBtnSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()
  const selectedComponent = components.find(c => c.id === selectedComponentId)

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
          <MaterialBtn
            accept=".jpg,.png,.jpeg,.gif,.JPG,.JPEG,.PNG,.GIT"
            limit={0.5}
            proportion={1}
            extra="支持PNG、JPG、JPEG、GIF格式，最大500K，尺寸100X100像素"
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
