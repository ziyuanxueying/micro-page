import useStore from '@/store'
import { toHexString } from '@/utils'
import { ColorPicker, Divider, Form, Input, InputNumber, Radio, Typography } from 'antd'

const { TextArea } = Input
const { Title } = Typography

const TitleTextSet = () => {
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
          updateComponentData(selectedComponentId, {
            ...allValues,
            titleColor: toHexString(allValues.titleColor),
            descColor: toHexString(allValues.descColor),
            backgroundColor: toHexString(allValues.backgroundColor),
          })
        }}
      >
        <Form.Item label="标题内容" name="title" required>
          <Input showCount maxLength={10} />
        </Form.Item>
        <Form.Item label="描述内容" name="desc">
          <TextArea showCount maxLength={500} />
        </Form.Item>
        <Form.Item label="显示位置" name="textAlign">
          <Radio.Group>
            <Radio value="left">显示居左</Radio>
            <Radio value="center">显示居中</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="标题大小" name="titleSize">
          <InputNumber addonAfter="px" />
        </Form.Item>
        <Form.Item label="描述大小" name="descSize">
          <InputNumber addonAfter="px" />
        </Form.Item>
        <Form.Item label="标题颜色" name="titleColor">
          <ColorPicker showText />
        </Form.Item>
        <Form.Item label="描述颜色" name="descColor">
          <ColorPicker showText />
        </Form.Item>
        <Form.Item label="背景颜色" name="backgroundColor">
          <ColorPicker showText />
        </Form.Item>
      </Form>
    </>
  )
}

export default TitleTextSet
