<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="name-group" label="Name:" label-for="name">
            <b-form-input id="name" v-model="form.name" required />
          </b-form-group>

          <b-form-group
            id="version-group"
            label="Version:"
            label-for="version"
            description="Optional"
          >
            <b-form-input id="version" v-model="form.version" />
          </b-form-group>

          <b-button type="submit" variant="primary">
            Create App
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  middleware: 'authenticated',
  data() {
    return { form: {} }
  },
  head() {
    return { title: 'Create new app' }
  },
  methods: {
    onSubmit() {
      axios
        .post('/apps/new', { ...this.form })
        .then(({ data }) => {
          // TODO: use vue-notification here
          console.info(`Success!`)
          this.$router.replace('/apps')
        })
        .catch(err => {
          //TODO: use vue-notification to log error
          console.error(err)
        })
    }
  }
}
</script>
