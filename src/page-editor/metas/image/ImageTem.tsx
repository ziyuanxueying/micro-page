import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { Image } from 'antd'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
        padding: 10,
        background: '#fff',
      })}
    >
      {moduleType === 'image' || pictures.length < 2 ? (
        renderImage(pictures[0])
      ) : (
        <Slider
          dots
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={2000}
        >
          {pictures.map((pic: any, i: number) => (
            <div key={i}>{renderImage(pic)}</div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default ImageTem
