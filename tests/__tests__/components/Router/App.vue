<template>
  <div>
    <router-link
      to="/"
      data-testid="home-link">
      Home
    </router-link>
    <router-link
      to="/about"
      data-testid="about-link">
      About
    </router-link>
    <router-view />
    <location-display />
  </div>
</template>

<script>
import LocationDisplay from './LocationDisplay'

export default {
  components: {
    LocationDisplay
  }
}
</script>
