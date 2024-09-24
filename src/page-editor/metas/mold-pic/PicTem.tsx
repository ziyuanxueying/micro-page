import { flexcc } from '@/styles/global'
import useStore from '@/store'
import { TemProps } from '@/page-editor/components/ItemTemplate'

const Index = (props: TemProps) => {
  const { components } = useStore()
  const { data } = components.find(c => c.id === props.id) || {
    data: { url: '', title: '', sub: '' },
  }
  return (
    <>
      <div
        css={css([
          flexcc,
          {
            width: 376,
            height: 277,
            backgroundImage: `url(${data?.url})`,
            backgroundSize: '100% 100% ',
            backgroundRepeat: 'no-repeat',
            textAlign: 'center',
          },
        ])}
      >
        <div
          css={css({
            width: '80%',
            height: 40,
            fontSize: 30,
            color: '#fff',
            textShadow: '0px 2px 6px rgba(20,43,152,0.8)',
          })}
        >
          {data?.title}
        </div>
        <div
          css={css({
            width: '80%',
            height: 24,
            fontSize: 18,
            color: '#fff',
            textShadow: '0px 2px 6px rgba(20,43,152,0.8)',
            marginTop: 10,
          })}
        >
          {data?.sub}
        </div>
      </div>
    </>
  )
}

export default Index
