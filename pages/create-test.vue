<template>
  <div class="container">
    <div
      class="d-flex justify-content-between align-items-center my-1"
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
        <b-form-input v-else-if="field == 'value'" v-model="step.value" />
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
    <div class="d-flex justify-content-center">
      <b-button variant="outline-success" @click="suite.push({})">
        Add new step
      </b-button>
      <b-button
        variant="outline-primary"
        @click="postTest"
        :disabled="suite.length == 0"
      >
        Create test
      </b-button>
    </div>
  </div>
</template>

<script>
import { BIconArrowDown, BIconArrowUp } from 'bootstrap-vue'

export default {
  components: {
    BIconArrowDown,
    BIconArrowUp
  },
  data() {
    // TODO: complete options for actions
    return {
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
    postTest() {
      // TODO: add sending test to API
    }
  },
  watch: {}
}
</script>
