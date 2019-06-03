<template>
  <div>
    <form @submit.prevent="submit">
      <label for="username-input">Username</label>
      <input
        id="username-input"
        v-model="username"
        name="username" >

      <label id="about-me">About Me</label>
      <textarea
        v-model="about"
        name="about-me"
        placeholder="I was born in..."
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
        data-testid="remember-input"
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
      about: '',
      selected: 'Dogs',
      rememberMe: false
    }
  },
  computed: {
    submitDisabled () {
      return !this.username || !this.about || !this.selected
    }
  },
  methods: {
    submit () {
      if (this.submitDisabled) return

      this.$emit('submit', {
        username: this.username,
        about: this.about,
        selected: this.selected,
        rememberMe: this.rememberMe
      })
    }
  }
}
</script>
