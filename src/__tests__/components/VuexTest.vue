<template>
  <div>
    <h2>Counter</h2>
    <div>
      <button @click="decrement" data-testid="decrementer">
        -
      </button>
      <span data-testid="count-value">{{ count }}</span>
      <button @click="increment" data-testid="incrementer">
        +
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([ 'count' ])
  },
  methods: {
    ...mapActions([
      'decrement',
      'increment'
    ])
  }
}
</script>
