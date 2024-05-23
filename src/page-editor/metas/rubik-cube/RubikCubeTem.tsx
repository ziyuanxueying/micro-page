import { TemProps } from '@/page-editor/components/ItemTemplate'

const RubikCubeTem = (props: TemProps) => {
  console.log(props)

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
