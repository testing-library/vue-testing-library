const config = require('kcd-scripts/lint-staged')

module.exports = {
  ...config,
  '*.vue': [
    'kcd-scripts format',
    'kcd-scripts lint',
    'kcd-scripts test --findRelatedTests',
    'git add'
  ]
}
