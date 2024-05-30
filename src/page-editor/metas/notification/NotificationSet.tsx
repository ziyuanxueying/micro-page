import useStore from '@/store'
import { toHexString } from '@/utils'
import { ColorPicker, Divider, Form, Input, Typography } from 'antd'

const { Title, Text } = Typography

const NotificationSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  return (
    <>
      <Text>
        <Title
          level={5}
          style={{ fontWeight: 500, marginBottom: 0, display: 'inline-block' }}
          css={css({ textIndent: 10 })}
        >
          消息订阅
        </Title>
        <Text css={css({ marginLeft: 10, color: '#999', fontSize: 12 })}>*仅小程序页面展示</Text>
      </Text>
      <Divider css={css({ margin: '16px 0' })} />
      <Form
        labelCol={{ span: 5 }}
        initialValues={selectedComponent?.data}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, {
            ...allValues,
            titleColor: toHexString(allValues.titleColor),
            backgroundColor: toHexString(allValues.backgroundColor),
          })
        }}
      >
        <div>
          <Text>未订阅：</Text>
          <div css={css({ marginTop: 10, marginLeft: 20 })}>
            <Form.Item label="按钮文字" name="title" required>
              <Input />
            </Form.Item>
            <Form.Item label="文字颜色" name="titleColor" required>
              <ColorPicker showText />
            </Form.Item>
            <Form.Item label="背景颜色" name="backgroundColor" required>
              <ColorPicker showText />
            </Form.Item>
          </div>
        </div>
        <div>
          <Text>已订阅：</Text>
          <div css={css({ marginTop: 10, marginLeft: 20 })}>
            <Form.Item label="按钮文字" name="subscribedTitle" required>
              <Input />
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  )
}

export default NotificationSet
