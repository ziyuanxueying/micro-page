import { type Component } from '@/store'

export default {
  name: '付费优惠券',
  group: '业务组件',
  icon: 'icon-pay',
  metaType: 'biz-payCoupon',
  moduleType: 'biz-pay-once',
  temModule: 'PayTem',
  setModule: 'PaySet',
  data: {
    coupons: [],
    moduleType: 'biz-pay-once',
    btnColor: '#f24724',
  },
} as Component
