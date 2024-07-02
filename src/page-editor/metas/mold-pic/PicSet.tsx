import useStore from '@/store'
import { Line } from '@/styles/global'
import { Form, Input, Radio, RadioChangeEvent } from 'antd'
const Index = () => {
  const { selectedComponentId, components, updateComponent, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)
  const [form] = Form.useForm()

  const onChange = (e: RadioChangeEvent) => {
    setting && updateComponent(setting.id, { ...setting, moduleType: e.target.value })
  }

  const pics = [
    {
      value: 'biz-pic-nomal',
      src: 'http://xcx02-dev-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/53aa87b270ae4e6da1d06c9b2e4ce990.jpeg',
    },
  ]
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
        <Form.Item label="选择模版" name="moduleType">
          <Radio.Group onChange={onChange}>
            {pics.map(option => (
              <Radio key={option.value} value={option.value}>
                <img css={css({ width: '50%' })} src={option.src} alt={option.value} />
              </Radio>
            ))}
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
