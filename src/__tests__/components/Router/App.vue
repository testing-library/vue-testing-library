<template>
  <router-link to="/" data-testid="home-link">Home</router-link>
  <router-link to="/about" data-testid="about-link">About</router-link>
  <router-view />
  <div data-testid="location-display">{{ $route.fullPath }}</div>
</template>
