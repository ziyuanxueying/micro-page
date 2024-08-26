import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { defaultImage } from '@/utils'
import { Image } from 'antd'

const BottomNavTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { moduleType, pictures, backgroundColor } = current?.data || {}

  return (
    <div
      css={css({
        padding: 10,
        backgroundColor,
        display: 'grid',
        gridTemplateColumns: `repeat(${moduleType}, 1fr)`,
        justifyItems: 'center',
        gap: 10,
      })}
    >
      {Array(moduleType)
        .fill(0)
        .map((_, i) => (
          <Image
            key={i}
            src={pictures[i]?.url}
            fallback={defaultImage}
            preview={false}
            width={64}
            height={64}
            css={css({
              borderRadius: 4,
              cursor: 'pointer',
            })}
          />
        ))}
    </div>
  )
}

export default BottomNavTem
