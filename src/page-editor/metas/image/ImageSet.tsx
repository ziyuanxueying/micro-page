import useStore from '@/store'
import { Form, Radio, Typography, Divider, Card, Button } from 'antd'
import { WdAllocation } from '@wd/component-ui'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import MaterialBtn from '@/page-editor/components/MaterialBtn'

const { Title } = Typography

const ImageSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)
  const [form] = Form.useForm()

  const handleModuleTypeChange = () => {
    const { moduleType, pictures } = form.getFieldsValue()
    const nextPictures = moduleType === 'image' ? pictures.slice(0, 1) : pictures
    form.setFieldValue('pictures', nextPictures)
    updateComponentData(selectedComponentId, {
      moduleType,
      pictures: nextPictures,
      // pictures: toComponentPictures(nextPictures),
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
          ...setting?.data,
          pictures: setting?.data?.pictures.length
            ? setting.data.pictures
            : Array(setting?.data?.moduleType).fill(undefined),
        }}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, { ...allValues })
        }}
      >
        <Form.Item label="模版" name="moduleType">
          <Radio.Group onChange={handleModuleTypeChange}>
            <Radio value="image">单张</Radio>
            <Radio value="carousel">轮播</Radio>
            <Radio value="carousel-fullscreen">全屏轮播</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.List name="pictures">
          {(fields, { add, remove }, { errors }) => {
            return (
              <div>
                <div css={css({ display: 'flex', flexDirection: 'column', gap: 20 })}>
                  {fields.map(({ key, name, ...restField }) => {
                    return (
                      <Card
                        key={key}
                        size="small"
                        styles={{ body: { paddingLeft: 0, paddingTop: 30 } }}
                        css={css({ position: 'relative' })}
                      >
                        <Form.Item {...restField} label="图片" name={[name, 'url']} required>
                          <MaterialBtn isDelete={true} />
                        </Form.Item>
                        <Form.Item {...restField} label="跳转链接" name={[name, 'link']}>
                          <WdAllocation
                            status={['none', 'mini', 'external']}
                            onChangeData={() => {}}
                          />
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
                  shouldUpdate={(prev, cur) => prev.moduleType !== cur.moduleType}
                  css={css({ marginTop: 20 })}
                >
                  {({ getFieldValue }) => {
                    const moduleType = getFieldValue('moduleType')
                    if (moduleType === 'image') {
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
              </div>
            )
          }}
        </Form.List>
      </Form>
    </>
  )
}

export default ImageSet
