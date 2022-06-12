const state = {
    showDialog: false
}

const actions = {
    openDialog ({ commit }) {
        commit('SET', { showDialog: true })
        console.log(state, 'stat')
    },
    closeDialog ({ commit }) {
        commit('SET', { showDialog: false })
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
