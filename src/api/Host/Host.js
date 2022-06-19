import request from '../request'
import url from './url'

export function getHosts () {
    return request({
        method: 'get',
        url: url.getHosts
    })
}

export function startLive ({
    matchId, liveType, title, liveCover, category
}) {
    return request({
        method: 'post',
        url: url.startLive,
        data: {
            leagueType: category, // 赛事类型
            live_cover: liveCover,
            roomTitle: title,
            type: liveType, // 分类
            match_id: matchId
        }
    })
}

export function getOBSAddress () {
    return request({
        method: 'post',
        url: url.getOBSAddress
    })
}
