import axios from 'axios'
import { statusCode } from '@/utils/statusCode'
import { removeToken, removeSessionStorageItem, getToken } from '@/utils/cookie'
import url from './user/url'
const instance = axios.create({
    timeout: 6000
})

const errorHandle = (error) => {
    console.log(error, '出错了')
    return Promise.reject(error)
}

instance.interceptors.request.use(config => {
    const token = getToken()
    console.log(config, 'config')
    if (token && config.url === '/common/upload/uploadImg') {
        config.headers.Token = token
    }
    // 请求拦截器
    return config
}, errorHandle)

instance.interceptors.response.use(response => {
    // 响应拦截器
    const requestUrl = response.config.url
    const whiteList = [
        url.login,
        url.register
    ]
    if (response && response.data.code === statusCode.success && !whiteList.includes(requestUrl)) {
        return response.data
    } else if (response.data.code === statusCode.isExpired) {
        this.$store.dispatch('user/logoutAction')
        removeSessionStorageItem('userInfo')
        removeToken()
        this.$router.push('/')
    } else {
        return response
    }
}, errorHandle)

export default instance
