import request from '../request'
import url from './url'
export function getCompetitions (type = 1) {
    return request({
        method: 'post',
        url: url.getCompetitions,
        data: {
            type
        }
    })
}

export function getOnlineBroadcast ({ pageNumber = 1, pageSize = 20 }) {
    return request({
        method: 'post',
        url: url.getOnlineBroadcast,
        data: {
            pageNum: pageNumber,
            pageSize
        }
    })
}
