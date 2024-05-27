import { type Component } from '@/store'

export default {
  name: '视频',
  group: '基础组件',
  icon: 'icon-video',
  metaType: 'video',
  temModule: 'VideoTem',
  setModule: 'VideoSet',
  data: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
} as Component
