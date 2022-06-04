import request from '../request'
import url from './url'

export function getHosts () {
    return request({
        method: 'get',
        url: url.getHosts
    })
}
