<template>
  <div class="card">
    <slot name="header" />
    <slot :content="content">
      <!-- Fallback content if no default slot is given -->
      <p>Nothing used the {{ content }}</p>
    </slot>
    <slot name="footer" />
  </div>
</template>

<script>
// For the sake of demoing scopedSlots, this Card component
// passes a simple string down to its default slot.
export default {
  data() {
    return {
      content: 'Scoped content!'
    }
  }
}
</script>
