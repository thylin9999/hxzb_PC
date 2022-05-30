// import Cookies from 'js-cookie'

export function setToken (token) {
    window.localStorage.setItem('token', token)
}
export function getToken () {
    return window.localStorage.getItem('token')
}
export function removeToken () {
    window.localStorage.removeItem('token')
}

// 获取本地储存的 语言
export function getLang () {
    return window.localStorage.getItem('lang') || 'zh'
}

export function setLang (value) {
    return window.localStorage.setItem('lang', value)
}
// 获取、设置item
export function getItem (key) {
    return window.localStorage.getItem(key)
}
export function setItem (key, value) {
    return window.localStorage.setItem(key, value)
}
