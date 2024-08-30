import useStore from '@/store'
import { SetTitle } from '@/styles/global'
import { toHexString } from '@/utils'
import { WdUtils } from '@wd/component-ui'
import { ColorPicker, Form, Input, Segmented } from 'antd'

const { TextArea } = Input

const TitleTextSet = () => {
  const { components, selectedComponentId, updateComponent } = useStore()

  const selectedComponent: any = components.find(c => c.id === selectedComponentId)

  const { moduleType, radius, textAlign, titleSize, titleWeight, descSize, descWeight } =
    selectedComponent.data
  return (
    <div>
      <SetTitle>标题文本</SetTitle>
      <Form
        labelCol={{ span: 5 }}
        initialValues={selectedComponent?.data}
        onValuesChange={(_, allValues) => {
          selectedComponent &&
            updateComponent(selectedComponent?.id, {
              ...selectedComponent,
              data: {
                ...allValues,
                titleColor: toHexString(allValues.titleColor),
                descColor: toHexString(allValues.descColor),
                backgroundColor: toHexString(allValues.backgroundColor),
                moduleType: allValues.moduleType,
                radius:
                  selectedComponent?.data?.moduleType === 'banner'
                    ? 'rightAngle'
                    : allValues.radius,
              },
            })
          console.log({
            ...allValues,
            titleColor: toHexString(allValues.titleColor),
            descColor: toHexString(allValues.descColor),
            backgroundColor: toHexString(allValues.backgroundColor),
            moduleType: allValues.moduleType,
          })
        }}
      >
        <Form.Item
          label="标题内容"
          name="title"
          required
          rules={[{ required: true, validator: (_, val) => WdUtils.validateText(_, val) }]}
        >
          <Input showCount maxLength={50} />
        </Form.Item>
        <Form.Item
          label="描述内容"
          name="desc"
          getValueFromEvent={(e: any) => e.target.value.trim()}
        >
          <TextArea showCount maxLength={500} />
        </Form.Item>

        <Form.Item label="样式" name="moduleType">
          <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 4, paddingTop: 13 }}>
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="5443"
                      width="22"
                      height="22"
                    >
                      <path
                        d="M136 792h752V232H136v560zM64 192c0-17.673 14.327-32 32-32h832c17.673 0 32 14.327 32 32v640c0 17.673-14.327 32-32 32H96c-17.673 0-32-14.327-32-32V192z m200 192a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h303a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H264z m-7 200a8 8 0 0 1 8-8h303a8 8 0 0 1 8 8v48a8 8 0 0 1-8 8H265a8 8 0 0 1-8-8v-48z m455-264a8 8 0 0 0-8 8v368a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8V328a8 8 0 0 0-8-8h-48z"
                        fill={moduleType === 'card' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)'}
                        p-id="5444"
                      ></path>
                    </svg>
                    <div>卡片</div>
                  </div>
                ),
                value: 'card',
              },
              {
                label: (
                  <div style={{ padding: 4, paddingTop: 13 }}>
                    <svg
                      viewBox="0 0 1260 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="4408"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M1067.165538 35.84V998.793846H161.634462V35.84h905.531076z m-78.690461 78.769231H240.403692v805.257846h748.071385V114.609231zM23.630769 37.809231h78.769231v964.135384h-78.769231zM1126.4 37.809231h78.769231v964.135384h-78.769231z"
                        fill={moduleType === 'banner' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)'}
                        p-id="4409"
                      ></path>
                    </svg>
                    <div>通栏</div>
                  </div>
                ),
                value: 'banner',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="倒角"
          name="radius"
          style={{ display: selectedComponent?.data?.moduleType === 'banner' ? 'none' : 'block' }}
        >
          <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 4, paddingTop: 13 }}>
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="51665"
                      width="22"
                      height="22"
                    >
                      <path
                        d="M204.8 204.8v614.4h614.4V204.8H204.8zM102.4 102.4h819.2v819.2H102.4V102.4z"
                        fill={radius === 'rightAngle' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)'}
                        p-id="51666"
                      ></path>
                      <path
                        d="M819.2 409.6H409.6v409.6H307.2V307.2h512v102.4z"
                        fill={radius === 'rightAngle' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)'}
                        p-id="51667"
                      ></path>
                    </svg>
                    <div>直角</div>
                  </div>
                ),
                value: 'rightAngle',
              },
              {
                label: (
                  <div style={{ padding: 4, paddingTop: 13 }}>
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="42183"
                      width="22"
                      height="22"
                    >
                      <path
                        d="M921.6 102.4v819.2H102.4V102.4h819.2z m-102.4 102.4H204.8v614.4h102.4v-307.2a204.8 204.8 0 0 1 204.8-204.8h307.2V204.8z m0 204.8h-307.2a102.4 102.4 0 0 0-102.144 94.72L409.6 512v307.2h409.6V409.6z"
                        fill={radius === 'fillet' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)'}
                        p-id="42184"
                      ></path>
                    </svg>
                    <div>圆角</div>
                  </div>
                ),
                value: 'fillet',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="显示位置" name="textAlign">
          <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 4, paddingTop: 13 }}>
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="4252"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M624 119.6H64v112h560v-112z m0 448H64v112h560v-112z m224-224H64v112h784v-112z m-784 448v112h896v-112H64z"
                        fill={textAlign === 'left' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)'}
                        p-id="4253"
                      ></path>
                    </svg>
                    <div>显示居左</div>
                  </div>
                ),
                value: 'left',
              },
              {
                label: (
                  <div style={{ padding: 4, paddingTop: 13 }}>
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="5242"
                      width="22"
                      height="22"
                    >
                      <path
                        d="M743.765 170.24h-457.344c-18.027 0-32.64 14.613-32.64 32.64v32.64c0 18.112 14.656 32.64 32.64 32.64h457.472c18.027 0 32.64-14.613 32.64-32.64v-32.64c0-17.984-14.72-32.64-32.768-32.64zM825.493 366.336h-620.736c0 0 0 0 0 0-18.027 0-32.64 14.613-32.64 32.64v32.64c0 18.112 14.656 32.64 32.64 32.64h620.736c18.027 0 32.64-14.613 32.64-32.64v-32.64c0.001-0.096 0.002-0.209 0.002-0.322 0-17.85-14.47-32.32-32.32-32.32-0.113 0-0.226 0.001-0.339 0.002zM727.445 562.304h-424.768c-18.027 0-32.64 14.613-32.64 32.64v32.704c0 17.92 14.656 32.64 32.64 32.64h424.768c18.038-0.036 32.659-14.613 32.768-32.63v-32.714c0-17.92-14.72-32.64-32.768-32.64zM858.005 758.4h-686.016c-18.027 0-32.64 14.613-32.64 32.64v32.704c0 17.92 14.656 32.64 32.64 32.64h686.144c18.038-0.036 32.659-14.613 32.768-32.63v-32.714c-0.073-18.042-14.715-32.64-32.768-32.64-0.045 0-0.090 0-0.135 0z"
                        fill={textAlign === 'center' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)'}
                        p-id="5243"
                      ></path>
                    </svg>
                    <div>显示居中</div>
                  </div>
                ),
                value: 'center',
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="标题大小" name="titleSize">
          <Segmented
            options={[
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: titleSize === 16 ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontSize: 22 })}>A</div>
                    <div>16号</div>
                  </div>
                ),
                value: 16,
              },
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: titleSize === 14 ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontSize: 20 })}>A</div>
                    <div>14号</div>
                  </div>
                ),
                value: 14,
              },
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: titleSize === 12 ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontSize: 18 })}>A</div>
                    <div>12号</div>
                  </div>
                ),
                value: 12,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="标题样式" name="titleWeight">
          <Segmented
            options={[
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: titleWeight === 'normal' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontWeight: 'normal', fontSize: 20 })}>T</div>
                    <div>常规</div>
                  </div>
                ),
                value: 'normal',
              },
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: titleWeight === 'bold' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontWeight: 'bold', fontSize: 20 })}>T</div>
                    <div>加粗</div>
                  </div>
                ),
                value: 'bold',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="描述大小" name="descSize">
          <Segmented
            options={[
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: descSize === 16 ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontSize: 22 })}>A</div>
                    <div>16号</div>
                  </div>
                ),
                value: 16,
              },
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: descSize === 14 ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontSize: 20 })}>A</div>
                    <div>14号</div>
                  </div>
                ),
                value: 14,
              },
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: descSize === 12 ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontSize: 18 })}>A</div>
                    <div>12号</div>
                  </div>
                ),
                value: 12,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="描述样式" name="descWeight">
          <Segmented
            options={[
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: descWeight === 'normal' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontWeight: 'normal', fontSize: 20 })}>T</div>
                    <div>常规</div>
                  </div>
                ),
                value: 'normal',
              },
              {
                label: (
                  <div
                    style={{
                      padding: 4,
                      paddingTop: 13,
                      color: descWeight === 'bold' ? '#1677ff' : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <div css={css({ fontWeight: 'bold', fontSize: 20 })}>T</div>
                    <div>加粗</div>
                  </div>
                ),
                value: 'bold',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="标题颜色" name="titleColor">
          <ColorPicker showText />
        </Form.Item>
        <Form.Item label="描述颜色" name="descColor">
          <ColorPicker showText />
        </Form.Item>
        <Form.Item label="背景颜色" name="backgroundColor">
          <ColorPicker showText />
        </Form.Item>
      </Form>
    </div>
  )
}

export default TitleTextSet
