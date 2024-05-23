import { type Component } from '@/store'

export default {
  name: '图片',
  group: '基础组件',
  icon: 'icon-image',
  metaType: 'image',
  temModule: 'ImageTem',
  setModule: 'ImageSet',
  data: {
    src: 'https://res.wandacm.com.cn/static-qianfan/template/default-img.png',
  },
} as Component
