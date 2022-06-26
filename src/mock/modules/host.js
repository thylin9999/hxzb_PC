import Mock, { Random } from 'mockjs'
import { statusCode } from '@/utils/statusCode'
import url from '../../api/Host/url'
const getSubscribeHost = config => {
    return Mock.mock({
        code: statusCode.success,
        'data|5-20': [
            {
                id: '@id',
                'isSubscribe|1': true,
                avatar: '',
                'heat_num|1000-1000000': 2000,
                name: '@cname',
                description: '主播简介主播简介主播简介主播简介'
            }
        ]
    })
}

const getHostRank = config => {
    return Mock.mock({
        code: statusCode.success,
        'data|6': [
            {
                id: '@id',
                'isSubscribe|1': true,
                name: '@cname',
                description: '主播简介主播简介主播简介主播简介'
            }
        ]
    })
}

Mock.mock(url.getSubscribeHost, 'post', getSubscribeHost)
Mock.mock(url.getHostRank, 'get', getHostRank)
