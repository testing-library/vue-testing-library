<template>
  <div>
    <div>You are home</div>
    <button data-testid="go-to-about" @click="goToAbout">About</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToAbout () {
      this.$router.push('/about')
    }
  }
}
</script>

