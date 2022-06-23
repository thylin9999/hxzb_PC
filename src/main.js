import './mock'
import './assets/fonts/font.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrap from './utils/bootstrap'
import './utils/elements'
import { modalMixin } from '@/mixins/modal'

// 页面权限
// 清除默认样式
import 'normalize.css/normalize.css'

import 'element-ui/lib/theme-chalk/index.css'
// 全局样式
import './styles/index.scss'
// svg icon
import './icons/index'

// import 'alvin-space-tool/css/main.css'
import vueComTestAlvin from 'vue-com-test-alvin'

import { i18n } from './utils/lang/index'
Vue.use(vueComTestAlvin)
// 全局mixin
Vue.mixin(modalMixin)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n, // 国际化
    created: bootstrap, // 刷新时，从localstorage中获取 token赋值给vuex
    render: h => h(App)
}).$mount('#app')
