<template>
  <b-container class="container-fluid">
    <b-row class="center">
      <b-col v-if="loggedIn" class="text-center h2">
        You're already signed in. Please log out first.
      </b-col>
      <b-col v-else>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="name-group" label="Name:" label-for="name">
            <b-form-input id="name" v-model="form.firstName" required />
          </b-form-group>

          <b-form-group id="surname-group" label="Surname:" label-for="surname">
            <b-form-input id="surname" v-model="form.lastName" required />
          </b-form-group>

          <b-form-group
            id="email-group"
            label="Email address:"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="me@example.com"
            />
          </b-form-group>

          <b-form-group id="password-group" label=""
            ><b-form-input
              id="password"
              v-model="form.password"
              type="password"
              required
              placeholder="********"
          /></b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Signup',
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
  },
  methods: {
    onSubmit() {
      const component = this
      this.$axios
        .$post('/auth/signup', { ...this.form })
        .then(_response => {
          this.$toast.success('Successfully signed up', { duration: 2000 })
          component.form = {}
          console.info('Success!')
        })
        .catch(({ response }) => {
          this.$toast.error('Error while signing up', { duration: 2000 })
          console.error(
            response.data ? response.data.message : 'Unknown error occured.'
          )
        })
    },
  },
}
</script>
