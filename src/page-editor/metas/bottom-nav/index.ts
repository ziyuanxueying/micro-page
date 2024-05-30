import { type Component } from '@/store'

export default {
  name: '底部导航',
  group: '基础组件',
  icon: 'icon-bottom-nav',
  metaType: 'bas-bottomNav',
  temModule: 'BottomNavTem',
  setModule: 'BottomNavSet',
  order: 7,
  data: {
    moduleType: 2,
    pictures: [],
    backgroundColor: '#fff',
  },
} as Component
