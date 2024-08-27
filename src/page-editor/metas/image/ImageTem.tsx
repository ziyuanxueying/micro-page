import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { Carousel, Image } from 'antd'
import { defaultImage } from '@/utils'

const ImageTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { moduleType, pictures } = current?.data || {}

  const renderImage = (pic: any) => {
    return (
      <Image
        src={pic?.url}
        fallback={defaultImage}
        preview={false}
        width="100%"
        css={css({
          cursor: 'pointer',
        })}
      />
    )
  }

  return (
    <div
      css={css({
        display: 'block',
        width: 375,
        overflow: 'hidden',
        position: 'relative',
      })}
    >
      <div
        css={css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: 375,
          height: '100%',
          zIndex: 101,
        })}
      ></div>
      {moduleType === 'image' || pictures.length < 2 ? (
        renderImage(pictures[0])
      ) : (
        <Carousel autoplay autoplaySpeed={1500}>
          {pictures.map((pic: any, i: number) => {
            return <div key={i}>{renderImage(pic || defaultImage)}</div>
          })}
        </Carousel>
      )}
    </div>
  )
}

export default ImageTem
