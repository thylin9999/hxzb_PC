import request from '../request'
import url from './url'
export function getUserInfo (id) {
    return request({
        method: 'get',
        url: url.userInfo,
        params: {
            id
        }
    })
}

export function login ({ account = 'admin', password = '000000' }) {
    return request({
        method: 'POST',
        url: url.login,
        data: {
            account,
            password
        }
    })
}
export function register ({ account = 'admin', code = 666666, password = '000000' }) {
    return request({
        method: 'POST',
        url: url.register,
        data: {
            account,
            password,
            mobile_code: code
        }
    })
}

export function editUserInfo ({ nickname, sign, birth, gender, avatar }) {
    return request({
        method: 'post',
        url: url.editUserInfo,
        data: {
            nickname,
            sign,
            birth,
            gender,
            avatar
        }
    })
}

export function getCode ({ mobile, msType = 1 }) {
    return request({
        method: 'post',
        url: url.getCode,
        data: {
            mobile,
            'msg_type': msType
        }
    })
}
