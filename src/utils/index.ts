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
