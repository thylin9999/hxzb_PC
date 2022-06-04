import Mock from 'mockjs'
import { statusCode } from '@/utils/statusCode'

const getHosts = config => {
    return Mock.mock({
        code: statusCode.success,
        'data|5-20': [
            {
                id: '@id',
                name: '@cname',
                'isSubscribe|1': false,
                'subscribe|0-1000000': 5000,
                'img|1': [
                    'https://cdn.podapi.com/image/avatar/20201129/94c9db716f8fec692e28d177d0d8d960?imageView2/2/w/200/h/200',
                    'https://cdn.podapi.com/image/avatar/20211110/78afecb665cf8ee2756b0e4995d17d13?imageView2/2/w/200/h/200',
                    'https://cdn.podapi.com/image/avatar/20210416/45448f2f01b687d92181cf9f82e4cd0f?imageView2/2/w/200/h/200'
                ]
            }
        ]
    })
}

Mock.mock(/\/api\/get-hosts/, 'get', getHosts)
