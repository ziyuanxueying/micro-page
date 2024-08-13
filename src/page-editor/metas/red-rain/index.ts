import { type Component } from '@/store'

export default {
  name: '红包雨',
  group: '业务组件',
  icon: 'red-rain',
  metaType: 'biz-red',
  moduleType: 'biz-red',
  temModule: 'RedTem',
  setModule: 'RedSet',
  sort: 3,
  data: {
    activity: {},
  },
} as Component
