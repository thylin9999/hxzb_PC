/* eslint-disable */


export function isRequire (label) {
    return (value) => {
        const message = value ? null : label + errorMessage.isRequire
        return {
            type: 'isRequire',
            message
        }
    }

}

export function phone (value) {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    const result = reg.test(value)
    const message =  reg.test(value) ? null : errorMessage.phone
    return {
        type: 'phone',
        message
    }
}

export function throttle (fn, wait = 1000) {  //节流
    let last = 0
    return function () {
        let now = Date.now()
        if (now - last > wait) {
            fn.apply(this, arguments)
            last = now
        }
    }
}

export function debounce(fn, wait = 1000) {  //防抖
    let timer = null
    return function () {
        let now = !timer
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
        }, wait)
        if (now) {
            fn.apply(this, arguments)
        }
    }
}

export const errorMessage = {
    isRequire: '不能为空',
    phone: '请输入正确的手机号码'
}
