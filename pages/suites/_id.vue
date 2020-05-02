<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-row v-if="suite">
          <div class="h1">{{ title }}</div>
        </b-row>
        <b-table hover stacked stripped :items="[suite]">
          <template v-slot:cell(files)="files">
            {{ files.value }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  asyncData({ route, $axios }) {
    return $axios
      .$get(`/suites/${route.params.id}`)
      .then(data => {
        return {
          suite: data.suite,
          title: `${data.suite.name} details`,
        }
      })
      .catch(err => {
        console.error(err)
        return {}
      })
  },
  head() {
    return { title: this.title }
  },
  data() {
    return {}
  },
}
</script>
