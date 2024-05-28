import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { Image } from 'antd'

const ImageTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { data } = current || {}

  console.log(data)

  return (
    <Image
      src={data?.src}
      preview={false}
      css={css({
        width: '100%',
      })}
    />
  )
}

export default ImageTem
