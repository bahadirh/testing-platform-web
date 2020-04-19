<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-button class="mb-2" to="/suites/new" variant="primary">
          Create new suite
        </b-button>

        <b-table hover sticky-header stripped :items="suites" :fields="fields">
          <template v-slot:cell(name)="data">
            <nuxt-link :to="`/suites/${data.item._id}`">
              {{ data.value }}
            </nuxt-link>
          </template>

          <template v-slot:cell(app)="data">
            <nuxt-link v-if="data.item.app" :to="`/apps/${data.item.app_id}`">
              {{ data.item.app.name }}
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
    return { title: 'Suites' }
  },
  middleware: 'authenticated',
  data() {
    return {
      fields: [
        { key: 'name', sortable: true },
        { key: 'app', sortable: true }
      ]
    }
  },
  asyncData() {
    return axios
      .get('/suites/list')
      .then(({ data }) => {
        return {
          suites: data.suites
        }
      })
      .catch(err => {
        // TODO: log error with vue-notification
        console.error(err)
      })
  }
}
</script>
