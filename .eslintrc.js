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
    'no-console': 'off',
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/html-closing-bracket-spacing': 0
  }
}
