<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top" sticky>
    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-if="loggedIn">
        <!-- <b-nav-item to="/apps">Apps</b-nav-item> -->
        <b-nav-item to="/tests">Tests</b-nav-item>
        <!-- <b-nav-item to="/suites">Suites</b-nav-item> -->
        <b-nav-item to="/files">Files</b-nav-item>
        <b-nav-item to="/cases">Cases</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="loggedIn">
        <b-button class="mx-1" variant="success" to="/profile">
          Profile
        </b-button>
        <b-button class="mx-1" variant="danger" @click="logout">
          Logout
        </b-button>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="!loggedIn">
        <b-nav-form @submit.prevent="login">
          <b-form-input
            class="mx-1"
            placeholder="email"
            v-model="email"
            type="email"
            required
          />
          <b-form-input
            class="mx-1"
            placeholder="password"
            v-model="password"
            type="password"
            required
          />
          <b-button class="mx-1" variant="info" type="submit">
            Login
          </b-button>
          <b-button class="mx-1" to="/signup" variant="success">
            Signup
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      })
      this.email = ''
      this.password = ''
    },
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
