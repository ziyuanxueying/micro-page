import { Form, Input } from 'antd'

const { TextArea } = Input

const ImageTextSet = () => {
  return (
    <Form labelCol={{ span: 5 }}>
      <Form.Item label="标题">
        <Input required />
      </Form.Item>
      <Form.Item label="描述">
        <TextArea />
      </Form.Item>
      <Form.Item label="倒角">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default ImageTextSet
