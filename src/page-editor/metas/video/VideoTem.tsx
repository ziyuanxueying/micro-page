import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'

const VideoTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { src } = current?.data || {}

  return (
    <video
      css={css({
        width: '100%',
      })}
      src={src}
      controls
    />
  )
}

export default VideoTem
