<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
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
                <b-form-select :options="actions" v-model="step.action" />
                <!-- :disabled="step.action != undefined" -->
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
                  placeholder="value"
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
                  v-else
                  v-model.number="step[field]"
                  :placeholder="field"
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
    </b-row>
  </b-container>
</template>

<script>
import { BIconArrowDown, BIconArrowUp } from 'bootstrap-vue'

export default {
  components: {
    BIconArrowDown,
    BIconArrowUp,
  },
  head() {
    return {
      title: 'Create new case',
    }
  },
  data() {
    // TODO: complete options for actions
    return {
      name: '',
      newAction: {},
      elementSelectionOptions: ['name', 'xpath', 'text', 'className'],
      options: {
        acceptAlert: [],
        assertTextEqualsTo: ['selectElementBy', 'elementSelector', 'value'],
        back: [],
        clickElement: ['selectElementBy', 'elementSelector'],
        dismissAlert: [],
        getGeoLocation: [],
        getPageSource: [],
        hideKeyboard: [],
        lockDevice: ['seconds'],
        move: ['x', 'y'],
        pause: ['milliseconds'],
        scroll: ['fromX', 'fromY', 'toX', 'toY'],
        setGeoLocation: ['altitude', 'latitude', 'longitude'],
        setValue: ['selectElementBy', 'elementSelector', 'value'],
        unlockDevice: [],
      },
      actions: [
        { text: '', value: undefined },
        {
          text: 'Click an element',
          value: 'clickElement',
        },
        { text: 'Set value of an element', value: 'setValue' },
        { text: 'Get page source', value: 'getPageSource' },
        { text: 'Go back', value: 'back' },
        { text: 'Lock device', value: 'lockDevice' },
        { text: 'Unlock device', value: 'unlockDevice' },
        { text: 'Move', value: 'move' },
        { text: 'Scroll', value: 'scroll' },
        { text: 'Pause test', value: 'pause' },
        { text: 'Accept alert', value: 'acceptAlert' },
        { text: 'Dismiss alert', value: 'dismissAlert' },
        { text: 'Set geolocation', value: 'setGeoLocation' },
        { text: 'Get geolocation', value: 'getGeoLocation' },
        { text: 'Assert element text', value: 'assertTextEqualsTo' },
        { text: 'Hide keyboard', value: 'hideKeyboard' },
      ],
      suite: [{}],
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
      this.$axios
        .$post('/cases/new', { name: this.name, sequence: this.suite })
        .then(data => {
          this.$toast.success('Successfully created the new test case!', {
            duration: 2000,
          })
          this.$router.replace('/cases')
        })
        .catch(err => {
          this.$toast.error('Something bad happened when creating test case.', {
            duration: 2000,
          })
          console.error(err)
        })
    },
  },
  watch: {},
}
</script>
