<template>
  <div>
    <RouterLink
      to="/"
      data-testid="home-link">
      Home
    </RouterLink>
    <RouterLink
      to="/about"
      data-testid="about-link">
      About
    </RouterLink>
    <RouterView />
    <LocationDisplay />
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
