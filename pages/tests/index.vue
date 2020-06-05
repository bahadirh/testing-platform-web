<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-button class="mb-2" to="/tests/new" variant="primary">
          Run new test
        </b-button>

        <b-table hover sticky-header stripped :items="tests">
          <template v-slot:cell(createdAt)="data">
            <nuxt-link :to="`/tests/${data.item._id}`">
              {{ data.value }}
            </nuxt-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  head() {
    return { title: 'Tests' }
  },
  asyncData({ $axios }) {
    return $axios
      .$get('/tests/list')
      .then(data => {
        return { tests: data.tests }
      })
      .catch(error => {
        console.error(error)
        return {}
      })
  },
  data() {
    return {}
  },
}
</script>
