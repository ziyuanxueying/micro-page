import { type Component } from '@/store'

export default {
  name: '视频',
  group: '基础组件',
  icon: 'icon-video',
  metaType: 'video',
  temModule: 'VideoTem',
  setModule: 'VideoSet',
  order: 6,
  data: {
    videoUrl: '',
    posterUrl: '',
  },
} as Component
