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
  asyncData({ route, $axios, $toast }) {
    return $axios
      .$get(`/apps/${route.params.id}`)
      .then(data => {
        return {
          app: data.app,
          title: `${data.app.name} details`,
        }
      })
      .catch(err => {
        this.$toast.error('Something bad happened when loading that page.', {
          duration: 2000,
        })
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
