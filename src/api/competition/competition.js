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

export function getOnlineBroadcast ({ pageNumber = 1, pageSize = 20, type = null }) {
    return request({
        method: 'post',
        url: url.getOnlineBroadcast,
        data: {
            pageNum: pageNumber,
            pageSize,
            type
        }
    })
}

export function getHotBroadcast ({ pageNumber = 1, pageSize = 5 }) {
    return request({
        method: 'post',
        url: url.getOnlineBroadcast,
        data: {
            pageNum: pageNumber,
            pageSize
        }
    })
}

export function getBookedMatches ({ pageNumber = 1, pageSize = 20 }) {
    return request({
        method: 'post',
        url: url.getBookedMatches,
        data: {
            pageNum: pageNumber,
            pageSize
        }
    })
}

export function getVideoCompetitions () {
    return request({
        method: 'get',
        url: url.getVideoCompetitions
    })
}

// 赛程
export function getMatchList ({
    pageNumber = 1,
    pageSize = 20,
    leagueId = null,
    playing = null,
    leagueType = null,
    day
}) {
    return request({
        method: 'post',
        url: url.getMatchList,
        data: {
            'pageNum': pageNumber,
            pageSize,
            day,
            leagueId,
            playing,
            leagueType
        }
    })
}
// 热门赛程
export function getHostMatches () {
    return request({
        method: 'post',
        url: url.getHostMatches
    })
}
// 卡片预约赛事
export function addSubscribeMatch (matchId) {
    return request({
        method: 'post',
        url: url.addSubscribeMatch,
        data: {
            match_id: matchId
        }
    })
}

// 时间查询 赛程
export function getMatchScheduleByDay ({ date, leagueId = 1 }) {
    return request({
        method: 'post',
        url: url.getMatchScheduleByDay,
        data: {
            day: date,
            leagueId: 1 // 足球
        }
    })
}

// 赛程
export function getMatchSchedule (leagueId = 1) {
    return request({
        method: 'post',
        url: url.getMatchSchedule,
        data: {
            leagueId: 1
        }
    })
}
