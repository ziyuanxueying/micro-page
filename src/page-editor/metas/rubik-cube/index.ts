import { type Component } from '@/store'

export default {
  name: '魔方',
  group: '基础组件',
  icon: 'icon-rubik-cube',
  metaType: 'bas-cube',
  temModule: 'RubikCubeTem',
  setModule: 'RubikCubeSet',
  order: 1,
  data: {
    moduleType: 2,
    pictures: [],
  },
} as Component
