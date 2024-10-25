import { cosEnv } from './utils'

export const Normal = {
  components: [
    {
      name: '头部模板',
      group: '基础组件',
      icon: 'mold-pic',
      metaType: 'biz-pic',
      moduleType: 'biz-pic-nomal',
      temModule: 'PicTem',
      setModule: 'PicSet',
      data: {
        moduleType: 'biz-pic-nomal',
        url: cosEnv + '/static-wxxcx/img/20240730-164558.png',
        title: '万达发现好物节',
        sub: '发现你想要的生活',
      },
      id: '2d801a79-dc8a-42be-a08b-e10cc3381f6a',
    },
    {
      name: '红包雨',
      group: '业务组件',
      icon: 'icon-free',
      metaType: 'biz-red',
      moduleType: 'biz-red',
      temModule: 'RedTem',
      setModule: 'RedSet',
      data: {
        activity: {},
      },
      id: 'c61aab5a-de53-4fb3-856c-f0d67eb663ca',
    },
    {
      name: '付费优惠券',
      group: '业务组件',
      icon: 'icon-pay',
      metaType: 'biz-payCoupon',
      moduleType: 'biz-pay-three',
      temModule: 'PayTem',
      setModule: 'PaySet',
      data: {
        coupons: [],
        moduleType: 'biz-pay-three',
        btnColor: '#f24724',
      },
      id: 'ca7cd7ae-2d88-48b6-b2b3-afa47c90f440',
    },
    {
      name: '免费优惠券',
      group: '业务组件',
      icon: 'icon-free',
      metaType: 'biz-freeCoupon',
      moduleType: 'biz-free-once',
      temModule: 'FreeTem',
      setModule: 'FreeSet',
      data: {
        coupons: [],
        moduleType: 'biz-free-once',
        btnColor: '#f24724',
      },
      id: 'c18d2b22-9ede-4c52-b136-4cb8e9a9bbbf',
    },
    {
      name: '抽奖',
      group: '业务组件',
      icon: 'icon-free',
      metaType: 'biz-lottery',
      moduleType: 'biz-lottery',
      temModule: 'LotteryTem',
      setModule: 'LotterySet',
      data: {
        activity: {},
        img: cosEnv + '/static-wxxcx/img/354e5e7880965ce95c1a1899c1049fdb.png',
      },
      id: '86dbe9ea-71b9-4cb6-91c7-732692543f00',
    },
  ],
  pageConfig: {
    title: '购物狂欢节',
    shareBtnImg: '',
    bgImage: '',
    shareImg: '',
    posterImage: '',
    bgColor: '#458eff',
    showShareModal: false,
    tab: '2',
  },
}

export const Holiday = {
  components: [
    {
      name: '头部模板',
      group: '基础组件',
      icon: 'icon-pic',
      metaType: 'biz-pic',
      moduleType: 'biz-pic-nomal',
      temModule: 'PicTem',
      setModule: 'PicSet',
      data: {
        moduleType: 'biz-pic-nomal',
        url: cosEnv + '/static-wxxcx/img/20240730-164558.png',
        title: '万达发现好物节',
        sub: '发现你想要的生活',
      },
      id: '2d801a79-dc8a-42be-a08b-e10cc3381f6a',
    },
    {
      name: '红包雨',
      group: '业务组件',
      icon: 'icon-free',
      metaType: 'biz-red',
      moduleType: 'biz-red',
      temModule: 'RedTem',
      setModule: 'RedSet',
      data: {
        activity: {},
      },
      id: 'c61aab5a-de53-4fb3-856c-f0d67eb663ca',
    },
    {
      name: '付费优惠券',
      group: '业务组件',
      icon: 'icon-pay',
      metaType: 'biz-payCoupon',
      moduleType: 'biz-pay-three',
      temModule: 'PayTem',
      setModule: 'PaySet',
      data: {
        coupons: [],
        moduleType: 'biz-pay-three',
        btnColor: '#f24724',
      },
      id: 'ca7cd7ae-2d88-48b6-b2b3-afa47c90f440',
    },
    {
      name: '免费优惠券',
      group: '业务组件',
      icon: 'icon-free',
      metaType: 'biz-freeCoupon',
      moduleType: 'biz-free-once',
      temModule: 'FreeTem',
      setModule: 'FreeSet',
      data: {
        coupons: [],
        moduleType: 'biz-free-once',
        btnColor: '#f24724',
      },
      id: 'c18d2b22-9ede-4c52-b136-4cb8e9a9bbbf',
    },
    {
      name: '抽奖',
      group: '业务组件',
      icon: 'icon-free',
      metaType: 'biz-lottery',
      moduleType: 'biz-lottery',
      temModule: 'LotteryTem',
      setModule: 'LotterySet',
      data: {
        activity: {},
        img: 'https://xcx02-dev-1318942848.cos.ap-beijing.myqcloud.com//resourceLibrary/user/custom_246944067382935552/bf414fe718e03714fcdcc4d4cf4a5046.jpg',
      },
      id: '86dbe9ea-71b9-4cb6-91c7-732692543f00',
    },
  ],
  pageConfig: {
    title: '购物狂欢节',
    shareBtnImg: '',
    bgImage: '',
    shareImg: '',
    posterImage: '',
    bgColor: '#458eff',
    showShareModal: false,
    tab: '2',
  },
}

export const getTemp = (key: string): any => {
  switch (key) {
    case 'normal':
      return Normal
    case 'holiday':
      return Holiday
    default:
      return false
  }
}
