import { UploadPictureType } from '@wd/component-ui/dist/WdUpload/WdUploadPicture/upload'
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

export function checkSaveInfo(data: any) {
  if (!data.pageConfig.title) {
    return { msg: '请在页面设置中输入页面名称' }
  }
  if (data.pageConfig.isShare) {
    if (!data.pageConfig.shareTitle || !data.pageConfig.shareDesc)
      return { msg: '请在页面设置中完善分享内容' }
  }
  if (data.components.length === 0) {
    return { msg: '请至少选择一个组件' }
  }
  const list = data.components.map((item: any) => {
    item = { ...item, isError: '' }
    if (['biz-payCoupon', 'biz-freeCoupon'].includes(item.metaType)) {
      if (!item.data?.coupons?.length) {
        item.isError = '请选择要使用的优惠券'
      }
    }
    if (['biz-pic'].includes(item.metaType)) {
      if (!item.data?.title) {
        item.isError = '请输入模板图片的标题'
      }
    }
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
    console.log('item: ', item)
    return item
  })
  const err = list.find((item: any) => item.isError)
  console.log('err: ', err)
  const msg = err ? err.isError : ''
  return { msg, list }
}
