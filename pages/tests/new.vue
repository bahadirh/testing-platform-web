<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="case-group"
            label="Test case:"
            label-for="test-case"
          >
            <b-form-select v-model="form.testCase" :options="caseOptions" />
          </b-form-group>

          <b-form-group
            id="name-group"
            label="Platform version:"
            label-for="platform-version"
          >
            <b-form-select
              v-model="form.platformVersion"
              :options="platformVersionOptions"
            />
          </b-form-group>

          <b-form-group id="file-group" label="Related file:" label-for="file">
            <b-form-select v-model="form.buildFile" :options="fileOptions" />
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
  async asyncData({ $axios }) {
    const { cases } = await $axios.$get('/cases/list')
    const { files } = await $axios.$get('/files/list')

    const caseOptions = cases.map(case_ => ({
      value: case_._id,
      text: case_.name,
    }))

    const fileOptions = files.map(file => ({
      value: file._id,
      text: file.name,
    }))

    return {
      fileOptions: [
        { value: null, text: 'Please select an option' },
        ...fileOptions,
      ],
      caseOptions: [
        { value: null, text: 'Please select an option' },
        ...caseOptions,
      ],
    }
  },
  data() {
    return {
      platformVersionOptions: [
        { value: 'android-version-10', text: 'Android 10' },
        { value: 'android-version-9', text: 'Android 9' },
        { value: 'ios-version-13.3', text: 'iOS 13.3' },
      ],
      form: { app: null },
      fileOptions: [],
      caseOptions: [],
    }
  },
  head() {
    return { title: 'Run new test' }
  },
  methods: {
    onSubmit() {
      this.$axios
        .$post('/tests/new', { ...this.form })
        .then(data => {
          this.$toast.success('Successfully submitted the new test!', {
            duration: 2000,
          })
          // TODO: redirect the user
          // this.$router.replace('/tests')
        })
        .catch(err => {
          this.$toast.error('Something bad happened when creating test.', {
            duration: 2000,
          })
          console.error(err)
        })
    },
  },
}
</script>
