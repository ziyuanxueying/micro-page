import { TemProps } from '@/page-editor/components/ItemTemplate'

const ImageMapTem = (props: TemProps) => {
  console.log(props)
  return (
    <div
      css={css({
        padding: 10,
        background: '#fff',
      })}
    >
      <div>热区图片</div>
    </div>
  )
}

export default ImageMapTem
