<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-button class="mb-2" to="/files/new" variant="primary">
          Upload file
        </b-button>

        <b-table hover sticky-header stripped :items="files" :fields="fields" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  head() {
    return { title: 'Files' }
  },
  asyncData({ $axios }) {
    return $axios
      .$get('/files/list')
      .then(({ files }) => {
        return { files }
      })
      .catch(err => {
        console.error(err)
        return {}
      })
  },
  data() {
    return {
      files: [],
      fields: [
        // TODO: add created_at and updated_at fields if necessary
        { key: '_id', sortable: false },
        { key: 'name', sortable: true },
      ],
    }
  },
}
</script>
