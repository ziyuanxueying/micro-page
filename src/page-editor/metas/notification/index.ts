import { type Component } from '@/store'

export default {
  name: '消息订阅',
  group: '基础组件',
  icon: 'icon-notification',
  metaType: 'bas-notification',
  temModule: 'NotificationTem',
  setModule: 'NotificationSet',
  order: 9,
  data: {
    title: '开抢提醒',
    titleColor: '#222',
    backgroundColor: '#fff',
    subscribedTitle: '已设置提醒',
  },
} as Component
