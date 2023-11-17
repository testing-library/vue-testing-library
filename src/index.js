import {cleanup} from './render'

// If we're running in a test runner that supports afterEach then we'll
// automatically run cleanup after each test.
// This ensures that tests run in isolation from each other.
// If you don't like this, set the VTL_SKIP_AUTO_CLEANUP variable to 'true'.
if (typeof afterEach === 'function' && !process.env.VTL_SKIP_AUTO_CLEANUP) {
  afterEach(() => {
    cleanup()
  })
} else if (!process.env.VTL_AFTEREACH_WARNING_LOGGED) {
  process.env.VTL_AFTEREACH_WARNING_LOGGED = true
  console.warn(
    `The current test runner does not support afterEach/teardown hooks. This means we won't be able to run automatic cleanup and you should be calling cleanup() manually.`,
  )
}

export * from '@testing-library/dom'
export {cleanup, render} from './render'
export {fireEvent} from './fire-event'
