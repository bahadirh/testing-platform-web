<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-button class="mb-2" to="/cases/new" variant="primary">
          Create new case
        </b-button>

        <b-table hover sticky-header stripped :items="cases" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  middleware: 'authenticated',
  head() {
    return { title: 'Cases' }
  },
  asyncData() {
    return axios
      .get('/cases/list')
      .then(({ data }) => {
        return { cases: data.cases }
      })
      .catch(error => {
        console.error(error)
        return {}
      })
  },
  data() {
    return {}
  }
}
</script>
