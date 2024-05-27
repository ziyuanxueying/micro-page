import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'

const ImageTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { data } = current || {}

  console.log(data)

  return (
    <img
      src={data?.src}
      css={css({
        width: '100%',
      })}
    />
  )
}

export default ImageTem
