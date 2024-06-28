import { type Component } from '@/store'

export default {
  name: '图文',
  group: '基础组件',
  icon: 'icon-image-text',
  metaType: 'bas-imgText',
  temModule: 'ImageTextTem',
  setModule: 'ImageTextSet',
  order: 5,
  data: {
    moduleType: 1,
    url: '',
    link: '',
    title: '默认标题',
    desc: '默认描述',
  },
} as Component
