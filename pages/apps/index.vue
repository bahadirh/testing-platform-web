<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-button class="mb-2" to="/apps/new" variant="primary">
          Create new app
        </b-button>

        <b-table hover sticky-header stripped :items="apps" :fields="fields">
          <template v-slot:cell(name)="data">
            <nuxt-link :to="`/apps/${data.item._id}`">
              {{ data.value }}
            </nuxt-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  head() {
    return { title: 'Apps' }
  },
  middleware: 'authenticated',
  data() {
    return {
      fields: [
        // { key: '_id', sortable: false },
        // TODO: add created_at and updated_at fields if necessary
        { key: 'name', sortable: true },
        { key: 'version', sortable: false }
      ]
    }
  },
  asyncData() {
    return axios
      .get('/apps/list')
      .then(({ data }) => ({
        apps: data.apps
      }))
      .catch(err => {
        // TODO: log error with vue-notification
        console.error(err)
      })
  }
}
</script>
