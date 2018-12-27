<template>
  <form>
    <label for="search">
      <font-awesome-icon icon="search"/> Search
    </label>
    <input type="text" id="search" name="search">
    <v-button text="Search now"></v-button>
  </form>
</template>

<script>
import vButton from './Button';

export default {
  name: 'searchForm',
  components: { vButton },
  }
</script>