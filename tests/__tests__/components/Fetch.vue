<template>
  <div>
    <button
      data-testid="load-greeting"
      @click="fetch">
      Fetch
    </button>
    <span
      v-if="data"
      data-testid="greeting-text">{{ data.greeting }}</span>
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
  data () {
    return {
      data: null
    }
  },
  methods: {
    fetch () {
      axios
        .get(this.url)
        .then(response => { this.data = response.data })
    }
  }
}
</script>
