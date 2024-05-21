// @ts-nocheck
import useStore from '@/store'
import style from './style'

const Index = () => {
  const { components, selectedComponentId } = useStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  const { mouldTpye = 1 } = selectedComponent?.data || {}

  return (
    <div style={{ backgroundColor: '#fff', padding: '10px' }}>
      <div css={css(style[`shopItem${mouldTpye}`])}>
        <img
          css={css(style[`shopImg${mouldTpye}`])}
          src="https://res.beyonds.com/static-qianfan/template/qcs_20220425.png"
        />
        <div css={css(style[`shopTitle${mouldTpye}`])}>屈臣氏 彩妆护肤体验套餐</div>
        <div css={css(style[`priceView`])}>
          ¥<span css={css(style[`priceText${mouldTpye}`])}>99</span>
        </div>
        <div css={css(style[`original`])}>¥99</div>
      </div>
    </div>
  )
  // return <div css={css` ${buttonStyles}; font-size: 18px;`)}>www</div>
  // return  <div css={css([flexColumn, { width: '50%' }])}>www</div>
}

export default Index
