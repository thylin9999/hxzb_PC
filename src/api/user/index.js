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

export function login ({ username = 'admin', password = '000000' }) {
    return request({
        method: 'POST',
        url: url.login,
        data: {
            username,
            password
        }
    })
}
