import { type Component } from '@/store'
import { authorizePlaza } from '@/utils'

export default {
  name: '标题文本',
  group: '基础组件',
  icon: 'title-text',
  metaType: 'bas-title',
  temModule: 'TitleTextTem',
  setModule: 'TitleTextSet',
  moduleType: 'card',
  order: 4,
  sort: 7,
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
    moduleType: 'card',
    backgroundColor: '#fff',
    authorizePlaza: authorizePlaza,
  },
} as Component
