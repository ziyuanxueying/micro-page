import { AxiosRequestConfig } from 'axios'
import http from './request'
interface ResponseData {
  status: number
  data: any // Change `any` to the type of your response data
}
const _processResponse = (res: ResponseData, resolve: (value?: unknown) => void) => {
  const { status, data } = res
  if (status === 200) {
    resolve(data)
  } else {
    throw res
  }
}
/**
 * @description post请求
 * @param url 请求地址
 * @param params 请求参数 对象
 * @param config 自定义请求参数例如 headers
 * */
export const post = (url: string, params: any, config?: AxiosRequestConfig) => {
  return http.post(url, params, { ...config })
}
/**
 * @description get请求
 * @param url 请求地址
 * @param params 请求参数 对象(自动拼接到url后)
 * @param config 自定义请求参数例如 headers
 * */
export const get = (url: string, params: any = {}, config?: AxiosRequestConfig) => {
  return http.get(url, { params, ...config })
}
export const $get = (url: string, params: any = {}, config?: AxiosRequestConfig) => {
  // return http.get(url, { params, ...config })
  return new Promise((resolve, reject) => {
    http
      .get(url, { params, ...config })
      .then(res => {
        _processResponse(res, resolve)
      })
      .catch(e => {
        console.log('e: ', e)
        // _showErrorModal(e)
        reject(e)
      })
  })
}
export const $post = (url: string, params: any = {}) => {
  // return http.get(url, { params, ...config })
  return new Promise((resolve, reject) => {
    http
      .post(url, params)
      .then(res => {
        _processResponse(res, resolve)
      })
      .catch(e => {
        console.log('e: ', e)
        // _showErrorModal(e)
        reject(e)
      })
  })
}
/**
 * @description put请求
 * @param url 请求地址
 * @param params 请求参数 对象(自动拼接到url后)
 * @param config 自定义请求参数例如 headers
 * */
export const put = (url: string, params: any = {}, config?: AxiosRequestConfig) => {
  return http.put(url, params, { ...config })
}

/**
 * @description delete请求
 * @param url 请求地址
 * @param params 请求参数 对象(自动拼接到url后)
 * @param config 自定义请求参数例如 headers
 * */
export const del = (url: string, params: any = {}, config?: AxiosRequestConfig) => {
  return http.delete(url, { params, ...config })
}
