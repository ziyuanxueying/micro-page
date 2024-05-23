import { TemProps } from '@/page-editor/components/ItemTemplate'

const ImageTextTem = (props: TemProps) => {
  console.log(props)
  return (
    <div
      css={css({
        padding: 10,
        background: '#fff',
      })}
    >
      <div>图文</div>
    </div>
  )
}

export default ImageTextTem
