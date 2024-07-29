import { WdMaterial, ImagePreview } from '@wd/component-ui'
import { Button } from 'antd'

type MyProps = {
  value?: string
  isDelete?: boolean
  onChange?: (date: any) => void
}
const Index = (props: MyProps) => {
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
  const handleDelete = () => {
    props.onChange?.(null)
    setUrl(null)
    setIsOpen(false)
  }

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
            isDelete={props.isDelete}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  )
}

export default Index
