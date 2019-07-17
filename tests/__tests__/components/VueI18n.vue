<template>
  <div>
    <h2 data-testid="section-header">{{ $t('Hello') }}</h2>
    <button data-testid="button-en" @click="switchLocale('en')">English</button>
    <button data-testid="button-ja" @click="switchLocale('ja')">
      Japanese
    </button>
  </div>
</template>

<script>
export default {
  name: 'VueI18n',

  methods: {
    switchLocale(locale) {
      this.$i18n.locale = locale
    }
  }
}
</script>
