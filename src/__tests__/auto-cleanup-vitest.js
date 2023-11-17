test('Testing Utilities lacking a global `afterEach` function will log a warning ONCE', () => {
  delete global.afterEach
  const warn = jest.spyOn(console, 'warn')

  require('..')
  jest.resetModules()
  require('..')

  expect(warn).toHaveBeenCalledTimes(1)
  expect(warn.mock.calls[0][0]).toMatchInlineSnapshot(
    `The current test runner does not support afterEach/teardown hooks. This means we won't be able to run automatic cleanup and you should be calling cleanup() manually.`,
  )
})
