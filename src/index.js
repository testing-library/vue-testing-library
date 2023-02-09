import {cleanup} from './render'

// If we're running in a test runner that supports afterEach then we'll
// automatically run cleanup after each test.
// This ensures that tests run in isolation from each other.
// If you don't like this, set the VTL_SKIP_AUTO_CLEANUP variable to 'true'.
if (typeof afterEach === 'function' && !process.env.VTL_SKIP_AUTO_CLEANUP) {
  afterEach(() => {
    cleanup()
  })
} else if (process.env.VITEST === 'true') {
  throw new Error(
    "You are using vitest without globals, this way we can't run cleanup after each test.\n" +
      "See https://testing-library.com/docs/vue-testing-library/setup for details or set the VTL_SKIP_AUTO_CLEANUP variable to 'true'",
  )
}

export * from '@testing-library/dom'
export {cleanup, render} from './render'
export {fireEvent} from './fire-event'
