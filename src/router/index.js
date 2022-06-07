import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/views/Layout/BasicLayout'
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
                }
            },
            {
                path: '/competition',
                name: 'Competition',
                component: () => import(/* webpackChunkName: "Home" */ '../views/Competition/Competition'),
                meta: {
                }
            },
            {
                path: '/subscribe-list',
                name: 'SubscribeList',
                component: () => import(/* webpackChunkName: "Home" */ '../views/SubscribeList/SubscribeList'),
                meta: {
                }
            },
            {
                path: '/app-download',
                name: 'DownloadApp',
                component: () => import(/* webpackChunkName: "Home" */ '../views/DownloadApp'),
                meta: {
                }
            },
            {
                path: '/personal-center',
                name: 'PersonalCenter',
                component: () => import(/* webpackChunkName: "Home" */ '../views/PersonalCenter/PersonalCenter'),
                meta: {
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
