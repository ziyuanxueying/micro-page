import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'

const VideoTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { videoUrl, posterUrl } = current?.data || {}

  return (
    <video
      css={css({
        width: '100%',
      })}
      src={videoUrl}
      poster={posterUrl}
      controls
    />
  )
}

export default VideoTem
