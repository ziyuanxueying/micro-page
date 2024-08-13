import { TemProps } from '@/page-editor/components/ItemTemplate'
import useStore from '@/store'

const TitleTextTem = (props: TemProps) => {
  const { components } = useStore()
  const current = components.find(c => c.id === props.id)

  const {
    title,
    desc,
    textAlign,
    titleSize,
    descSize,
    titleColor,
    descColor,
    backgroundColor,
    titleWeight,
    descWeight,
    radius,
  } = current?.data || {}

  return (
    <div
      css={css({
        width: 350,
        padding: 10,
        boxSizing: 'border-box',
        backgroundColor,
        textAlign,
        marginTop: 15,
        borderRadius: radius === 'rightAngle' ? 0 : 8,
      })}
    >
      <div
        css={css({
          fontSize: titleSize,
          color: titleColor,
          fontWeight: titleWeight,
        })}
      >
        {title}
      </div>
      <p
        css={css({
          fontSize: descSize,
          color: descColor,
          marginTop: 4,
          fontWeight: descWeight,
        })}
      >
        {desc}
      </p>
    </div>
  )
}

export default TitleTextTem
