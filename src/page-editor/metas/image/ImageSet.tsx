import useStore from '@/store'
import { Form, Input, Radio, Typography, Divider, Card, Button } from 'antd'
import { WdUploadPicture } from '@wd/component-ui'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { toComponentPictures } from '@/utils'

const { Title } = Typography

const ImageSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const [form] = Form.useForm()

  const handleTemplateChange = () => {
    const { template, pictures } = form.getFieldsValue()

    const nextPictures = template === 'image' ? pictures.slice(0, 1) : pictures

    form.setFieldValue('pictures', nextPictures)
    updateComponentData(selectedComponentId, {
      template,
      pictures: toComponentPictures(nextPictures),
    })
  }

  return (
    <>
      <Title level={5} style={{ fontWeight: 500, marginBottom: 0 }} css={css({ textIndent: 10 })}>
        图片
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
            pictures: toComponentPictures(allValues.pictures),
          })
        }}
      >
        <Form.Item label="模版" name="template" required>
          <Radio.Group onChange={handleTemplateChange}>
            <Radio value="image">单张</Radio>
            <Radio value="carousel">轮播</Radio>
            <Radio value="carousel-fullscreen">全屏轮播</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.List name="pictures">
          {(fields, { add, remove }, { errors }) => {
            return (
              <>
                <div css={css({ display: 'flex', flexDirection: 'column', gap: 20 })}>
                  {fields.map(({ key, name, ...restField }) => {
                    const url = selectedComponent?.data?.pictures?.[key]?.url
                    const fileList = url ? [{ url }] : []

                    return (
                      <Card
                        key={key}
                        size="small"
                        styles={{ body: { paddingLeft: 0, paddingTop: 30 } }}
                        css={css({ position: 'relative' })}
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

                        {fields.length > 1 ? (
                          <Button
                            type="text"
                            css={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              zIndex: 100,
                            }}
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                          />
                        ) : null}
                      </Card>
                    )
                  })}
                </div>
                <Form.Item
                  shouldUpdate={(prev, cur) => prev.template !== cur.template}
                  css={css({ marginTop: 20 })}
                >
                  {({ getFieldValue }) => {
                    const template = getFieldValue('template')
                    if (template === 'image') {
                      return null
                    }
                    return (
                      <>
                        <Button
                          type="primary"
                          icon={<PlusCircleOutlined />}
                          css={css({
                            width: '100%',
                            height: 40,
                          })}
                          onClick={() => add()}
                        >
                          添加轮播图
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </>
                    )
                  }}
                </Form.Item>
              </>
            )
          }}
        </Form.List>
      </Form>
    </>
  )
}

export default ImageSet
