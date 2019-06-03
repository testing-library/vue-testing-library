<template>
  <div>
    <form @submit.prevent="submit">
      <label for="username-input">Username</label>
      <input
        id="username-input"
        v-model="username"
        data-testid="username-input"
        placeholder="Username..."
        name="username" >
      <label id="password-label">Password</label>
      <input
        v-model="password"
        placeholder="Password..."
        type="password"
        name="password"
        aria-labelledby="password-label"
      >
      <label id="remember-me-label">Remember Me</label>
      <input
        id="remember-me"
        v-model="rememberMe"
        type="checkbox"
        name="remember-me"
        aria-labelledby="remember-me-label"
      >
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      username: '',
      password: '',
      rememberMe: false
    }
  },
  methods: {
    submit () {
      this.onSubmit({
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      })
    }
  }
}
</script>
