import { PlusOutlined } from '@ant-design/icons'
import { WdMaterial, ImagePreview } from '@wd/component-ui'
import { Button, Typography } from 'antd'

type MyProps = {
  value?: string
  isDelete?: boolean
  extra?: string
  accept?: string
  limit?: number
  proportion?: number
  onChange?: (date: any) => void
}
const Index = (props: MyProps) => {
  const [isOpen, setIsOpen] = useState(false)
  // const [url, setUrl] = useState<any>(props?.value || '')
  console.log(props)
  const handleCancel = () => {
    setIsOpen(false)
  }
  const handleOk = (url: string) => {
    props.onChange?.(url)
    setIsOpen(false)
  }
  const handleDelete = () => {
    props.onChange?.(null)
    setIsOpen(false)
  }

  return (
    <>
      <div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          ghost
          onClick={() => setIsOpen(true)}
          style={{ borderRadius: 2 }}
        >
          添加图片
        </Button>
        <WdMaterial
          // limit={1}
          maxCount={1}
          disabled={false}
          noValidate={false}
          open={isOpen}
          accept={props.accept}
          limit={props.limit}
          proportion={props.proportion}
          onCancel={handleCancel}
          onOk={handleOk}
        />
        {props.extra && (
          <Typography.Text
            type="secondary"
            style={{ fontSize: 12, color: '#BABABA', marginTop: 10, display: 'block' }}
          >
            {props.extra}
          </Typography.Text>
        )}
        <div css={css({ marginTop: 15 })}></div>
        {props?.value && (
          <ImagePreview
            data={[{ src: props?.value }]}
            width={200}
            height={200}
            colNum={1}
            isDefault={false}
            isDelete={props?.isDelete}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  )
}

export default Index
