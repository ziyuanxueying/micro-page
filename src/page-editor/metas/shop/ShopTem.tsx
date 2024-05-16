import { flexColumn, textTwice, colors, textGray9 } from '@global'

const Index = (prop: object) => {
  console.log('shoptem prop: ', prop)
  return (
    <div style={{ backgroundColor: '#fff', padding: '10px' }}>
      <div css={css([flexColumn, { width: '50%' }])}>
        <img
          css={css({ width: 164, height: 164 })}
          src="https://res.beyonds.com/static-qianfan/template/qcs_20220425.png"
        />
        <div css={css([textTwice, { lineHeight: '24px' }])}>屈臣氏 彩妆护肤体验套餐</div>
        <div css={css({ color: colors.red, fontSize: 12 })}>
          ¥<span css={css({ fontSize: 20, fontWeight: 600 })}>99</span>
        </div>
        <div css={css([textGray9, { textDecoration: 'line-through' }])}>¥99</div>
      </div>
    </div>
  )
  // return <div css={css` ${buttonStyles}; font-size: 18px;`)}>www</div>
}

export default Index
