import { AxiosRequestConfig } from 'axios'
import { get, post } from './http'
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
  // .then((response: any) => {
  //   if (response.status === 200) {
  //     return Promise.resolve(response.data)
  //   } else {
  //     return Promise.reject(response.message)
  //   }
  // })
  // .catch(() => {
  //   return Promise.reject('图片不合法')
  // })
}
export const updateJson = (params?: any) => {
  return post(`/cos-api/base-configurable/v1/configurablePage/update`, params)
}
export const findByIdForB = (id: string) => {
  return get(`/cos-api/base-configurable/v1/configurablePage/findByIdForB/${id}`)
}
