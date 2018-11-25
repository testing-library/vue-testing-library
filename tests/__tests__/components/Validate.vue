<template>
  <form>
    <label
      id="username-label"
      for="username">Username</label>

    <input
      v-validate="'required|email'"
      v-model="username"
      placeholder="Username..."
      name="username"
      aria-labelledby="username-label"
    >

    <span
      v-show="errors.has('username')"
      data-testid="username-errors">{{ errors.first('username') }}</span>

    <label
      id="password-label"
      for="password"
    >Password</label>
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
  data: () => ({
    username: '',
    password: ''
  })
}
</script>
