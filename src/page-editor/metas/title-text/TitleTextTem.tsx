import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'

const TitleTextTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const { title, desc, textAlign, titleSize, descSize, titleColor, descColor, backgroundColor } =
    current?.data || {}

  return (
    <div
      css={css({
        padding: 10,
        backgroundColor,
        textAlign,
      })}
    >
      <div
        css={css({
          fontSize: titleSize,
          color: titleColor,
        })}
      >
        {title}
      </div>
      <p
        css={css({
          fontSize: descSize,
          color: descColor,
          marginTop: 4,
        })}
      >
        {desc}
      </p>
    </div>
  )
}

export default TitleTextTem
