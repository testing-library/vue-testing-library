<template>
  <button @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Button Text'
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click')
    }
  }
}
</script>
