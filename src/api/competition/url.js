const url = {
    getCompetitions: '/api/get-competition',
    getOnlineBroadcast: '/api/live/roomLists',
    // 热门直播
    getHotRooms: '/api/live/hotRoom',
    liveRoom: '/api/live/live', // 直播间

    getBookedMatches: '/api/get-matches',
    getMatchList: '/api/scheduleMatch/lists', // 赛程
    getHostMatches: '/api/scheduleMatch/hotMatch',
    getVideoCompetitions: '/api/get-video-competitions',
    addSubscribeMatch: '/api/attention/add', // 预约赛事

    getMatchScheduleByDay: '/api/scheduleMatch/getScheduleByDay',
    getMatchSchedule: '/api/scheduleMatch/getSchedule', // 联赛赛程
    getHotMatches: '/api/scheduleMatch/hotMatch' // 热门赛程
}
export default url
