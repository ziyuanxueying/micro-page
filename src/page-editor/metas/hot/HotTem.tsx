import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'

const HotTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { data } = current || {}

  console.log(data)

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

export default HotTem