<template>
  <button @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Button Text',
    },
  },
  emits: {click: null},
  methods: {
    handleClick(_e) {
      this.$emit('click')
    },
  },
}
</script>
