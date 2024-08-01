import useStore from '@/store'
import { Line } from '@/styles/global'
import { Form, Input, Radio } from 'antd'
const Index = () => {
  const { selectedComponentId, components, updateComponentData } = useStore()
  const setting = components.find(c => c.id === selectedComponentId)
  const [form] = Form.useForm()

  const pics = [
    {
      value: 'biz-pic-nomal',
      label: '样式一',
      src: 'https://xcx02-test-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/20240730-164558.png',
    },
    {
      value: 'biz-pic-holiday',
      label: '样式二',
      src: 'http://xcx02-dev-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/53aa87b270ae4e6da1d06c9b2e4ce990.jpeg',
    },
  ]
  return (
    <>
      <div css={css({ fontSize: 16 })}>头部模板</div>
      <Line />
      <Form
        form={form}
        labelCol={{ span: 4 }}
        initialValues={{ ...setting?.data }}
        onValuesChange={(_, allValues) => {
          const sel = pics.filter(x => x.value === allValues.moduleType)[0]
          console.log(allValues.moduleType, sel)
          updateComponentData(selectedComponentId, {
            ...allValues,
            url: sel.src,
            data: { ...allValues.data, url: sel.src, moduleType: allValues.moduleType },
          })
        }}
      >
        <Form.Item label="选择模版" name="moduleType">
          <Radio.Group style={{ display: 'flex' }}>
            {pics.map(option => (
              <div
                css={css({
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 30,
                })}
              >
                <img
                  css={css({ width: 108, height: 70, borderRadius: 10 })}
                  src={option.src}
                  alt={option.value}
                />
                <Radio
                  key={option.value}
                  value={option.value}
                  style={{ transform: 'translateX(8px)', marginTop: 10 }}
                >
                  {option.label}
                </Radio>
              </div>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="标题" name="title" required>
          <Input showCount maxLength={10} />
        </Form.Item>
        <Form.Item label="副标题" name="sub">
          <Input showCount maxLength={10} />
        </Form.Item>
      </Form>
    </>
  )
}

export default Index
