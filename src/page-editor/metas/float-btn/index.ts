import { type Component } from '@/store'
import { authorizePlaza } from '@/utils'

export default {
  name: '浮标',
  group: '基础组件',
  icon: 'float-btn',
  metaType: 'bas-floatBtn',
  temModule: 'FloatBtnTem',
  setModule: 'FloatBtnSet',
  order: 8,
  sort: 8,
  data: {
    buttonImgUrl: '',
    top: 345,
    clickType: 'modal',
    modalImgUrl: '',
    link: '',
    preview: false,
    authorizePlaza: authorizePlaza(),
  },
} as Component
