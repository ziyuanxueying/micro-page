// @ts-nocheck
import useStore from '@/store'
import style from './style'
import { TemProps } from '@/page-editor/components/ItemTemplate'

const Index = (props: TemProps) => {
  const { components } = useStore()

  const current = components.find(c => c.id === props.id)

  const { moduleType = 1 } = current?.data || {}

  return (
    <div style={{ backgroundColor: '#fff', padding: '10px' }}>
      <div css={css(style[`shopItem${moduleType}`])}>
        <img
          css={css(style[`shopImg${moduleType}`])}
          src="https://res.beyonds.com/static-qianfan/template/qcs_20220425.png"
        />
        <div css={css(style[`shopTitle${moduleType}`])}>屈臣氏 彩妆护肤体验套餐</div>
        <div css={css(style[`priceView`])}>
          ¥<span css={css(style[`priceText${moduleType}`])}>99</span>
        </div>
        <div css={css(style[`original`])}>¥99</div>
      </div>
    </div>
  )
  // return <div css={css` ${buttonStyles}; font-size: 18px;`)}>www</div>
  // return  <div css={css([flexColumn, { width: '50%' }])}>www</div>
}

export default Index
