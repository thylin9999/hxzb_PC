const state = {
    showLoginDialog: false
}

const actions = {
    openLoginDialog ({ commit }) {
        commit('SET', { showLoginDialog: true })
    },
    closeLoginDialog ({ commit }) {
        commit('SET', { showLoginDialog: false })
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
