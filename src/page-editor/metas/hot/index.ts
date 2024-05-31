import { type Component } from '@/store'

export default {
  name: '热区图片',
  group: '基础组件',
  icon: 'icon-hot',
  metaType: 'bas-hot',
  temModule: 'HotTem',
  setModule: 'HotSet',
  order: 3,
  data: {
    url: '',
    links: [],
  },
} as Component
