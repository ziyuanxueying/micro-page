import { flexColumn, textSingle, textTwice, colors, textGray9 } from '@global'
const shopItem1 = css([flexColumn, { width: '50%' }])
const shopImg1 = css({ width: 164, height: 164 })
const shopTitle1 = css([textTwice, { lineHeight: '24px' }])
const priceView = css({ color: colors.red, fontSize: 12 })
const priceText1 = css({ fontSize: 20, fontWeight: 600 })
const original = css([textGray9, { textDecoration: 'line-through' }])

const shopItem2 = css([flexColumn, { width: '33%' }])
const shopImg2 = css({ width: 104, height: 104 })
const shopTitle2 = css([textTwice, { lineHeight: '20px' }])
const priceText2 = css({ fontSize: 18, fontWeight: 600 })

const shopItem3 = css([flexColumn, { width: '35%' }])
const shopImg3 = css({ width: 90, height: 90 })
const shopTitle3 = css([textSingle, { fontSize: 14, lineHeight: '20px' }])
const priceText3 = css({ fontSize: 16, fontWeight: 600 })

export default {
  original,
  priceView,

  shopItem1,
  shopImg1,
  shopTitle1,
  priceText1,

  shopItem2,
  shopImg2,
  shopTitle2,
  priceText2,

  shopItem3,
  shopImg3,
  shopTitle3,
  priceText3,
}
