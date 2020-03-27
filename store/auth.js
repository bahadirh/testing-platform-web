import axios from '~/plugins/axios'

export const state = () => ({
  user: false
})

export const getters = {
  loggedIn(state) {
    return state.user != false
  }
}

export const mutations = {
  login(state, payload) {
    state.user = payload.user
  },
  logout(state) {
    state.user = false
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    // TODO: add vue-notification here
    axios
      .post('/auth/login', { email, password })
      .then(({ data }) => commit('login', { user: data.user }))
      .catch(err => {
        console.error(err) // TODO: do more?
      })
  },
  logout({ commit }) {
    commit('logout')
  }
}
