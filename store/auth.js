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
  login({ commit }, { email, password, redirect }) {
    axios
      .post('/auth/login', { email, password })
      .then(({ data }) => {
        // TODO: add vue-notification here
        commit('login', { user: data.user })
        redirect()
      })
      .catch(err => {
        // TODO: add vue-notification here
        console.error(err)
      })
  },
  logout({ commit }) {
    axios
      .get('/auth/logout')
      .then(_response => {
        commit('logout')
        // TODO: add vue-notification here
        console.info('Successfully logged out.')
      })
      .catch(err => {
        // TODO: add vue-notification here
        console.error(err)
      })
  }
}
