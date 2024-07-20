import { AxiosRequestConfig } from 'axios'
import { get, post, $get, postBody } from './http'
// 获取上传签名的函数
export const getVideoSignature = (params?: any) => {
  return get('/api/permission/voyager/basisb/v1/upload/video/signature', params)
}
// 获取广场树
export const getPlazaTree = (config: AxiosRequestConfig, params?: any) => {
  return get(
    'xmtxapib/apiXMT/proxy/permission/voyager/basisb/v1/org/10004/orgs/tree',
    params,
    config,
  )
}
// 图片风控
export const checkImgUrl = (params?: any) => {
  return post('/xmtxapib/apiCheckImage/checkImgUrl', params)
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data)
      } else {
        return Promise.reject(response.message)
      }
    })
    .catch(() => {
      return Promise.reject('图片不合法')
    })
}
export const createJson = (params?: any) => {
  return post('/cos-api/base-configurable/v1/configurablePage/create', params)
}
export const updateJson = (params?: any) => {
  return post(`/api/base-configurable/v1/configurablePage/update`, params)
}
export const findByIdForB = (id: string) => {
  return $get(`/api/base-configurable/v1/configurablePage/findByIdForB/${id}`)
}
export const getCoupons: any = (params?: any) => {
  return $get(`/coupons/inner/coupons`, params)
}
export const getActivityList: any = (params?: any) => {
  return postBody(`/api/fortune/fortune/activities/getActPage`, params)
}

export const generateMPCode: any = (params: any) => {
  return postBody(`/api/sharecode/v1/shareCode/getwxacodeunlimit`, params)
}

export const generateURLLink: any = (params: any) => {
  return postBody(`/api/sharecode/v1/shareCode/generateurllink`, params)
}
