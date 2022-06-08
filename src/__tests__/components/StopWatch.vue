<template>
  <div>
    <span data-testid="elapsed">{{ lapse }}ms</span>
    <button @click="handleRunClick">
      {{ running ? 'Stop' : 'Start' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      running: false,
      lapse: 0,
      timer: null,
    }
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    handleRunClick() {
      if (this.running) {
        clearInterval(this.timer)
      } else {
        const startTime = Date.now() - this.lapse

        this.timer = setInterval(() => {
          this.lapse = Date.now() - startTime
        })
      }

      this.running = !this.running
    },
  },
}
</script>
