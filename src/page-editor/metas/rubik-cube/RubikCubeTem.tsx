import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'

const RubikCubeTem = (props: TemProps) => {
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
      <div>魔方</div>
    </div>
  )
}

export default RubikCubeTem
