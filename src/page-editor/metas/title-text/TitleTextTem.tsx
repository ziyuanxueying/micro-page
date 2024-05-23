import { TemProps } from '@/page-editor/components/ItemTemplate'

const TitleTextTem = (props: TemProps) => {
  console.log(props)

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
