import { TemProps } from '@/page-editor/components/ItemTemplate'

const BuoyTem = (props: TemProps) => {
  console.log(props)

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
