<template>
  <button
    :class="typeClass"
    @click="clicked"
  >{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    clicked: {
      type: Function,
      default: () => true
    },
    type: {
      validator: (value) => ['primary', 'secondary'].includes(value),
      default: 'primary'
    }
  },
  computed: {
    typeClass: function () {
      if (this.type) {
        return `button button--${this.type}`
      }
      return 'button'
    }
  }
}
</script>
