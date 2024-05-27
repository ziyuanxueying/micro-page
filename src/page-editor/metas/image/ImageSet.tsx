import { Form, Input } from 'antd'

const ImageSet = () => {
  return (
    <Form labelCol={{ span: 5 }}>
      <Form.Item label="添加图片">
        <Input required />
      </Form.Item>
      <Form.Item label="跳转链接">
        <Input />
      </Form.Item>
      <Form.Item label="倒角">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default ImageSet
