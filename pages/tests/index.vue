<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-button class="mb-2" to="/tests/new" variant="primary">
          Run new test
        </b-button>

        <b-table hover sticky-header stripped :items="tests">
          <template v-slot:cell(_id)="data">
            <nuxt-link :to="`/tests/${data.item._id}`">
              {{ data.value }}
            </nuxt-link>
          </template>

          <template v-slot:cell(createdAt)="data">
            <nuxt-link :to="`/tests/${data.item._id}`">
              {{ data.value }}
            </nuxt-link>
          </template>

          <template v-slot:cell(testCase)="data">
            <!-- <nuxt-link :to="`/cases/${data.item.testCase._id}`"> -->
            {{ data.value.name }}
            <!-- </nuxt-link> -->
          </template>

          <template v-slot:cell(buildFile)="data">
            <!-- <nuxt-link :to="`/files/${data.item.buildFile._id}`"> -->
            {{ data.value.name }}
            <!-- </nuxt-link> -->
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
