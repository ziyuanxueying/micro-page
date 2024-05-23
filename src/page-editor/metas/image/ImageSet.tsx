import { Form, Input, Radio } from 'antd'

const ImageSet = () => {
  return (
    <Form labelCol={{ span: 5 }}>
      <Form.Item label="权限">
        <Radio.Group>
          <Radio value={1}>集团统一配置</Radio>
          <Radio value={2}>允许广场配置</Radio>
        </Radio.Group>
      </Form.Item>
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
