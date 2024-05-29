import useStore from '@/store'
import { toComponentPictures, toHexString } from '@/utils'
import { WdUploadPicture } from '@wd/component-ui'
import { Card, ColorPicker, Divider, Form, Input, Radio, Typography } from 'antd'

const { Title } = Typography

const BottomNavSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const [form] = Form.useForm()

  const handleTemplateChange = () => {
    const { template, pictures, ...values } = form.getFieldsValue()

    const nextPictures =
      pictures.length < template
        ? [...pictures, ...Array(template - pictures.length)]
        : pictures.slice(0, template)

    form.setFieldValue('pictures', nextPictures)

    updateComponentData(selectedComponentId, {
      ...values,
      template,
      pictures: toComponentPictures(nextPictures),
    })
  }

  return (
    <>
      <Title level={5} style={{ fontWeight: 500, marginBottom: 0 }} css={css({ textIndent: 10 })}>
        魔方
      </Title>
      <Divider css={css({ margin: '16px 0' })} />
      <Form
        form={form}
        labelCol={{ span: 5 }}
        initialValues={{
          ...selectedComponent?.data,
          pictures: selectedComponent?.data?.pictures.length
            ? selectedComponent.data.pictures
            : Array(selectedComponent?.data?.template).fill(undefined),
        }}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, {
            ...allValues,
            backgroundColor: toHexString(allValues.backgroundColor),
            pictures: toComponentPictures(allValues.pictures),
          })
        }}
      >
        <Form.Item label="模版" name="template" required>
          <Radio.Group
            onChange={handleTemplateChange}
            css={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 100px)',
            })}
          >
            <Radio value={2}>一行两个</Radio>
            <Radio value={3}>一行三个</Radio>
            <Radio value={4}>一行四个</Radio>
            <Radio value={5}>一行五个</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.List name="pictures">
          {fields => {
            return (
              <div css={css({ display: 'flex', flexDirection: 'column', gap: 20 })}>
                {fields.map(({ key, name, ...restField }) => {
                  const url = selectedComponent?.data?.pictures?.[key]?.url
                  const fileList = url ? [{ url }] : []

                  return (
                    <Card
                      key={key}
                      size="small"
                      styles={{ body: { paddingLeft: 0, paddingTop: 30 } }}
                    >
                      <Form.Item {...restField} label="图片" name={[name, 'url']}>
                        <WdUploadPicture
                          url="/cos-api/xapi-pc-web/file/tmpSecret"
                          cosType="QD"
                          fileList={fileList}
                          path="micro-page"
                          multiple={false}
                          maxCount={1}
                          theme="drag"
                          defaultTip="更换图片"
                          width={100}
                          height={100}
                        />
                      </Form.Item>
                      <Form.Item {...restField} label="跳转链接" name={[name, 'link']}>
                        <Input />
                      </Form.Item>
                    </Card>
                  )
                })}
              </div>
            )
          }}
        </Form.List>
        <Form.Item label="导航底色" name="backgroundColor" css={css({ marginTop: 20 })}>
          <ColorPicker showText />
        </Form.Item>
      </Form>
    </>
  )
}

export default BottomNavSet
