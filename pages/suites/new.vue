<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="name-group" label="Name:" label-for="name">
            <b-form-input id="name" v-model="form.name" required />
          </b-form-group>

          <b-form-group
            id="app-group"
            label="Related app:"
            label-for="app"
            description="Optional"
          >
            <b-form-select v-model="form.app" :options="appOptions" />
          </b-form-group>

          <b-button type="submit" variant="primary">
            Create Suite
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  asyncData({ $axios }) {
    return $axios
      .$get('/apps/list')
      .then(({ apps }) => {
        const appOptions = apps.map(app => ({
          value: app._id,
          text: app.name,
        }))
        return {
          appOptions: [
            { value: null, text: 'Please select an option' },
            ...appOptions,
          ],
        }
      })
      .catch(err => {
        console.error(err)
        return {}
      })
  },
  data() {
    return { form: { app: null } }
  },
  head() {
    return { title: 'Create new suite' }
  },
  methods: {
    onSubmit() {
      this.$axios
        .$post('/suites/new', { ...this.form })
        .then(_data => {
          // TODO: use vue-notification here
          console.info(`Success!`)
          this.$router.replace('/suites')
        })
        .catch(err => {
          //TODO: use vue-notification to log error
          console.error(err)
        })
    },
  },
}
</script>
