import { type Component } from '@/store'
import { authorizePlaza, cosEnv } from '@/utils'

export default {
  name: '头部模板',
  group: '基础组件',
  icon: 'mold-pic',
  metaType: 'biz-pic',
  moduleType: 'biz-pic-nomal',
  temModule: 'PicTem',
  setModule: 'PicSet',
  sort: 9,
  data: {
    moduleType: 'biz-pic-nomal',
    url: cosEnv + '/static-wxxcx/img/micro-page/20240730-164558.png',
    title: '万达发现好物节',
    sub: '发现你想要的生活',
    authorizePlaza: authorizePlaza,
  },
} as Component
