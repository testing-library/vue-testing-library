<template>
  <div>
    <Child data-testid="child" @custom="handleCustom" />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  components: {
    Child,
  },
  methods: {
    handleCustom(e) {
      this.$emit('custom', e)
    },
  },
}
</script>
