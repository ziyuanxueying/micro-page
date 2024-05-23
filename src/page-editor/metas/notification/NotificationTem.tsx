import { TemProps } from '@/page-editor/components/ItemTemplate'

const NotificationTem = (props: TemProps) => {
  console.log(props)
  return (
    <div
      css={css({
        padding: 10,
        background: '#fff',
      })}
    >
      <div>消息订阅</div>
    </div>
  )
}

export default NotificationTem
