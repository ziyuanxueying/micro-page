import useStore from '@/store'
import { TemProps } from '@/page-editor/components/ItemTemplate'

const Index = (props: TemProps) => {
  const { components } = useStore()
  const { data = { img: '' } } = components.find(c => c.id === props.id) || {}
  return (
    <>
      {data.img ? (
        <img
          css={css({
            width: 345,
            height: 109,
            marginLeft: 15,
            background: '#fff',
            // borderRadius: '50%',
          })}
          // src={new URL(`@/assets/red-env.svg`, import.meta.url).href}
          src={data.img}
          alt=""
        />
      ) : (
        <div
          css={css({
            width: '100%',
            height: 109,
            lineHeight: '109px',
            textAlign: 'center',
            color: '#666666',
            background: '#fff',
          })}
        >
          请选择图片
        </div>
      )}
    </>
  )
}

export default Index
