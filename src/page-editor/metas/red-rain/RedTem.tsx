// import useStore from '@/store'
import { TemProps } from '@/page-editor/components/ItemTemplate'

const Index = (props: TemProps) => {
  console.log('props: ', props)
  // const { components } = useStore()
  // const { data } = components.find(c => c.id === props.id) || {
  //   data: { url: '', title: '', sub: '' },
  // }
  return (
    <>
      <img
        css={css({
          width: '100%',
          height: 50,
          background: '#fff',
          borderRadius: '50%',
        })}
        src={new URL(`@/assets/red-env.svg`, import.meta.url).href}
        alt=""
      />
    </>
  )
}

export default Index
