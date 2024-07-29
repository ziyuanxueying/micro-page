import { type Component } from '@/store'

export default {
  name: '标题文本',
  group: '基础组件',
  icon: 'icon-title-text',
  metaType: 'bas-title',
  temModule: 'TitleTextTem',
  setModule: 'TitleTextSet',
  order: 4,
  data: {
    title: '标题文本',
    desc: '我是一段描述',
    radius: 'rightAngle',
    textAlign: 'left',
    titleSize: 16,
    titleWeight: 'normal',
    descSize: 14,
    descWeight: 'normal',
    titleColor: '#000',
    descColor: '#999',
    backgroundColor: '#fff',
  },
} as Component
