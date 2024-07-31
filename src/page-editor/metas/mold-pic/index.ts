import { type Component } from '@/store'

export default {
  name: '头部模板',
  group: '基础组件',
  icon: 'icon-pic',
  metaType: 'biz-pic',
  moduleType: 'biz-pic-nomal',
  temModule: 'PicTem',
  setModule: 'PicSet',
  data: {
    moduleType: 'biz-pic-nomal',
    url: 'https://xcx02-test-1318942848.cos.ap-beijing.myqcloud.com/static-wxxcx/img/20240730-164558.png',
    title: '万达发现好物节',
    sub: '发现你想要的生活',
  },
} as Component
