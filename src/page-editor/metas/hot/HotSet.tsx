import useStore from '@/store'
import { PlusCircleOutlined } from '@ant-design/icons'
import { WdAllocation } from '@wd/component-ui'
import { Button, Form, Image, Modal, Typography } from 'antd'
import HotItem from './HotItem'
import { v4 as uuidv4 } from 'uuid'
import MaterialBtn from '@/page-editor/components/MaterialBtn'
import { SetTitle } from '@/styles/global'
import { defaultImage } from '@/utils'

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

  const updateHot = async (id: string, value: Partial<Hot>) => {
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
    // console.log('form.getFieldsValue(): ', form.getFieldsValue())
    updateComponentData(selectedComponentId, {
      ...values,
      url,
    })
  }

  // const handleCancel = () => {
  //   setIsOpen(false)
  // }
  // const handleDelete = () => {
  //   // setImgData([])
  //   setting && updateComponentData(setting.id, { ...setting.data, img: '' })
  // }
  const handleOk = async (url?: string) => {
    setUrl(url)
    setting && updateComponentData(setting.id, { ...setting.data, url })
    // setIsOpen(false)
  }

  return (
    <>
      <SetTitle>热区图片</SetTitle>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        initialValues={setting?.data}
        onValuesChange={(_, allValues) => {
          // console.log('allValues: ', allValues)
          updateComponentData(selectedComponentId, {
            ...allValues,
            // url: toComponentUrl(allValues.url),
          })
        }}
      >
        <Form.Item label="添加图片" name="url" required>
          <MaterialBtn
            accept=".jpg,.png,.jpeg,.gif,.JPG,.JPEG,.PNG,.GIT"
            limit={2}
            extra="支持PNG、JPG、JPEG、GIF格式，大小支持2M，建议宽度1200PX"
            onChange={handleOk}
          />
        </Form.Item>
        {url && (
          <Button
            type="primary"
            ghost
            css={css({
              marginLeft: 78,
              borderRadius: 2,
            })}
            onClick={() => setModalVisible(true)}
          >
            热区配置
          </Button>
        )}
        <Modal
          open={modalVisible}
          onOk={async () => (await form.validateFields()) && setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
          width={900}
          title="添加热区"
          okText="确定"
          cancelText="取消"
          styles={{
            header: {
              lineHeight: 1,
            },
            footer: {
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        >
          <div
            css={css({
              display: 'flex',
              gap: 20,
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
              <Image src={url} preview={false} width={375} fallback={defaultImage} />
              <div
                css={css({
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                })}
              >
                {hots.map((hot: Hot, index: number) => (
                  <HotItem key={hot.id} data={hot} index={index} updateHot={updateHot} />
                ))}
              </div>
            </div>
            <div css={css({ flex: 1 })}>
              <Form.List name="hots">
                {(fields, { add, remove }, { errors }) => {
                  return (
                    <>
                      <div css={css({ display: 'flex', flexDirection: 'column' })}>
                        <Button
                          type="primary"
                          ghost
                          icon={<PlusCircleOutlined />}
                          css={css({
                            width: 184,
                            height: 32,
                            borderRadius: 2,
                            position: 'absolute',
                            right: 23,
                            zIndex: 1,
                            background: '#ffffff !important',
                            marginRight: 10,
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
                          添加热区（最多10个）
                        </Button>
                        <div css={css({ height: 32 })}></div>
                        {fields.map(({ name, ...restField }, index) => {
                          return (
                            <div
                              css={css({
                                width: 438,
                                background: 'rgba(0,0,0,0.02)',
                                borderRadius: 8,
                                paddingTop: 11,
                                paddingLeft: 11,
                                marginTop: 20,
                                // zIndex: 1,
                                position: 'relative',
                              })}
                            >
                              <Typography.Text
                                style={{ marginLeft: 15, fontSize: 14, color: '#636363' }}
                              >
                                {/* {hots[key]?.name} */}
                                热区{index + 1}
                              </Typography.Text>
                              <Form.Item
                                {...restField}
                                label="跳转链接"
                                name={[name, 'link']}
                                required
                                rules={[{ required: true, message: '请选择跳转链接' }]}
                              >
                                <WdAllocation
                                  status={['poster', 'mini', 'external']}
                                  // value={pathVal}
                                  onChangeData={() => {}}
                                />
                              </Form.Item>

                              <Button
                                type="link"
                                css={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  // zIndex: 100,
                                }}
                                onClick={() => remove(name)}
                              >
                                删除
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                      <Form.Item
                        shouldUpdate={(prev, cur) => prev.hots !== cur.hots}
                        css={css({ marginTop: 20 })}
                      >
                        <>
                          {/* <Button
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
                          </Button> */}
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
