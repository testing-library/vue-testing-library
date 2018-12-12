module.exports = {
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/tests/__tests__/**',
    '!**/node_modules/**'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/npm/',
    '<rootDir>/tests/__tests__/components/'
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ]
}
