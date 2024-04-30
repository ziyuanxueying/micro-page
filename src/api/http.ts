import { AxiosRequestConfig } from 'axios'
import http from './request'

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
