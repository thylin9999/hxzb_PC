import { getUserInfo, login, logout } from '../../api/user'
import { setToken, removeToken, setItem, removeSessionStorageItem } from '@/utils/cookie'
import { statusCode } from '@/utils/statusCode'
import { Message } from 'element-ui'
const state = {
    age: null,
    nickname: null,
    is_anchor: 1, // 1 非主播 2 主播
    token: null, // token
    memberId: null,
    member_id: null,
    isAnchor: false,
    avatar: null, // 头像
    roomId: null
}

const actions = {
    async getUserInfo ({ state, dispatch, commit, getters }) {
        try {
            const { data, code, msg } = await getUserInfo()
            if (code === statusCode.success && msg === 'success') {
                const userInfo = {
                    ...data,
                    isAnchor: data.is_anchor,
                    memberId: data.member_id,
                    roomId: data.room_id
                }
                commit('SET', userInfo)
                setItem('userInfo', JSON.stringify(userInfo))
                return true
            } else {
                Message.error(msg)
                return false
            }
        } catch (error) {
            console.log(error, 'error')
            return false
        }
    },
    async login ({ state, dispatch, commit }, payload) {
        try {
            const { data, code, token, msg } = await login(payload)
            if (code === statusCode.success) {
                setToken(token)
                const params = {
                    ...data, token
                }
                setItem('userInfo', JSON.stringify(params))
                commit('SET', params)
                return {
                    code
                }
            } else {
                return {
                    code, msg, data
                }
            }
        } catch (error) {
            console.error(error, 'error')
        }
    },
    async logoutAction ({ state, dispatch, commit }) {
        // 菜单等 路由信息也应该删除。。。
        // 去除token
        try {
            await logout()
        } catch (e) {
            console.log('出错了')
        } finally {
            removeToken()
            removeSessionStorageItem('userInfo')
            // 删除用户信息
            commit('SET', { token: null, userName: null, age: null, nickname: null, is_anchor: 1, avatar: null })
            window.location.reload()
        }
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
