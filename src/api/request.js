import axios from 'axios'
import { statusCode } from '@/utils/statusCode'
import { removeToken, removeSessionStorageItem, getToken } from '@/utils/cookie'
import { Message } from 'element-ui'
import Router from '../router/index'
import Store from '../store/index'
import url from './user/url'
const instance = axios.create({
    timeout: 6000,
    // eslint-disable-next-line no-undef
    baseURL: _requestApiUrl
    // baseURL: 'http://api.wuhaicj.com'
    // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : ''
})

const errorHandle = (error) => {
    console.log(error, '出错了')
    return Promise.reject(error)
}

instance.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // 请求拦截器
    return config
}, errorHandle)

let isAuthorization = true
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
        // const token = getToken()
        if (isAuthorization) {
            isAuthorization = false
            Message.error(response.data.msg)
            // Store.dispatch('user/logoutAction')
            removeSessionStorageItem('userInfo')
            removeToken()
            Store.commit('user/SET', { token: null, userName: null, age: null, nickname: null, is_anchor: 1, avatar: null })
            // this.$router.push('/')
            Router.push('/')
            setTimeout(() => {
                isAuthorization = true
            }, 3000)
        }
        return response.data
    } else {
        return response.data
    }
}, errorHandle)

export default instance
