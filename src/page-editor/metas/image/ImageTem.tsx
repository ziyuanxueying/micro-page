import { TemProps } from '@/page-editor/components/ItemTemplate'

const ImageTem = (props: TemProps) => {
  console.log(props)
  return (
    <div
      css={css({
        padding: 10,
        background: '#fff',
      })}
    >
      <div>图片</div>
    </div>
  )
}

export default ImageTem
