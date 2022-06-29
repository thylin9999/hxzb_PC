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
export function register ({ account = 'admin', password = '000000' }) {
    return request({
        method: 'POST',
        url: url.register,
        data: {
            account,
            password
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
