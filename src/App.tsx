import { List, Switch, Typography } from 'antd'

const { Text } = Typography

function App() {
  const [preview, setPreview] = useState(false)

  return (
    <div className="px-10 py-5">
      <header className="mb-5">
        <div className="flex gap-1">
          <Text>Preview</Text>
          <Switch onChange={setPreview} />
        </div>
      </header>

      <main className="flex gap-10">
        <List
          header={<Text className="font-bold text-base">组件库</Text>}
          bordered
          className="w-300px"
        >
          <List.Item className="cursor-grab active:cursor-grabbing hover:bg-red-1 active:bg-red-2">
            <List.Item.Meta title="输入框" description="我是输入框" />
            <div className="i-solar:text-field-bold w20 h20 cursor-grab active:cursor-grabbing" />
          </List.Item>
          <List.Item className="cursor-grab active:cursor-grabbing hover:bg-red-1 active:bg-red-2">
            <List.Item.Meta title="图片" description="我是图片" />
            <div className="i-bi:image w20 h20 " />
          </List.Item>
        </List>

        <div className="flex-1">page editor</div>
        {preview && <div className="flex-1">page preview</div>}
      </main>
    </div>
  )
}

export default App
