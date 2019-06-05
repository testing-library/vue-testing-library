module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended'     
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': 'off'
  }
}
