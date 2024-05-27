import { type Component } from '@/store'

export default {
  name: '付费优惠券',
  group: '业务组件',
  icon: 'icon-pay',
  metaType: 'payCoupon',
  moduleType: '1',
  temModule: 'PayTem',
  setModule: 'PaySet',
  data: {
    channelId: 'bs_0c326a0471907632c3049ca43d434c9c',
    coupons: [],
  },
} as Component
