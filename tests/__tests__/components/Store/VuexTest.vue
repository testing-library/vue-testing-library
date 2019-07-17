<template>
  <div>
    <h2>Counter</h2>
    <div>
      <button data-testid="decrementer" @click="decrement">-</button>
      <span data-testid="count-value">{{ count }}</span>
      <button data-testid="incrementer" @click="increment">+</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['count'])
  },

  methods: {
    ...mapActions(['decrement', 'increment'])
  }
}
</script>
