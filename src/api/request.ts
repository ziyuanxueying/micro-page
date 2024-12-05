import axios, { AxiosResponse } from 'axios'
import { UserParamsType } from './httpType'
import store from './storeManager'
import { logout } from '@wd/mini-program-kit/runtime'

const customHeaders: any = {}
// 请求拦截
const createRequestInterceptors = (headers: any) => {
  return (config: any) => {
    //get 请求参数加时间
    if (config.method.toLocaleLowerCase() === 'get')
      config.params = Object.assign({}, config.params, {
        timestr: +new Date(),
      })

    for (const key in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, key)) {
        config.headers[key] = headers[key]
      }
    }
    if (store.token) config.headers.token = store.token

    try {
      if (store.org) {
        if (localStorage.getItem('access_token')) {
          config.headers.access_token = localStorage.getItem('access_token')
        }
        config.headers.groupCode = store.org.groupCode || ''
        config.headers.areaCode = store.org.areaCode || ''
        config.headers.centerCode = store.org.centerCode || ''
        config.headers.plazaCode = store.org.plazaCode || ''
        config.headers.storeCode = store.org.storeCode || ''
        config.headers.orgcode = store.org.code
        config.headers.workingOrgCode = store.org.code || '1'
        config.headers.userid = store.org.userid || '1'
        config.headers.orgname = encodeURIComponent(store.org.name)
        config.headers.orgTypeCode = store.org.orgTypeCode || '1'
        config.headers.orgTypeName = encodeURIComponent(store.org.orgTypeName)
      }
    } catch (e) {
      console.log(e)
    }

    try {
      if (store.user) {
        config.headers.userid = store.user.id
        config.headers.username = encodeURIComponent(store.user.name)
        config.headers.tenantId = store.user.tenantId
        Object.keys(customHeaders).forEach(prop => {
          config.headers[prop] = customHeaders[prop] || (store.user as UserParamsType)[prop]
        })
      }
    } catch (e) {
      console.log(e)
    }
    return config
  }
}
// 响应拦截器
const responseInterceptors = (response: AxiosResponse) => {
  const data = response.data
  if (response.config.responseType !== 'arraybuffer') {
    //判断返回数据没有status时为下载文件接口，返回所有数据提供给前端做相应处理
    if (data.status === 200) {
      return data
    } else {
      return Promise.reject(data)
    }
  } else {
    return response
  }
}
// 失败拦截器
const responseInterceptorsError = (error: any) => {
  let status

  if (error.response) {
    status = error.response.status
    if (status === 401 || status === 403) {
      logout()
    } else {
      // Message.error(error.response.message);
      console.log('失败拦截器: ', error.response.message)
    }
  } else if (error.request) {
    if (error.config.params && error.config.params.isIgnoreTimeout) {
      return error
    } else {
      // isNotLoginPage && Message.error('无响应');
    }
  } else {
    localStorage.setItem('errDescription', error.message)
  }
  return Promise.reject(error.response && error.response.data)
}
// 失败
const requestInterceptorsError = (err: any) => {
  return Promise.reject(err)
}
/**
 *  @description 创建axios
 * */
export const createAxios = (mode?: string) => {
  const instance = axios.create()
  instance.defaults.timeout = 20000
  instance.defaults.baseURL = '/'
  // 添加响应拦截器
  instance.interceptors.response.use(responseInterceptors, responseInterceptorsError)
  if (mode === 'formData') {
    //添加请求拦截器
    instance.interceptors.request.use(
      createRequestInterceptors({
        'Content-type': 'multipart/form-data',
      }),
      requestInterceptorsError,
    )
  } else {
    //添加请求拦截器
    instance.interceptors.request.use(
      createRequestInterceptors({
        'Content-Type': 'application/json;charset=UTF-8',
      }),
      requestInterceptorsError,
    )
  }
  return instance
}
export default createAxios()
