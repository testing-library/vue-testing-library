<template>
  <form>
    <label for="search"> <FontAwesomeIcon icon="search" /> Search </label>
    <input id="search" type="text" name="search" />
    <VButton text="Search now" />
  </form>
</template>

<script>
import VButton from './Button'

export default {
  name: 'SearchForm',
  components: { VButton }
}
</script>
