import { type Component } from '@/store'

export default {
  name: '付费优惠券',
  group: '业务组件',
  icon: 'icon-pay',
  metaType: 'biz-payCoupon',
  moduleType: 'biz-pay-img',
  temModule: 'PayTem',
  setModule: 'PaySet',
  data: {
    coupons: [],
    btnColor: '#718cc0',
  },
} as Component
