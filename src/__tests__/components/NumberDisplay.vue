<template>
  <span data-testid="number-display">{{ number }}</span>
  <span data-testid="instance-id">{{ id }}</span>
</template>

<script>
let idCounter = 1

export default {
  props: {
    number: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      id: idCounter++,
    }
  },
}
</script>
