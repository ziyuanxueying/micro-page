import { Button, Radio, RadioChangeEvent } from 'antd'
import { line, flexb, Divp, Line } from '@global'
import useStore from '@/store'

const Index = () => {
  const { selectedComponentId, components, updateComponent } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const [value, setValue] = useState(selectedComponent?.data?.moduleType || 1)
  const [shopVal, setShopValue] = useState(1)

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)

    selectedComponent &&
      updateComponent(selectedComponent.id, {
        ...selectedComponent,
        data: {
          ...selectedComponent.data,
          moduleType: e.target.value,
        },
      })
  }

  const onShopChange = (e: RadioChangeEvent) => {
    setShopValue(e.target.value)
  }

  useEffect(() => {
    setValue(selectedComponent?.data?.moduleType || 1)
  }, [selectedComponent])

  return (
    <div>
      <div css={css({ fontSize: 17 })}>商品组件</div>
      <div css={css([line])} />
      <div>
        选择模板：
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>一行两个</Radio>
          <Radio value={2}>一行三个</Radio>
          <Radio value={3}>横向滚动</Radio>
        </Radio.Group>
      </div>
      <Line />
      <div>
        <div>添加商品</div>
        <div css={css({ border: '1px solid #ccc', padding: 10, borderRadius: 4, margin: '10px' })}>
          <Radio.Group onChange={onShopChange} value={shopVal}>
            <Radio value={1}>指定商品</Radio>
            <Radio value={2}>指定门店</Radio>
            <Radio value={3}>全部商品</Radio>
          </Radio.Group>
          {shopVal === 1 && (
            <div>
              <Divp css={css([flexb])}>
                <Button type="primary">选择商品</Button>
                <Button>清除</Button>
              </Divp>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
