
import axios from 'axios'

class Request {

  static instance = null

  constructor(baseURL){
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 5000
    })
    this.setupInterceptors()
  }
  // 获取实例 (单例模式)
  static getInstance(baseURL){
    if(Request.instance === null){
      Request.instance = new Request(baseURL)
    }
    return Request.instance
  }

  // 设置拦截器
  setupInterceptors(){
    this.instance.interceptors.request.use((config) => {
      return config
    }),
    (error) => {
      return Promise.reject(error)
    }

    this.instance.interceptors.response.use(
      (response) => {
        return response.data  // 直接返回数据，不需要 API 层再取
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // 封装常用请求方法

  /**
   * GET 请求
   * @param {string} url - 请求地址
   * @param {object} config - 请求配置
   * @returns {Promise}
   * @example
   * // 获取用户列表
   * request.get('/users').then(res => console.log(res))
   * // 带参数的 GET 请求
   * request.get('/users', { params: { page: 1, size: 10 } })
   */
  get(url, config = {}) {
    return this.instance.get(url, config)
  }

  /**
   * POST 请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求体数据
   * @param {object} config - 请求配置
   * @returns {Promise}
   * @example
   * // 创建用户
   * request.post('/users', { name: '张三', age: 25 })
   * // 提交表单数据
   * request.post('/login', { username: 'admin', password: '123456' })
   */
  post(url, data = {}, config = {}) {
    return this.instance.post(url, data, config)
  }

  /**
   * PUT 请求
   * @param {string} url - 请求地址
   * @param {object} data - 更新数据
   * @param {object} config - 请求配置
   * @returns {Promise}
   * @example
   * // 更新用户信息
   * request.put('/users/1', { name: '李四', age: 26 })
   * // 批量更新
   * request.put('/users/batch', [/* 用户数组 ])
   */
  put(url, data = {}, config = {}) {
    return this.instance.put(url, data, config)
  }

  /**
   * DELETE 请求
   * @param {string} url - 请求地址
   * @param {object} config - 请求配置
   * @returns {Promise}
   * @example
   * // 删除单个用户
   * request.delete('/users/1')
   * // 批量删除
   * request.delete('/users', { params: { ids: [1, 2, 3] } })
   */
  delete(url, config = {}) {
    return this.instance.delete(url, config)
  }
  
}
const request = Request.getInstance('http://localhost:8080')
export default request