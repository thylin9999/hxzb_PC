import axios from 'axios'
import { statusCode } from '@/utils/statusCode'

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
    if (response && response.data.code === statusCode.success) {
        return response.data
    } else {
        return response
    }
}, errorHandle)

export default instance
