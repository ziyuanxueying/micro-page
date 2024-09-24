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
    moduleType,
  } = current?.data || {}

  return (
    <div
      css={css({
        width: moduleType === 'card' ? 350 : 371,
        padding: 10,
        boxSizing: 'border-box',
        backgroundColor,
        textAlign,
        borderRadius: radius === 'rightAngle' || moduleType === 'banner' ? 0 : 8,
      })}
    >
      <div
        css={css({
          fontSize: titleSize,
          color: titleColor,
          fontWeight: titleWeight,
          wordBreak: 'break-all',
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
          wordBreak: 'break-all',
        })}
      >
        {desc}
      </p>
    </div>
  )
}

export default TitleTextTem
