<template>
  <input v-value="value" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
