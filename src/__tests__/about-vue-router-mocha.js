/* eslint-disable jest/no-conditional-in-test */
/* eslint-disable jest/no-conditional-expect */

import '@testing-library/jest-dom'
import {render} from '@testing-library/vue'

import About from './components/Router/About.vue'

const routes = []
test('uses require("vue-router").default when require("vue-router") is undefined (useful for mocha users)', () => {
  expect.assertions(2)

  // Test for fix https://github.com/testing-library/vue-testing-library/issues/119
  jest.mock('vue-router', () => {
    return undefined
  })

  try {
    render(About, {routes})
  } catch (error) {
    expect(error).toBeInstanceOf(TypeError)
    expect(error.message).toEqual(expect.stringContaining('default'))
  }
})
