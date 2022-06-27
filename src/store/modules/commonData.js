const state = {
    competitionTabs: [
        {
            id: 1,
            key: 'competition.all',
            name: '全部'
        },
        {
            id: 2,
            key: 'competition.football',
            name: '足球'
        },
        {
            id: 3,
            key: 'competition.basketball',
            name: '篮球'
        }
    ],
    descriptions: [
        {
            id: 1,
            text: '全球赛事',
            icon: 'global-competition'
        },
        {
            id: 2,
            text: '高清直播',
            icon: 'high-definition'
        },
        {
            id: 3,
            text: '海量数据',
            icon: 'mass-data'
        },
        {
            id: 4,
            text: '用户协议',
            icon: 'protocols',
            type: 'Description',
            com: 'Protocols'
        },
        {
            id: 5,
            text: '隐私政策',
            icon: 'privacy-policy',
            type: 'Description',
            com: 'Policy'
        },
        {
            id: 6,
            text: '免责声明',
            icon: 'disclaimer',
            type: 'Description',
            com: 'Disclaimer'
        }

    ],
    matchTypes: [
        {
            id: 1,
            title: '足球',
            icon: 'icons/football'
        },
        {
            id: 2,
            title: '篮球',
            icon: 'icons/basketball'
        },
        {
            id: 3,
            title: '热门赛事',
            icon: 'icons/hot-white'
        },
        {
            id: 4,
            title: '正在比赛',
            icon: 'icons/lock'
        }
    ]
}
const actions = {

}
const mutations = {

}
const getters = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
