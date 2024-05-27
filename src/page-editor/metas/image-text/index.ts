import { type Component } from '@/store'

export default {
  name: '图文',
  group: '基础组件',
  icon: 'icon-image-text',
  metaType: 'image-text',
  temModule: 'ImageTextTem',
  setModule: 'ImageTextSet',
  data: {
    src: 'https://res.wandacm.com.cn/static-qianfan/template/default-img.png',
    title: '默认标题',
    desc: '默认描述',
  },
} as Component
