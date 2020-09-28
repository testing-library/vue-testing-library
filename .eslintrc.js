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

    'testing-library/no-dom-import': 'off',
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/no-manual-cleanup': 'off',
  },
}
