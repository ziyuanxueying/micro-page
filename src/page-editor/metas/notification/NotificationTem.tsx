import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { BellOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const { Text } = Typography

const NotificationTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { title, titleColor, backgroundColor } = current?.data || {}

  return (
    <div
      css={css({
        padding: '10px 14px',
      })}
    >
      <div
        css={css({
          textAlign: 'center',
          color: titleColor,
          backgroundColor,
          borderRadius: 20,
          padding: '10px 0',
        })}
      >
        <BellOutlined />
        <Text css={css({ color: 'inherit', fontSize: 16, marginLeft: 5 })}>{title}</Text>
      </div>
    </div>
  )
}

export default NotificationTem
