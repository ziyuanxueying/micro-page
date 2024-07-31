import { type Component } from '@/store'

export default {
  name: '免费优惠券',
  group: '业务组件',
  icon: 'icon-free',
  metaType: 'biz-freeCoupon',
  moduleType: 'biz-free-once',
  temModule: 'FreeTem',
  setModule: 'FreeSet',
  data: {
    coupons: [],
    moduleType: 'biz-free-once',
    btnColor: '#f24724',
  },
} as Component
