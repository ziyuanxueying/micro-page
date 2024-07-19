import { type Component } from '@/store'

export default {
  name: '抽奖',
  group: '业务组件',
  icon: 'icon-free',
  metaType: 'biz-lottery',
  moduleType: 'biz-lottery',
  temModule: 'LotteryTem',
  setModule: 'LotterySet',
  data: {
    activity: {},
  },
} as Component
