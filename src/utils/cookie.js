// import Cookies from 'js-cookie'

export function setToken (token) {
    window.sessionStorage.setItem('token', token)
}
export function getToken () {
    return window.sessionStorage.getItem('token')
}
export function removeToken () {
    window.sessionStorage.removeItem('token')
}

// 获取本地储存的 语言
export function getLang () {
    return window.sessionStorage.getItem('lang') || 'zh'
}

export function setLang (value) {
    return window.sessionStorage.setItem('lang', value)
}
// 获取、设置item
export function getItem (key) {
    return window.sessionStorage.getItem(key)
}
export function setItem (key, value) {
    return window.sessionStorage.setItem(key, value)
}
export function removeSessionStorageItem (key) {
    return window.sessionStorage.removeItem(key)
}
