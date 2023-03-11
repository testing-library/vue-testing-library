const merge = require('lodash.merge')
const config = require('kcd-scripts/jest')

module.exports = merge(config, {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  moduleFileExtensions: ['js', 'vue'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/__tests__/**'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/__tests__/components',
    '<rootDir>/src/__tests__/directives',
  ],
  moduleNameMapper: {
    '@vue/apollo-composable': [
      '<rootDir>/node_modules/@vue/apollo-composable/dist/index.js',
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(@vue/apollo-composable)/)'],
})
