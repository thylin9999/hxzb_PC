import Mock from 'mockjs'
import { statusCode } from '@/utils/statusCode'
import url from '../../api/competition/url'
const getCompetitions = config => {
    return Mock.mock({
        code: statusCode.success,
        page: {
            total: 150,
            current: 1
        },
        'data|5-20': [{
            id: '@id',
            nick: '@cname',
            'room_title': '柬埔寨对阿根廷',
            heat_num: '10000',
            'live_cover|1': [
                '',
                'https://cdn.podapi.com/image/live/20220511/810101297e7bf7d0418f718121cf2e2b?imageView2/2/w/600/h/600',
                'https://cdn.podapi.com/image/live/20220511/74fe6e768e027c7e8152fdc9156fb6d8?imageView2/2/w/600/h/600',
                'https://cdn.sportnanoapi.com/football/team/0ca927f81a711c8df6961aa864fb1898.jfif',
                'https://cdn.sportnanoapi.com/football/team/9e033dde06190d44817b6e37a4bc0b2b.png'
            ]
        }]
    })
}

const getOnlineBroadcast = config => {
    return Mock.mock({
        code: statusCode.success,
        'data|0-10': [
            {
                id: '@id',
                team1: {
                    name: '@cname',
                    id: '@id'
                },
                team2: {
                    name: '@cname',
                    id: '@id'
                },
                'img|1': [
                    'https://cdn.podapi.com/image/live/20220511/810101297e7bf7d0418f718121cf2e2b?imageView2/2/w/600/h/600',
                    'https://cdn.podapi.com/image/live/20220511/74fe6e768e027c7e8152fdc9156fb6d8?imageView2/2/w/600/h/600',
                    'https://cdn.sportnanoapi.com/football/team/0ca927f81a711c8df6961aa864fb1898.jfif',
                    'https://cdn.sportnanoapi.com/football/team/9e033dde06190d44817b6e37a4bc0b2b.png'
                ],
                user: {
                    name: '@cname',
                    viewers: {
                        'count|0-2000000': 2000
                    }
                }
            }
        ]
    })
}

const getBookedMatches = config => {
    return Mock.mock({
        code: statusCode.success,
        'data|5': [
            {
                id: '@id',
                name: '@cname',
                'status|1': [0, 1], // 0 未开始，1 进行中
                time: '@time',
                team1: {
                    icon: '',
                    loop: '中甲第3轮',
                    'score|0-10': 2
                },
                team2: {
                    icon: '',
                    loop: '中甲第3轮',
                    'score|0-10': 2
                }
            }
        ]
    })
}

const getVideoCompetitions = config => {
    return Mock.mock({
        code: statusCode.success,
        'data|4': [
            {
                id: '@id',
                'cover|1': [
                    'https://cdn.podapi.com/image/avatar/20201129/94c9db716f8fec692e28d177d0d8d960?imageView2/2/w/200/h/200',
                    'https://cdn.podapi.com/image/avatar/20211110/78afecb665cf8ee2756b0e4995d17d13?imageView2/2/w/200/h/200',
                    'https://cdn.podapi.com/image/avatar/20210416/45448f2f01b687d92181cf9f82e4cd0f?imageView2/2/w/200/h/200'
                ],
                time: '@time',
                title: '日职联:川崎前锋 vs 札幌冈萨多'
            }
        ]
    })
}

Mock.mock(/\/api\/get-competition/, 'post', getCompetitions)

// Mock.mock(url.getOnlineBroadcast, 'get', getOnlineBroadcast)
Mock.mock(url.getBookedMatches, 'post', getBookedMatches)

Mock.mock(url.getVideoCompetitions, 'get', getVideoCompetitions)
