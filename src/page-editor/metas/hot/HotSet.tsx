import useStore from '@/store'
import { toComponentUrl } from '@/utils'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { WdUploadPicture } from '@wd/component-ui'
import { Button, Card, Divider, Form, Image, Input, Modal, Typography } from 'antd'

const { Title } = Typography

const HotSet = () => {
  const { components, selectedComponentId, updateComponentData } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const [modalVisible, setModalVisible] = useState(false)

  const [form] = Form.useForm()

  const url = selectedComponent?.data?.url
  const fileList = url ? [{ url }] : []

  return (
    <>
      <Title level={5} style={{ fontWeight: 500, marginBottom: 0 }} css={css({ textIndent: 10 })}>
        热区图片
      </Title>
      <Divider css={css({ margin: '16px 0' })} />
      <Form
        form={form}
        labelCol={{ span: 5 }}
        initialValues={selectedComponent?.data}
        onValuesChange={(_, allValues) => {
          updateComponentData(selectedComponentId, {
            ...allValues,
            url: toComponentUrl(allValues.url),
          })
        }}
      >
        <Form.Item label="添加图片" name="url">
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
                width: 375,
                backgroundColor: '#fff',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
                height: 500,
              })}
            >
              <Image src={url} preview={false} />
            </div>
            <div
              css={css({
                flex: 1,
              })}
            >
              <Form.List name="links">
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
                              <Form.Item {...restField} label="跳转链接" name={[name]} required>
                                <Input />
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
                        shouldUpdate={(prev, cur) => prev.links !== cur.links}
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
                            onClick={() => add()}
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
