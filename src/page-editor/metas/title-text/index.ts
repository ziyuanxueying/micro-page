import { type Component } from '@/store'

export default {
  name: '标题文本',
  group: '基础组件',
  icon: 'icon-title-text',
  metaType: 'titletext',
  temModule: 'TitleTextTem',
  setModule: 'TitleTextSet',
  order: 4,
  data: {
    title: '标题文本',
    desc: '我是一段描述',
    textAlign: 'left',
    titleSize: 16,
    descSize: 14,
    titleColor: '#000',
    descColor: '#999',
    bgColor: '#fff',
  },
} as Component
