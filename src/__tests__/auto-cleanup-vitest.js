// This test verifies that if test is running from vitest without globals - jest will throw
test('works', () => {
  delete global.afterEach // no globals in vitest by default
  process.env.VITEST = 'true'

  expect(() => require('..')).toThrowErrorMatchingInlineSnapshot(`
    You are using vitest without globals, this way we can't run cleanup after each test.
    See https://testing-library.com/docs/vue-testing-library/setup for details or set the VTL_SKIP_AUTO_CLEANUP variable to 'true'
  `)
})
