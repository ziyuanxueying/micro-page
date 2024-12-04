import { type Component } from '@/store'
import { authorizePlaza } from '@/utils'

export default {
  name: '抽奖',
  group: '业务组件',
  icon: 'lottery',
  metaType: 'biz-lottery',
  moduleType: 'biz-lottery',
  temModule: 'LotteryTem',
  setModule: 'LotterySet',
  sort: 4,
  data: {
    activity: {},
    authorizePlaza: authorizePlaza(),
  },
} as Component
