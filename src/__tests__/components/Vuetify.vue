<template>
  <div>
    <v-btn @click="show = true">open</v-btn>
    <v-dialog v-model="show">
      <v-card>
        <v-card-title class="headline green lighten-3">Lorem</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet.</v-card-text>
      </v-card>
    </v-dialog>
    <v-menu bottom offset-y>
      <template v-slot:activator="{on}">
        <v-btn icon v-on="on">open menu</v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>menu item</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
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
