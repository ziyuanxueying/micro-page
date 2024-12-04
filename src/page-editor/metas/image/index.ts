import { type Component } from '@/store'
import { authorizePlaza } from '@/utils'

export default {
  name: '图片',
  group: '基础组件',
  icon: 'image',
  metaType: 'bas-img',
  moduleType: 'image',
  temModule: 'ImageTem',
  setModule: 'ImageSet',
  order: 2,
  sort: 5,
  data: {
    moduleType: 'image',
    pictures: [],
    authorizePlaza: authorizePlaza(),
  },
} as Component
