import { Line } from '@/styles/global'
import { Radio, RadioChangeEvent } from 'antd'
import useStore from '@/store'

const Index = () => {
  const { selectedComponentId, components, updateComponent } = useStore()
  const selectedComponent = components.find(c => c.id === selectedComponentId)
  const [value, setValue] = useState(selectedComponent?.data.mouldTpye || 1)

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)

    selectedComponent &&
      updateComponent(selectedComponent.id, {
        ...selectedComponent,
        data: {
          ...selectedComponent.data,
          mouldTpye: e.target.value,
        },
      })
  }
  useEffect(() => {
    setValue(selectedComponent?.data.mouldTpye || 1)
  }, [selectedComponent])
  return (
    <div>
      <div css={css({ fontSize: 17 })}>免费优惠券</div>
      <Line />
      <div>
        选择模板：
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>纯文字</Radio>
          <Radio value={2}>图文</Radio>
          <Radio value={3}>一行两个</Radio>
        </Radio.Group>
      </div>
      <Line />
    </div>
  )
}

export default Index
