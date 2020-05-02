<template>
  <b-container>
    <b-row class="center">
      <b-col cols="8">
        <b-row v-if="app">
          <div class="h1">{{ app.name }} details</div>
        </b-row>
        <b-table hover stacked stripped :items="[app]">
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
      .$get(`/apps/${route.params.id}`)
      .then(data => {
        console.info('Success!')
        return {
          app: data.app,
          title: `${data.app.name} details`,
        }
      })
      .catch(err => {
        // TODO: vue-notification here
        console.info(err)
        return {}
      })
  },
  head() {
    return { title: this.title }
  },
  data() {
    return {
      app: {},
    }
  },
}
</script>
