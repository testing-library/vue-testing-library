<template>
  <v-app>
    <v-btn @click="show = true">open</v-btn>
    <v-dialog v-model="show">
      <v-card>
        <v-card-title class="headline green lighten-3">Lorem</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet.</v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'VuetifyDemoComponent',
  data() {
    return {
      show: false,
    }
  },
}
</script>
