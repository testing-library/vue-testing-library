<template>
  <div>
    <button @click="fetch">
      Fetch
    </button>
    <span v-if="data">
      {{ data.greeting }}
    </span>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: null
    }
  },
  methods: {
    fetch() {
      axios.get(this.url).then(response => {
        this.data = response.data
      })
    }
  }
}
</script>
