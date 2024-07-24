import useStore from '@/store'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { WdAllocation } from '@wd/component-ui'
import { Button, Card, Divider, Form, Image, Input, Modal, Typography } from 'antd'
import HotItem from './HotItem'
import { v4 as uuidv4 } from 'uuid'
import MaterialBtn from '@/page-editor/components/MaterialBtn'

const { Title } = Typography

const DEFAULT_HOT = {
  top: 0,
  left: 0,
  width: 100,
  height: 100,
}

export type Hot = {
  id: string
  name: string
  link: string
} & typeof DEFAULT_HOT

const HotSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()

  const setting = components.find(c => c.id === selectedComponentId)

  const [modalVisible, setModalVisible] = useState(false)
  // const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState<any>(setting?.data?.url || '')

  const [form] = Form.useForm()
  const hots = form.getFieldValue('hots') || []

  const updateHot = (id: string, value: Partial<Hot>) => {
    form.setFieldValue(
      'hots',
      hots.map((hot: Hot) => {
        if (hot.id === id) {
          return { ...hot, ...value }
        }
        return hot
      }),
    )

    const { url, ...values } = form.getFieldsValue()
    console.log('form.getFieldsValue(): ', form.getFieldsValue())
    startTransition(() => {
      updateComponentData(selectedComponentId, {
        ...values,
        url,
      })
    })
  }

  // const handleCancel = () => {
  //   setIsOpen(false)
  // }
  // const handleDelete = () => {
  //   // setImgData([])
  //   setting && updateComponentData(setting.id, { ...setting.data, img: '' })
  // }
  const handleOk = (url?: string) => {
    setUrl(url)
    setting && updateComponentData(setting.id, { ...setting.data, url })
    // setIsOpen(false)
  }

  return (
    <>
      <Title level={5} style={{ fontWeight: 500, marginBottom: 0 }} css={css({ textIndent: 10 })}>
        热区图片
      </Title>
      <Divider css={css({ margin: '16px 0' })} />
      <Form
        form={form}
        labelCol={{ span: 5 }}
        initialValues={setting?.data}
        onValuesChange={(_, allValues) => {
          console.log('allValues: ', allValues)
          startTransition(() => {
            updateComponentData(selectedComponentId, {
              ...allValues,
              // url: toComponentUrl(allValues.url),
            })
          })
        }}
      >
        <Form.Item label="添加图片" name="url">
          <MaterialBtn onChange={handleOk} />
        </Form.Item>
        {url && (
          <Button
            type="primary"
            css={css({
              marginLeft: 78,
            })}
            onClick={() => setModalVisible(true)}
          >
            热区配置
          </Button>
        )}
        <Modal
          open={modalVisible}
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
          width={900}
          okText="确定"
          cancelText="取消"
        >
          <div
            css={css({
              display: 'flex',
              gap: 20,
              paddingRight: 30,
              height: 600,
              overflowY: 'auto',
            })}
          >
            <div
              css={css({
                position: 'relative',
                height: 'fit-content',
              })}
            >
              <Image
                src={url}
                preview={false}
                width={375}
                fallback="data:image/png;base64,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"
              />
              <div
                css={css({
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  zIndex: 10,
                })}
              >
                {hots.map((hot: Hot) => (
                  <HotItem key={hot.id} data={hot} updateHot={updateHot} />
                ))}
              </div>
            </div>
            <div
              css={css({
                flex: 1,
              })}
            >
              <Form.List name="hots">
                {(fields, { add, remove }, { errors }) => {
                  return (
                    <>
                      <div css={css({ display: 'flex', flexDirection: 'column', gap: 20 })}>
                        {fields.map(({ key, name, ...restField }) => {
                          return (
                            <Card
                              key={key}
                              size="small"
                              styles={{ body: { padding: '20px 40px 0 20px' } }}
                              css={css({ position: 'relative' })}
                            >
                              <Form.Item
                                {...restField}
                                label="热区名称"
                                name={[name, 'name']}
                                required
                              >
                                <Input />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                label="跳转链接"
                                name={[name, 'link']}
                                required
                              >
                                <WdAllocation
                                  status={['none', 'mini', 'external']}
                                  // value={pathVal}
                                  // onChangeData={onClick}
                                />
                              </Form.Item>

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
                            </Card>
                          )
                        })}
                      </div>
                      <Form.Item
                        shouldUpdate={(prev, cur) => prev.hots !== cur.hots}
                        css={css({ marginTop: 20 })}
                      >
                        <>
                          <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            css={css({
                              width: '100%',
                              height: 40,
                            })}
                            disabled={fields.length >= 10}
                            onClick={() => {
                              add({
                                id: uuidv4(),
                                name: `热区${fields.length + 1}`,
                                link: '',
                                ...DEFAULT_HOT,
                              })
                            }}
                          >
                            添加热区（最多 10 个）
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </>
                      </Form.Item>
                    </>
                  )
                }}
              </Form.List>
            </div>
          </div>
        </Modal>
      </Form>
    </>
  )
}

export default HotSet
