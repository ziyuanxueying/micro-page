import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'

const BuoyTem = (props: TemProps) => {
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
      <div>浮标</div>
    </div>
  )
}

export default BuoyTem
