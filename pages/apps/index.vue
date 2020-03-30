<template>
  <b-container fluid>
    <b-row>
      <b-col />
      <b-col cols="6">
        <b-button class="mb-2" to="/apps/new" variant="primary">
          Create new app
        </b-button>

        <b-table hover sticky-header stripped :items="apps" :fields="fields">
          <template v-slot:cell(name)="data">
            <nuxt-link :to="`/apps/${data.item._id}`">{{ data.value }}</nuxt-link>
          </template>
        </b-table>
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
  data() {
    return {
      apps: [],
      fields: [
        // { key: '_id', sortable: false },
        { key: 'name', sortable: true },
        { key: 'version', sortable: false }
      ]
    }
  }
}
</script>
