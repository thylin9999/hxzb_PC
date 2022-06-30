import { getUserInfo, login } from '../../api/user'
import { setToken, removeToken, setItem, removeSessionStorageItem } from '@/utils/cookie'
import { statusCode } from '@/utils/statusCode'

const state = {
    age: null,
    nickname: null,
    is_anchor: 1, // 1 非主播 2 主播
    token: null // token
}

const actions = {
    async getUserInfo ({ state, dispatch, commit, getters }) {
        try {
            const { data } = await getUserInfo()
            commit('SET', data.data)
            return true
        } catch (error) {
            console.log(error, 'error')
            return false
        }
    },
    async login ({ state, dispatch, commit }, payload) {
        try {
            const { data } = await login(payload)
            if (data.code === statusCode.success) {
                setToken(data.token)
                const params = {
                    ...data.data, token: data.token
                }
                setItem('userInfo', JSON.stringify(params))
                commit('SET', params)
                return {
                    code: data.code
                }
            } else {
                return data
            }
        } catch (error) {
            console.error(error, 'error')
        }
    },
    logoutAction ({ state, dispatch, commit }) {
        // 菜单等 路由信息也应该删除。。。
        // 去除token
        removeToken()
        removeSessionStorageItem('userInfo')
        // 删除用户信息
        commit('SET', { token: null, userName: null, age: null })
    }
}

const mutations = {
    SET (state, payload) {
        Object.entries(payload).forEach(item => {
            const key = item[0]
            const value = item[1]
            state[key] = value
        })
    }
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
