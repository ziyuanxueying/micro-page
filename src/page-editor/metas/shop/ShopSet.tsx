import useStore from '@/store'
import { Radio, RadioChangeEvent } from 'antd'

const Index = () => {
  const [value, setValue] = useState(1)
  const { selectedModule, setSelectedModule } = useStore()

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)

    selectedModule &&
      setSelectedModule({
        ...selectedModule,
        data: {
          ...selectedModule.data,
          mouldTpye: e.target.value,
        },
      })
  }

  return (
    <>
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
        选择模板：
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>一行两个</Radio>
          <Radio value={2}>一行三个</Radio>
          <Radio value={3}>横向滚动</Radio>
        </Radio.Group>
      </div>
    </>
  )
}

export default Index
