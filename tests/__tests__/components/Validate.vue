<template>
  <form>
    <label for="username-input">Username</label>
    <input
      v-validate="'required|email'"
      id="username-input"
      v-model="username"
      placeholder="Username..."
      name="username" >

    <span
      v-if="errors.has('username')"
      data-testid="username-errors">{{ errors.first('username') }}</span>

    <label id="password-label">Password</label>
    <input
      v-model="password"
      placeholder="Password..."
      type="password"
      name="password"
      aria-labelledby="password-label"
    >
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>
