import useStore from '@/store'
import { Divider, Form, Input, Typography } from 'antd'

const { Title } = Typography

const VideoSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  return (
    <>
      <Title level={5} style={{ fontWeight: 500, marginBottom: 0 }} css={css({ textIndent: 10 })}>
        标题文本
      </Title>
      <Divider css={css({ margin: '16px 0' })} />
      <Form
        labelCol={{ span: 5 }}
        initialValues={selectedComponent?.data}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, allValues)
        }}
      >
        <Form.Item label="标题" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="视频" name="src" required>
          <Input />
        </Form.Item>
        <Form.Item label="封面图" name="cover">
          <Input />
        </Form.Item>
      </Form>
    </>
  )
}

export default VideoSet
