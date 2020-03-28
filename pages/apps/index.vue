<template>
  <b-container fluid>
    <b-row>
      <b-col />
      <b-col cols="8">
        <b-button class="mb-2" to="/apps/new" variant="primary">
          Create new app
        </b-button>
        <b-table hover stripped :items="apps" :fields="fields" />
      </b-col>
      <b-col />
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  head() {
    return { title: 'Apps' }
  },
  async fetch() {
    await axios
      .get('/apps/list')
      .then(({ data }) => {
        this.apps = data.apps
      })
      .catch(err => {
        // TODO: log error with vue-notification
        console.error(err)
      })
  },
  middleware: 'authenticated',
  components: {},
  data() {
    return {
      apps: [],
      fields: [
        { key: '_id', sortable: false },
        { key: 'name', sortable: true },
        { key: 'version', sortable: false }
      ]
    }
  },
  computed: {},
  methods: {}
}
</script>
