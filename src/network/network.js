import axios from 'axios'

// ES6 Promise 的封装
export function request(options) {
  return new Promise((resolve, reject) => {
    // 创建axios的实例对象
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/h8',
      timeout: 5000
    })

    // 过滤器（拦截器）
    instance.interceptors.response.use(res => {
      return res.data
    })

    instance(options)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
  })
}