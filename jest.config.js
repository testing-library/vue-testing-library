const merge = require('lodash.merge')
const config = require('kcd-scripts/jest')

module.exports = merge(config, {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '@testing-library/vue': '<rootDir>/src/vue-testing-library.js',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/__tests__/**'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/__tests__/components',
    '<rootDir>/src/__tests__/directives',
  ],
})
