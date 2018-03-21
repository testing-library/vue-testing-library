<template>
  <div>
    <span>{{ lapse }}ms</span>
    <button @click="handleRunClick" data-testid="start-stop-button">
      {{ running ? 'Stop' : 'Start' }}
    </button>
    <button @click="handleClearClick" data-testid="clear-button">
      Clear
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      running: false,
      lapse: 0,
      timer: null
    }
  },
  methods: {
    handleClearClick () {
      clearInterval(this.timer)
      this.lapse = 0
      this.running = false
    },
    handleRunClick () {
      if (this.running) {
        clearInterval(this.timer)
      } else {
        const startTime = Date.now() - this.lapse

        this.timer = setInterval(() => {
          this.lapse = Date.now() - startTime
        })
      }

      this.running = !this.running      
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
