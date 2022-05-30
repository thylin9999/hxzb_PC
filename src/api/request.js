import axios from 'axios'

const instance = axios.create({
    timeout: 6000
})

const errorHandle = (error) => {
    console.log(error, '出错了')
    return Promise.reject(error)
}

instance.interceptors.request.use(config => {
    // 请求拦截器
    return config
}, errorHandle)

instance.interceptors.response.use(response => {
    // 响应拦截器
    return response
}, errorHandle)

export default instance
