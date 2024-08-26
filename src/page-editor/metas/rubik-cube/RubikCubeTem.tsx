import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { defaultImage } from '@/utils'
import { Image } from 'antd'

const RubikCubeTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { moduleType, pictures } = current?.data || {}

  return (
    <div
      css={css({
        padding: 10,
        background: '#fff',
        display: 'grid',
        gridTemplateColumns: `repeat(${moduleType}, 1fr)`,
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
            css={css({
              borderRadius: 4,
              cursor: 'pointer',
            })}
          />
        ))}
    </div>
  )
}

export default RubikCubeTem
