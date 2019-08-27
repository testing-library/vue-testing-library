<template>
  <div>
    <button @click="handleClick">Click me</button>
    <div v-show="displayElement">
      <p>Text</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayElement: false,
    }
  },
  methods: {
    handleClick(e) {
      this.displayElement = !this.displayElement
    },
  },
}
</script>
