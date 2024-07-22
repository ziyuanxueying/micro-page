import { WdMaterial, ImagePreview } from '@wd/component-ui'
import { Button } from 'antd'

type MyProps = {
  value?: string
  onChange?: (date: any) => void
}
const Index = (props: MyProps) => {
  console.log('props: ', props)
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState<any>(props?.value || '')
  const handleCancel = () => {
    setIsOpen(false)
  }
  const handleOk = (url: string) => {
    props.onChange?.(url)
    setUrl(url)
    setIsOpen(false)
  }
  const handleDelete = () => {}
  return (
    <>
      <div>
        <Button type="primary" onClick={() => setIsOpen(true)}>
          素材库
        </Button>
        <WdMaterial
          limit={1}
          maxCount={1}
          disabled={false}
          noValidate={false}
          open={isOpen}
          onCancel={handleCancel}
          onOk={handleOk}
        />
        {url && (
          <ImagePreview
            data={[{ src: url }]}
            width={200}
            height={200}
            colNum={1}
            isDefault={false}
            isDelete={false}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  )
}

export default Index
