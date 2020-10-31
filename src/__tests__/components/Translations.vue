<template>
    <h2>{{ $t('hello') }}</h2>
    <select v-model="$i18n.locale">
      <option value="en">English</option>
      <option value="ja">Japanese</option>
    </select>
</template>

<script>
export default {
  name: 'Translations',
}
</script>
