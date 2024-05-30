import useStore from '@/store'
import { Form, Input, Radio, Typography, Divider } from 'antd'
import { WdUploadPicture } from '@wd/component-ui'
import { toComponentUrl } from '@/utils'

const { TextArea } = Input
const { Title } = Typography

const ImageTextSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const url = selectedComponent?.data?.url
  const fileList = url ? [{ url }] : []

  return (
    <>
      <Title level={5} style={{ fontWeight: 500, marginBottom: 0 }} css={css({ textIndent: 10 })}>
        图文
      </Title>
      <Divider css={css({ margin: '16px 0' })} />
      <Form
        labelCol={{ span: 5 }}
        initialValues={selectedComponent?.data}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, {
            ...allValues,
            url: toComponentUrl(allValues.url),
          })
        }}
      >
        <Form.Item label="模版" name="moduleType" required>
          <Radio.Group>
            <Radio value={1}>左图右文</Radio>
            <Radio value={2}>上图下文</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="标题" name="title" required>
          <Input required />
        </Form.Item>
        <Form.Item label="描述" name="desc" required>
          <TextArea />
        </Form.Item>
        <Form.Item label="图片" name="url" required>
          <WdUploadPicture
            url="/cos-api/xapi-pc-web/file/tmpSecret"
            cosType="QD"
            fileList={fileList}
            path="wxxcx/img"
            multiple={false}
            maxCount={1}
            theme="drag"
            defaultTip="更换图片"
            width={100}
            height={100}
          />
        </Form.Item>
        <Form.Item label="跳转链接" name="link">
          <Input />
        </Form.Item>
      </Form>
    </>
  )
}

export default ImageTextSet
