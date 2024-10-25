import useStore from '@/store'
import { SetTitle } from '@/styles/global'
import { cosEnv } from '@/utils'
import { WdUtils } from '@wd/component-ui'
import { Form, Input, Radio } from 'antd'
const Index = () => {
  const { selectedComponentId, components, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)
  const [form] = Form.useForm()

  const pics = [
    {
      value: 'biz-pic-nomal',
      label: '样式一',
      src: cosEnv + '/static-wxxcx/img/20240730-164558.png',
    },
    {
      value: 'biz-pic-holiday',
      label: '样式二',
      src: cosEnv + '/static-wxxcx/img/53aa87b270ae4e6da1d06c9b2e4ce990.jpeg',
    },
  ]
  return (
    <>
      <SetTitle>头部模板</SetTitle>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        initialValues={{ ...setting?.data }}
        onValuesChange={(_, allValues) => {
          const sel = pics.filter(x => x.value === allValues.moduleType)[0]
          // console.log(allValues.moduleType, sel)
          updateComponentData(selectedComponentId, {
            ...allValues,
            url: sel.src,
            data: { ...allValues.data, url: sel.src, moduleType: allValues.moduleType },
          })
        }}
      >
        <Form.Item label="模板" name="moduleType" required>
          <Radio.Group style={{ display: 'flex' }}>
            {pics.map(option => (
              <div
                key={option.value}
                css={css({
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 12,
                  marginLeft: 8,
                })}
              >
                <img
                  css={css({ width: 107, height: 69, borderRadius: 5 })}
                  src={option.src}
                  alt={option.value}
                />
                <Radio
                  key={option.value}
                  value={option.value}
                  disabled
                  style={{ transform: 'translateX(8px)', marginTop: 10 }}
                >
                  {option.label}
                </Radio>
              </div>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: false, validator: (_, val) => WdUtils.validateText(_, val) }]}
        >
          <Input showCount maxLength={10} />
        </Form.Item>
        <Form.Item
          label="副标题"
          name="sub"
          rules={[{ required: false, validator: (_, val) => WdUtils.validateText(_, val) }]}
        >
          <Input showCount maxLength={10} />
        </Form.Item>
      </Form>
    </>
  )
}

export default Index
