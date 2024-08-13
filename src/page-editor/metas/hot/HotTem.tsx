import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { defaultImage } from '@/utils'
import { Image } from 'antd'

const HotTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { url } = current?.data || {}

  return (
    <div css={css({ background: '#F5F5F5', width: '100%', marginTop: 15 })}>
      <Image src={url} width="100%" preview={false} fallback={defaultImage} />
    </div>
  )
}

export default HotTem
