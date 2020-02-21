<template>
  <div>
    <p v-uppercase="text" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'example text',
    }
  },
}
</script>
