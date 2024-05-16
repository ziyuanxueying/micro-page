import { Radio, RadioChangeEvent } from 'antd'
interface ShopSetProps {
  data: any
  dataChange: (data: any) => void
}
const Index = (prop: ShopSetProps) => {
  // console.log('商品 设置内容 prop: ', prop.data)
  const { data } = prop
  const [value, setValue] = useState(1)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
    // data.mouldTpye
    data.mouldTpye = e.target.value
    prop.dataChange(data)
    // data.setValue('mouldTpye', e.target.value)
  }
  useEffect(() => {
    console.log('data: ', data)
  }, [data])
  return (
    <div>
      <div
        css={css({
          borderBlockEnd: '1px solid #ddd',
          fontSize: 17,
          paddingBottom: 6,
          marginBottom: 10,
        })}
      >
        商品组件
      </div>
      <div>
        选择模板：{value}
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>一行两个</Radio>
          <Radio value={2}>一行三个</Radio>
          <Radio value={3}>横向滚动</Radio>
        </Radio.Group>
      </div>
    </div>
  )
}

export default Index
