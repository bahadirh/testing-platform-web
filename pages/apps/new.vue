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
      this.$axios
        .$post('/apps/new', { ...this.form })
        .then(data => {
          this.$toast.success('Successfully created the new app!', {
            duration: 2000,
          })
          this.$router.replace('/apps')
        })
        .catch(err => {
          this.$toast.error('Something bad happened when creating app.', {
            duration: 2000,
          })
          console.error(err)
        })
    },
  },
}
</script>
