import { type Component } from '@/store'

export default {
  name: '图片',
  group: '基础组件',
  icon: 'icon-image',
  metaType: 'bas-img',
  temModule: 'ImageTem',
  setModule: 'ImageSet',
  order: 2,
  data: {
    template: 'image',
    pictures: [],
  },
} as Component
