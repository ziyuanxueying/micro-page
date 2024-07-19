import { type Component } from '@/store'

export default {
  name: '免费优惠券',
  group: '业务组件',
  icon: 'icon-free',
  metaType: 'biz-freeCoupon',
  moduleType: 'biz-free-text',
  temModule: 'FreeTem',
  setModule: 'FreeSet',
  data: {
    coupons: [],
    btnColor: '#718cc0',
  },
} as Component
