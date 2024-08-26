import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { defaultImage } from '@/utils'
import { Image } from 'antd'

const ImageTextTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { moduleType, url, title, desc } = current?.data || {}

  return (
    <div
      css={css({
        padding: 10,
        background: '#fff',
        display: 'flex',
        flexDirection: moduleType === 1 ? 'row' : 'column',
        gap: 12,
      })}
    >
      <Image
        src={url}
        width={moduleType === 1 ? 120 : '100%'}
        preview={false}
        fallback={defaultImage}
      />
      <div>
        <h3
          css={css({
            fontSize: 16,
            fontWeight: 400,
          })}
        >
          {title}
        </h3>
        <p
          css={css({
            fontSize: 12,
            color: '#666',
            marginTop: 10,
          })}
        >
          {desc}
        </p>
      </div>
    </div>
  )
}

export default ImageTextTem
