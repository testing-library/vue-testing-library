// This test verifies that if test is running from vitest with globals - jest will not throw
test('works', () => {
  global.afterEach = () => {} // emulate enabled globals
  process.env.VITEST = 'true'

  expect(() => require('..')).not.toThrow()
})
