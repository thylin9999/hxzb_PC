import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/views/Layout/BasicLayout'
import { getToken } from '@/utils/cookie'
import { getUserInfo } from '@/api/user'
import Store from '../store/index'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: BasicLayout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
                meta: {
                    subId: 1
                }
            },
            {
                path: '/live-broadcast',
                name: 'LiveBroad',
                component: () => import(/* webpackChunkName: "Home" */ '../views/Host/HostIndex'),
                meta: {
                    subId: 5
                }
            },
            {
                path: '/competition',
                name: 'Competition',
                component: () => import(/* webpackChunkName: "Home" */ '../views/Competition/Competition'),
                meta: {
                    subId: 2
                }
            },
            {
                path: '/subscribe-list',
                name: 'SubscribeList',
                component: () => import(/* webpackChunkName: "Home" */ '../views/SubscribeList/SubscribeList'),
                meta: {
                    subId: 3
                }
            },
            {
                path: '/app-download',
                name: 'DownloadApp',
                component: () => import(/* webpackChunkName: "Home" */ '../views/DownloadApp'),
                meta: {
                    subId: 4
                }
            },
            {
                path: '/app-description/:id',
                name: 'Description',
                component: () => import(/* webpackChunkName: "Home" */ '../views/Descriptions/Description'),
                props ($route) {
                    return {
                        id: $route.params.id
                    }
                }
            },
            {
                path: '/personal-center/:tabId?',
                name: 'PersonalCenter',
                component: () => import(/* webpackChunkName: "Home" */ '../views/PersonalCenter/PersonalCenter'),
                meta: {
                },
                props: true
            },
            {
                path: '/liveRoom',
                name: 'LiveRoom',
                component: () => import(/* webpackChunkName: "Home" */ '../views/LiveRoom'),
                meta: {
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach(async (to, from, next) => {
    const token = getToken()
    if (token) {
        Store.commit('user/SET', { token })
    }

    next()
})

export default router
