<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-row v-if="test">
          <div class="h1">{{ title }}</div>
        </b-row>
        <b-table
          hover
          stacked
          stripped
          :items="[
            {
              _id: test._id,
              platformVersion: test.platformVersion,
              status: test.status,
            },
          ]"
        />
      </b-col>
    </b-row>

    <b-row
      v-if="test.status == 'Done' || test.status == 'Error'"
      align-content="between"
    >
      <b-col />
      <b-col cols="4">
        <b-carousel indicators controls no-wrap :interval="0">
          <b-carousel-slide
            v-for="i in test.result.state.length"
            :img-src="`${$axios.defaults.baseURL}/screenshots/${test._id}/${i}`"
            :key="i"
            :caption="`Step ${i}`"
          />
        </b-carousel>
      </b-col>
      <b-col />
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
          title: `Test details`,
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
