module.exports = {
  extends: [
    './node_modules/kcd-scripts/eslint.js',
    'plugin:vue/recommended',
    'prettier/vue',
  ],
  plugins: ['vue'],
  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
    allowImportExportEverywhere: true
  }
}
