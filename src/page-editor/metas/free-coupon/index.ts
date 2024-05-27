import { type Component } from '@/store'

export default {
  name: '免费优惠券',
  group: '业务组件',
  icon: 'icon-free',
  metaType: 'freeCoupon',
  moduleType: '1',
  temModule: 'FreeTem',
  setModule: 'FreeSet',
  data: {
    channelId: 'bs_0c326a0471907632c3049ca43d434c9c',
    coupons: [],
  },
} as Component
