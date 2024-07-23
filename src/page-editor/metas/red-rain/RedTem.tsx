// import useStore from '@/store'
// import { TemProps } from '@/page-editor/components/ItemTemplate'
// const Index = (_props: TemProps) => {
const Index = () => {
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
        src="/public/assets/red-env.svg"
        alt=""
      />
    </>
  )
}

export default Index
