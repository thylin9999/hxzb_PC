const url = {
    // getHosts: '/api/get-hosts',
    startLive: '/api/live/startLive',
    getOBSAddress: '/api/live/getOBS',
    getHostRank: '/api/anchor/ranking',
    getSubscribeHost: '/api/get-subscribe-host',
    // 正式接口
    // 关注的主播列表
    getFlowedHosts: '/api/follow/lists',
    followHost: '/api/follow/add',
    // 预约直播
    bookBroadcast: '/api/preordain/lists',
    bookMatches: '/api/preordain/add', // 预约比赛

    getOfflineHost: '/api/anchor/lists' // 未开播的主播
}
export default url
