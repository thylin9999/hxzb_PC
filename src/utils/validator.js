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

export const errorMessage = {
    isRequire: '不能为空',
    phone: '请输入正确的手机号码'
}
