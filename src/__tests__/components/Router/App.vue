<template>
  <div>
    <RouterLink to="/" data-testid="home-link">
      Home
    </RouterLink>
    <RouterLink to="/about" data-testid="about-link">
      About
    </RouterLink>
    <RouterView />
    <div data-testid="location-display">{{ $route.fullPath }}</div>
  </div>
</template>
