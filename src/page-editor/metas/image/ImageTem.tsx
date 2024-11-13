import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { Carousel, Image } from 'antd'
import { defaultImage } from '@/utils'

const ImageTem = (props: TemProps) => {
  const { components } = useStore()
  const [index, setIndex] = useState(0)
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
      {moduleType === 'image' || pictures.length < 2 ? (
        renderImage(pictures[0])
      ) : (
        <>
          <div className="hover">{renderImage(pictures[index > pictures.length ? 0 : index])}</div>
          <div className="notHover">
            <Carousel autoplay autoplaySpeed={1500} draggable={true} afterChange={e => setIndex(e)}>
              {pictures.map((pic: any, i: number) => {
                return <div key={i}>{renderImage(pic || defaultImage)}</div>
              })}
            </Carousel>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageTem
