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
          marginTop: 15,
          cursor: 'pointer',
        })}
      />
    )
  }

  return (
    <div
      css={css({
        display: 'block',
        width: '100%',
      })}
    >
      {moduleType === 'image' || pictures.length < 2 ? (
        renderImage(pictures[0])
      ) : (
        <div>
          <Carousel autoplay>
            {pictures.map((pic: any, i: number) => {
              // console.log(pic)
              return <div key={i}>{renderImage(pic || defaultImage)}</div>
            })}
          </Carousel>
        </div>
      )}
    </div>
  )
}

export default ImageTem
