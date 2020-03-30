<template>
  <div class="container">
    <b-row>
      <b-col />
      <b-col cols="10">
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="name-group" label="Name:" label-for="name">
            <b-form-input id="name" v-model="name" required />
          </b-form-group>

          <b-form-group id="sequence-group" label="Test sequence:">
            <div
              class="d-flex justify-content-between align-items-center"
              v-for="(step, i) in suite"
              :key="i"
            >
              <div>
                <b-form-select
                  :options="actions"
                  v-model="step.action"
                  :disabled="step.action != undefined"
                />
              </div>

              <div v-for="(field, j) in options[step.action]" :key="j">
                <b-form-select
                  v-if="field == 'selectElementBy'"
                  v-model="step.selectElementBy"
                  :options="elementSelectionOptions"
                />
                <b-form-input
                  v-else-if="field == 'elementSelector'"
                  v-model="step.elementSelector"
                  placeholder="element selector"
                />
                <b-form-input
                  v-else-if="field == 'value'"
                  v-model="step.value"
                />
                <b-form-input
                  v-else-if="field == 'x'"
                  v-model.number="step.x"
                  placeholder="x coord"
                />
                <b-form-input
                  v-else-if="field == 'y'"
                  v-model.number="step.y"
                  placeholder="y coord"
                />
                <b-form-input
                  v-else-if="field == 'milliseconds'"
                  v-model.number="step.milliseconds"
                  placeholder="in milliseconds"
                />
                <b-form-input
                  v-else-if="field == 'altitude'"
                  v-model.number="step.altitude"
                  placeholder="altitude"
                />
                <b-form-input
                  v-else-if="field == 'latitude'"
                  v-model.number="step.latitude"
                  placeholder="latitude"
                />
                <b-form-input
                  v-else-if="field == 'longitude'"
                  v-model.number="step.longitude"
                  placeholder="longitude"
                />
              </div>
              <div>
                <b-button variant="danger" @click="suite.splice(i, 1)">
                  Delete step
                </b-button>
                <b-button
                  variant="success"
                  @click="swap(suite, i, i - 1)"
                  :disabled="i == 0"
                >
                  <b-icon-arrow-up />
                </b-button>
                <b-button
                  variant="success"
                  @click="swap(suite, i, i + 1)"
                  :disabled="i == suite.length - 1"
                >
                  <b-icon-arrow-down />
                </b-button>
              </div>
            </div>
          </b-form-group>

          <div class="d-flex justify-content-center">
            <b-button variant="outline-success" @click="suite.push({})">
              Add new step
            </b-button>
            <b-button
              variant="outline-primary"
              type="submit"
              :disabled="suite.length == 0"
            >
              Create test
            </b-button>
          </div>
        </b-form>
      </b-col>
      <b-col />
    </b-row>
  </div>
</template>

<script>
import { BIconArrowDown, BIconArrowUp } from 'bootstrap-vue'
import axios from '../../plugins/axios'

export default {
  components: {
    BIconArrowDown,
    BIconArrowUp
  },
  head() {
    return {
      title: 'Create new case'
    }
  },
  data() {
    // TODO: complete options for actions
    return {
      name: '',
      newAction: {},
      elementSelectionOptions: ['name', 'xpath', 'text'],
      options: {
        clickElement: ['selectElementBy', 'elementSelector'],
        setValue: ['selectElementBy', 'elementSelector', 'value'],
        getPageSource: [],
        move: ['x', 'y'],
        pause: ['milliseconds'],
        acceptAlert: [],
        dismissAlert: [],
        getGeoLocation: [],
        setGeoLocation: ['altitude', 'latitude', 'longitude']
      },
      actions: [
        { text: '', value: undefined },
        {
          text: 'Click an element',
          value: 'clickElement'
        },
        { text: 'Set value of an element', value: 'setValue' },
        { text: 'Get page source', value: 'getPageSource' },
        { text: 'Move', value: 'move' },
        { text: 'Pause test', value: 'pause' },
        { text: 'Accept alert', value: 'acceptAlert' },
        { text: 'Dismiss alert', value: 'dismissAlert' },
        { text: 'Set geolocation', value: 'setGeoLocation' },
        { text: 'Get geolocation', value: 'getGeoLocation' }
      ],
      suite: [{}]
    }
  },
  computed: {},
  methods: {
    swap(list, i, j) {
      const temp = list[i]
      list[i] = list[j]
      list[j] = temp
      this.$forceUpdate()
    },
    onSubmit() {
      axios
        .post('/cases/new', { name: this.name, sequence: this.suite })
        .then(({ data }) => {
          // TODO: use vue-notification for error and success
          console.info('success')
        })
        .catch(err => {
          console.info(err)
        })
    }
  },
  watch: {}
}
</script>
