import { type Component } from '@/store'
import { authorizePlaza } from '@/utils'

export default {
  name: '付费优惠券',
  group: '业务组件',
  icon: 'pay-coupon',
  metaType: 'biz-payCoupon',
  moduleType: 'biz-pay-once',
  temModule: 'PayTem',
  setModule: 'PaySet',
  sort: 2,
  data: {
    coupons: [],
    provideScenes: 19,
    moduleType: 'biz-pay-once',
    btnColor: '#f24724',
    authorizePlaza: authorizePlaza(),
  },
} as Component
