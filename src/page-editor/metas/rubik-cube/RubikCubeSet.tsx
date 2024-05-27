import { UploadOutlined } from '@ant-design/icons'
import { Form, Input, Radio, Typography, Divider, Upload, Button } from 'antd'

const { Title } = Typography

const RubikCubeSet = () => {
  return (
    <>
      <Title level={5} style={{ fontWeight: 500, marginBottom: 0 }} css={css({ textIndent: 10 })}>
        魔方
      </Title>
      <Divider css={css({ margin: '16px 0' })} />
      <Form labelCol={{ span: 5 }}>
        <Form.Item label="模版" name="template">
          <Radio.Group>
            <Radio value={2}>一行两个</Radio>
            <Radio value={3}>一行三个</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="图片" name="picture" required>
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>更换图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="链接" name="link" required>
          <Input />
        </Form.Item>
      </Form>
    </>
  )
}

export default RubikCubeSet
