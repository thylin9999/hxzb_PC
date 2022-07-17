import request from '../request'
import url from './url'

// export function getHosts () {
//     return request({
//         method: 'get',
//         url: url.getHosts
//     })
// }

// 获取订阅的直播列表
export function getSubscribeHost ({ type = null }) {
    return request({
        method: 'post',
        url: url.getSubscribeHost,
        data: {
            type // 区分开播和未开播的
        }
    })
}

export function startLive ({
    matchId, liveType, title, liveCover, category
}) {
    return request({
        method: 'post',
        url: url.startLive,
        data: {
            // leagueType: category, // 赛事类型
            live_cover: liveCover,
            room_title: title,
            type: category, // 分类
            match_id: matchId
        }
    })
}

export function closeLive () {
    return request({
        method: 'post',
        url: url.closeLive
    })
}

export function getOBSAddress () {
    return request({
        method: 'post',
        url: url.getOBSAddress
    })
}

export function getHostRank () {
    return request({
        method: 'post',
        url: url.getHostRank
    })
}
// 关注的主播列表
export function getFlowedHosts () {
    return request({
        method: 'post',
        url: url.getFlowedHosts
    })
}
// 关注、取消 主播
export function followHost (anchorId) {
    return request({
        method: 'post',
        url: url.followHost,
        data: {
            anchor_id: anchorId
        }
    })
}

export function getOfflineHost () {
    return request({
        method: 'post',
        url: url.getOfflineHost
    })
}
export function bookBroadcast () {
    return request({
        method: 'post',
        url: url.bookBroadcast
    })
}

export function bookMatches ({ matchId, cover, title, leagueType = 1, placard = '' }) {
    return request({
        method: 'post',
        url: url.bookMatches,
        data: {
            matchId,
            leagueType, // 足球，篮球电竞等
            title,
            live_cover: cover,
            placard
        }
    })
}

export function getBookedMatches (matchId) {
    return request({
        method: 'post',
        url: url.getBookedMatches,
        data: {
            match_id: matchId
        }
    })
}

export function bookOpenBroadcast (id) {
    return request({
        method: 'post',
        url: url.bookOpenBroadcast,
        data: {
            id
        }
    })
}

export function getMyBroadcastHistory ({ pageNumber = 1, pageSize = 20, status = 1 }) {
    return request({
        method: 'post',
        url: url.broadcastHistory,
        data: {
            pageNum: pageNumber,
            pageSize: 2000,
            status // 进行中， 2. 已结束
        }
    })
}

export function cancelSubscribe (matchId) {
    return request({
        method: 'post',
        url: url.cancelSubscribe,
        data: {
            matchId
        }
    })
}
