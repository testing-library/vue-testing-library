<template>
  <div>
    <h2>{{ $t('Hello') }}</h2>
    <button @click="switchLocale('en')">English</button>
    <button @click="switchLocale('ja')">Japanese</button>
  </div>
</template>

<script>
export default {
  name: 'Translations',

  methods: {
    switchLocale(locale) {
      this.$i18n.locale = locale
    },
  },
}
</script>
