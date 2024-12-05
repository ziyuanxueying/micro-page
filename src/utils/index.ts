import { WdUtils } from '@wd/component-ui'
import { UploadPictureType } from '@wd/component-ui/dist/WdUpload/WdUploadPicture/upload'
import { getWebEnv } from '@wd/mini-program-kit/runtime'
import { type Color } from 'antd/es/color-picker'

export function toHexString(color: string | Color) {
  return typeof color === 'string' ? color : color.toHexString()
}

export function toComponentUrl(url: string | UploadPictureType['fileList']) {
  return (Array.isArray(url) ? url[0]?.url : url) ?? ''
}

export function toComponentPictures(formPictures: any) {
  return formPictures.map((picture: { link: string; url: UploadPictureType['fileList'] }) => ({
    ...picture,
    url: toComponentUrl(picture?.url),
  }))
}

export function checkSaveInfo(data: any, jumpPageConfig = false) {
  if (!jumpPageConfig) {
    if (!data.pageConfig.title) {
      return { msg: '请在页面设置中输入页面名称' }
    }
    if (data.pageConfig.isShare) {
      if (!data.pageConfig.shareTitle || !data.pageConfig.shareImg)
        return { msg: '请在页面设置中完善分享内容' }
    }
    if (data.components.length === 0) {
      return { msg: '请至少选择一个组件' }
    }
  }
  const list = data.components.map((item: any) => {
    item = { ...item, isError: '' }
    if (['biz-payCoupon', 'biz-freeCoupon'].includes(item.metaType)) {
      if (!item.data?.coupons?.length) {
        item.isError = '请选择要使用的优惠券'
      }
    }
    // if (['biz-pic'].includes(item.metaType)) {
    //   if (!item.data?.title) {
    //     item.isError = '请输入头部模板的标题'
    //   }
    // }
    if (item.metaType === 'biz-red') {
      if (!item.data?.activity?.actId) {
        item.isError = '请选一个红包雨活动'
      }
    }
    if (item.metaType === 'biz-lottery') {
      if (!item.data?.activity?.actId) {
        item.isError = '请选一个抽奖活动'
      } else if (!item.data?.img) {
        item.isError = '请选择一个活动配置的图片'
      }
    }
    if (item.metaType === 'bas-img') {
      if (item.data.moduleType !== 'image') {
        if (!item.data?.pictures?.length) {
          item.isError = '请在图片组件中至少添加一张图片'
        } else if (item.data?.pictures?.filter((x: any) => !x?.url)?.length) {
          item.isError = '请在图片组件中完善图片'
        }
      } else if (!item.data?.pictures || !item.data?.pictures[0]?.url) {
        item.isError = '请在图片组件中至少添加一张图片'
      }
    }
    if (item.metaType === 'bas-hot') {
      if (!item.data?.url) {
        item.isError = '请在热区组件中选择一个图片'
      }
    }
    if (item.metaType === 'bas-title') {
      if (!item.data?.title) {
        item.isError = '请在标题文本组件中添加标题'
      }
    }
    if (item.metaType === 'bas-floatBtn') {
      if (!item.data?.buttonImgUrl) {
        item.isError = '请在浮标组件中添加按钮图片'
      }
    }
    return item
  })
  const err = list.find((item: any) => item.isError)
  // console.log('err: ', err)
  const msg = err ? err.isError : ''
  return { msg, list, item: err }
}

/** 获取COS的环境 */
export const getCosEnv = (env?: string) => {
  /** 获取运行时的环境 */
  const webEnv = env || getWebEnv()
  if (webEnv === 'dev') {
    return '//xcx02-test-1318942848.cos.ap-beijing.myqcloud.com'
  } else if (webEnv === 'test') {
    return '//xcx02-test-1318942848.cos.ap-beijing.myqcloud.com'
  } else {
    return '//xcx02-prod-1318942848.cos.ap-beijing.myqcloud.com'
  }
}

export const cosEnv = getCosEnv()
// export const cosEnv = (globalThis as any).COS_ENV
export const defaultImage = cosEnv + '/static-wxxcx/img/micro-page/default.jpeg'

export const authorizePlaza = () => {
  const { isPlazaOrg } = WdUtils.getCurrentOrg()
  return isPlazaOrg ? '2' : '1'
}
