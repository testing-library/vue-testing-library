<template>
  <div>
    <button @click="toggle">toggle</button>
    <transition @after-enter="onAfterEnter">
      <div v-show="isShown">
        <p>{{ showingText }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const isShown = ref(false)
const showingText = ref('')

const onAfterEnter = () => (showingText.value = 'Completed.')
const toggle = () => {
  isShown.value = !isShown.value
  showingText.value = isShown.value ? 'Now fade in...' : 'Now fade out...'
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
