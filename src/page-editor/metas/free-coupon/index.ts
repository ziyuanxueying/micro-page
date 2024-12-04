import { type Component } from '@/store'
import { authorizePlaza } from '@/utils'

export default {
  name: '免费优惠券',
  group: '业务组件',
  icon: 'free-coupon',
  metaType: 'biz-freeCoupon',
  moduleType: 'biz-free-once',
  temModule: 'FreeTem',
  setModule: 'FreeSet',
  sort: 1,
  data: {
    coupons: [],
    provideScenes: 19,
    moduleType: 'biz-free-once',
    btnColor: '#7791C3',
    authorizePlaza: authorizePlaza(),
  },
} as Component
