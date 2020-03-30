<template>
  <b-container>
    <b-row>
      <b-col />
      <b-col cols="6">
        <b-button class="mb-2" to="/files/new" variant="primary">
          Upload file
        </b-button>

        <b-table hover sticky-header stripped :items="files" :fields="fields" />
      </b-col>
      <b-col />
    </b-row>
  </b-container>
</template>

<script>
import axios from '../../plugins/axios'

export default {
  middleware: 'authenticated',
  head() {
    return { title: 'Files' }
  },
  async fetch() {
    await axios
      .get('/files/list')
      .then(({ data }) => {
        this.files = data.files
      })
      .catch(err => {
        // TODO: log error with vue-notification
        console.error(err)
      })
  },
  data() {
    return {
      files: [],
      fields: [
        // TODO: add created_at and updated_at fields if necessary
        { key: '_id', sortable: false },
        { key: 'name', sortable: true }
      ]
    }
  }
}
</script>
