import { Form, Input, Radio } from 'antd'

const { TextArea } = Input

const ImageMapSet = () => {
  return (
    <Form labelCol={{ span: 5 }}>
      <Form.Item label="权限">
        <Radio.Group>
          <Radio value={1}>集团统一配置</Radio>
          <Radio value={2}>允许广场配置</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="标题内容">
        <Input required />
      </Form.Item>
      <Form.Item label="描述内容">
        <TextArea />
      </Form.Item>
      <Form.Item label="倒角">
        <Input />
      </Form.Item>
      <Form.Item label="显示位置">
        <Input />
      </Form.Item>
      <Form.Item label="标题粗细">
        <Input />
      </Form.Item>
      <Form.Item label="描述粗细">
        <Input />
      </Form.Item>
      <Form.Item label="标题颜色">
        <Input />
      </Form.Item>
      <Form.Item label="描述颜色">
        <Input />
      </Form.Item>
      <Form.Item label="背景颜色">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default ImageMapSet
