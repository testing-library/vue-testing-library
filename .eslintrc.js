module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    jest: true
  },
  extends: [
    './node_modules/kcd-scripts/eslint.js',
    'plugin:vue/recommended',
    'prettier/vue',
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'off'
  }
}
