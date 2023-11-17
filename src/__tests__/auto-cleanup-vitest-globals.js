test('Testing Utilities with global access to `afterEach()` will not log warnings', () => {
  jest.spyOn(console, 'warn')
  global.afterEach = () => {}

  require('..')
  expect(console.warn).not.toHaveBeenCalled()
})
