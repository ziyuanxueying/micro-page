import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { Image } from 'antd'

const ImageTextTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { data } = current || {}

  console.log(data)

  return (
    <div
      css={css({
        padding: 10,
        background: '#fff',
        display: 'flex',
        gap: 10,
      })}
    >
      <Image
        src={data?.src}
        css={css({
          height: 120,
          width: 120,
        })}
      />
      <div>
        <h3
          css={css({
            fontSize: 16,
            fontWeight: 400,
          })}
        >
          {data?.title}
        </h3>
        <p
          css={css({
            fontSize: 12,
            color: '#666',
            marginTop: 10,
          })}
        >
          {data?.desc}
        </p>
      </div>
    </div>
  )
}

export default ImageTextTem
