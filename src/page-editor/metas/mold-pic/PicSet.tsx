import useStore from '@/store'
import { Line } from '@/styles/global'
import { Form, Input, Radio, RadioChangeEvent } from 'antd'
const Index = () => {
  const { selectedComponentId, components, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)
  const [form] = Form.useForm()

  const onChange = (e: RadioChangeEvent) => {
    setting && updateComponentData(setting.id, { ...setting.data, url: e.target.value })
  }
  return (
    <>
      <div css={css({ fontSize: 16 })}>模板图片</div>
      <Line />
      <Form
        form={form}
        labelCol={{ span: 4 }}
        initialValues={{ ...setting?.data }}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, { ...allValues })
        }}
      >
        <Form.Item label="选择模版" name="url">
          <Radio.Group onChange={onChange}>
            <Radio
              value={
                'http://xcx02-dev-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/53aa87b270ae4e6da1d06c9b2e4ce990.jpeg'
              }
            >
              <img
                css={css({ width: '50%' })}
                src="http://xcx02-dev-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/53aa87b270ae4e6da1d06c9b2e4ce990.jpeg"
              />
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="标题" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="副标题" name="sub">
          <Input />
        </Form.Item>
      </Form>
    </>
  )
}

export default Index
