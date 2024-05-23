import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'

const TitleTextTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { data } = current || {}

  console.log(data)

  return (
    <div
      css={css({
        padding: 10,
        background: '#fff',
      })}
    >
      <div>标题文本</div>
      {/* <div>我是一段描述</div> */}
    </div>
  )
}

export default TitleTextTem
