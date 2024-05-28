import useStore from '@/store'
import { Form, Input, Radio, Typography, Divider, Card } from 'antd'
import { WdUploadPicture } from '@wd/component-ui'

const { Title } = Typography

const RubikCubeSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const [form] = Form.useForm()

  const handleTemplateChange = () => {
    const { template, pictures } = form.getFieldsValue()

    const nextPictures =
      pictures.length < template ? [...pictures, undefined] : pictures.slice(0, template)

    form.setFieldValue('pictures', nextPictures)
    updateComponentData(selectedComponentId, {
      template,
      pictures: nextPictures.map((picture: any) => ({
        ...picture,
        url: picture?.url?.at(0)?.url ?? '',
      })),
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
            pictures: allValues.pictures.map((picture: any) => ({
              ...picture,
              url: picture?.url?.at(0)?.url ?? '',
            })),
          })
        }}
      >
        <Form.Item label="模版" name="template" required>
          <Radio.Group onChange={handleTemplateChange}>
            <Radio value={2}>一行两个</Radio>
            <Radio value={3}>一行三个</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.List name="pictures">
          {fields => {
            return (
              <div css={css({ display: 'flex', flexDirection: 'column', gap: 20 })}>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    styles={{ body: { paddingLeft: 0, paddingTop: 30 } }}
                  >
                    <Form.Item {...restField} label="图片" name={[name, 'url']}>
                      <WdUploadPicture
                        url="/cos-api/xapi-pc-web/file/tmpSecret"
                        cosType="QD"
                        // fileList={[posterUrl]}
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
                ))}
              </div>
            )
          }}
        </Form.List>
      </Form>
    </>
  )
}

export default RubikCubeSet
