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

      <label id="about-me">About Me</label>
      <textarea
        v-model="about"
        name="about-me"
        aria-labelledby="about-me"
      />

      <label for="preference-select">I prefer...</label>
      <select
        id="preference-select"
        v-model="selected"
        name="preference-select"
      >
        <option
          disabled
          value=""
        />
        <option>Dogs</option>
        <option>Cats</option>
        <option>None of the above</option>
      </select>

      <label id="remember-me-label">Remember Me</label>
      <input
        id="remember-me"
        v-model="rememberMe"
        type="checkbox"
        name="remember-me"
        aria-labelledby="remember-me-label"
      >

      <button
        :disabled="submitDisabled"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      about: '',
      selected: '',
      rememberMe: false
    }
  },
  computed: {
    submitDisabled () {
      return !this.username || !this.password || !this.about || !this.selected
    }
  },
  methods: {
    submit () {
      if (this.submitDisabled) return

      this.$emit('submit', {
        username: this.username,
        password: this.password,
        about: this.about,
        selected: this.selected,
        rememberMe: this.rememberMe
      })
    }
  }
}
</script>
