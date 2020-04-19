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
    axios
      .post('/auth/login', { email, password })
      .then(({ data }) => {
        this.$toast.success('Successfully authenticated', { duration: 2000 })
        commit('login', { user: data.user })
      })
      .catch(err => {
        this.$toast.error('Error while authenticating', { duration: 2000 })
        console.error(err)
      })
  },
  logout({ commit }) {
    axios
      .get('/auth/logout')
      .then(_response => {
        commit('logout')
        this.$toast.success('Successfully logged out.', { duration: 2000 })
        console.info('Successfully logged out.')
      })
      .catch(err => {
        this.$toast.error('Error while logging out', { duration: 2000 })
        console.error(err)
      })
  }
}
