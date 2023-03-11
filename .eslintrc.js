module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    './node_modules/kcd-scripts/eslint.js',
    'plugin:vue/vue3-recommended',
    'plugin:testing-library/vue',
    'prettier',
  ],
  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'jest/unbound-method': 'off',

    'testing-library/no-dom-import': 'off',
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/no-manual-cleanup': 'off',
    'testing-library/no-await-sync-events': 'off',
    'testing-library/prefer-user-event': 'off',
    'testing-library/no-node-access': 'off',
    'testing-library/await-fire-event': 'off',
  },
}
