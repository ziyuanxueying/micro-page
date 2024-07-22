import useStore from '@/store'
import { Form, Radio, Typography, Divider, Card, Button } from 'antd'
import { WdMaterial, ImagePreview, WdAllocation } from '@wd/component-ui'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { toComponentPictures } from '@/utils'

const { Title } = Typography

const ImageSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)
  const [isOpen, setIsOpen] = useState(false)
  const [pictures, setPictures] = useState<any>(
    setting?.data?.pictures.length ? setting.data.pictures : [{}],
  )
  // const [imgData, setImgData] = useState<any>([{ src: setting?.data?.img, name: '图片' }])
  // const [pathVal, setPathVal] = React.useState('')
  const [form] = Form.useForm()

  const handleModuleTypeChange = () => {
    const { moduleType, pictures } = form.getFieldsValue()
    const nextPictures = moduleType === 'image' ? pictures.slice(0, 1) : pictures
    form.setFieldValue('pictures', nextPictures)
    updateComponentData(selectedComponentId, {
      moduleType,
      pictures: toComponentPictures(nextPictures),
    })
  }
  const handleCancel = () => {
    setIsOpen(false)
  }
  const handleDelete = () => {
    // setImgData([])
    setting && updateComponentData(setting.id, { ...setting.data, img: '' })
  }
  const handleOk = (url: string, key: any) => {
    const pics = [...pictures]
    pics[key] = { url, ...pics[key] }
    setPictures(pics)
    setting && updateComponentData(setting.id, { ...setting.data, pictures })
    setIsOpen(false)
  }
  const onPathClick = (link: string, key: any) => {
    const pics = [...pictures]
    pics[key] = { link, ...pics[key] }
    setPictures(pics)
    setting && updateComponentData(setting.id, { ...setting.data, pictures })
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
      >
        <Form.Item label="模版" name="moduleType" required>
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
                    console.log('key, name, ...restField: ', restField)
                    const url = setting?.data?.pictures?.[key]?.url
                    const link = setting?.data?.pictures?.[key]?.link
                    return (
                      <Card
                        key={key}
                        size="small"
                        styles={{ body: { paddingLeft: 0, paddingTop: 30 } }}
                        css={css({ position: 'relative' })}
                      >
                        <Form.Item {...restField} label="图片" name={[name, 'url']}>
                          <div>
                            <Button type="primary" onClick={() => setIsOpen(true)}>
                              素材库
                            </Button>
                            <WdMaterial
                              limit={1}
                              maxCount={1}
                              disabled={false}
                              noValidate={false}
                              open={isOpen}
                              onCancel={handleCancel}
                              onOk={url => handleOk(url, key)}
                            />
                            {url && (
                              <ImagePreview
                                data={[{ src: url }]}
                                width={200}
                                height={200}
                                colNum={1}
                                isDefault={false}
                                isDelete={false}
                                onDelete={handleDelete}
                              />
                            )}
                          </div>
                        </Form.Item>
                        <Form.Item {...restField} label="跳转链接" name={[name, 'link']}>
                          <WdAllocation
                            status={['none', 'mini', 'external']}
                            value={link}
                            onChangeData={path => onPathClick(path, key)}
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
