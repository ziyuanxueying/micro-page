import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'
import { defaultImage } from '@/utils'
import { Image } from 'antd'

const FloatBtnTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { buttonImgUrl } = current?.data || {}

  return (
    <>
      <Image
        src={buttonImgUrl}
        fallback={defaultImage}
        preview={false}
        width={64}
        height={64}
        css={css({
          boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
          borderRadius: 2,
          cursor: 'pointer',
        })}
      />
    </>
  )
}

export default FloatBtnTem
