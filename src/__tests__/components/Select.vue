<template>
  <div>
    <label for="dino-select">Choose a dinosaur:</label>
    <select id="dino-select" v-model="selectedDino">
      <option value="dino1">Tyrannosaurus</option>
      <option value="dino2">Velociraptor</option>
      <option value="dino3">Deinonychus</option>
      <optgroup label="Sauropods">
        <option value="dino4">Diplodocus</option>
        <option value="dino5">Saltasaurus</option>
        <option value="dino6">Apatosaurus</option>
      </optgroup>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDino: 'dino1',
    }
  },
}
</script>
