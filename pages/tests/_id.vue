<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-row v-if="test">
          <div class="h1">{{ title }}</div>
        </b-row>
        <b-table hover stacked stripped :items="[test]">
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
      .$get(`/tests/${route.params.id}`)
      .then(data => {
        return {
          test: data.test,
          title: `Test #${data.test._id} details`,
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
