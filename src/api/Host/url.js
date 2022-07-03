const url = {
    // getHosts: '/api/get-hosts',
    startLive: '/api/live/startLive',
    getHostIsOnline: '/api/live/live', // 主播是否开播的信息
    // 下播
    closeLive: '/api/live/close',

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

    getBookedMatches: '/api/preordain/lists', // 未开始的直播
    // 取消预约
    cancelSubscribe: '/api/preordain/cancel',
    getOfflineHost: '/api/anchor/lists' // 未开播的主播
}
export default url
