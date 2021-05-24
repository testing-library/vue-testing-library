<template>
  <button @click="handleClick">Click me</button>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      this.$emit('custom', e)
    },
  },
}
</script>
