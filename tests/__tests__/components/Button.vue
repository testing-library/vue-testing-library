<template>
  <button :class="typeClass" @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      validator: value => ['primary', 'secondary'].includes(value),
      default: 'primary'
    }
  },
  computed: {
    typeClass: function() {
      if (this.type) {
        return `button button--${this.type}`
      }
      return 'button'
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click')
    }
  }
}
</script>
