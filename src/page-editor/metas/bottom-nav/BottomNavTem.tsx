import { TemProps } from '@/page-editor/components/ItemTemplate'

const BottomNavTem = (props: TemProps) => {
  console.log(props)

  return (
    <div
      css={css({
        padding: 10,
        background: '#fff',
      })}
    >
      <div>底部导航</div>
    </div>
  )
}

export default BottomNavTem
