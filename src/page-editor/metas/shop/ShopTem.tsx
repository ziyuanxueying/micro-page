import style from './style'
interface ShopTemProps {
  data: { mouldTpye: 1 }
  dataChange: (data: any) => void
}
const Index = (prop: ShopTemProps) => {
  return (
    <div style={{ backgroundColor: '#fff', padding: '10px' }}>
      <div css={css(style[`shopItem${prop.data.mouldTpye}`])}>
        <img
          css={css(style[`shopImg${prop.data.mouldTpye}`])}
          src="https://res.beyonds.com/static-qianfan/template/qcs_20220425.png"
        />
        <div css={css(style[`shopTitle${prop.data.mouldTpye}`])}>屈臣氏 彩妆护肤体验套餐</div>
        <div css={css(style[`priceView`])}>
          ¥<span css={css(style[`priceText${prop.data.mouldTpye}`])}>99</span>
        </div>
        <div css={css(style[`original`])}>¥99</div>
      </div>
    </div>
  )
  // return <div css={css` ${buttonStyles}; font-size: 18px;`)}>www</div>
  // return  <div css={css([flexColumn, { width: '50%' }])}>www</div>
}

export default Index
