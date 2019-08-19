let render
beforeAll(async () => {
  process.env.VTL_SKIP_AUTO_CLEANUP = 'true'
  const vtl = await require('@testing-library/vue')
  render = vtl.render
})

// This test verifies that if VTL_SKIP_AUTO_CLEANUP is set then we DON'T
// auto-wire up the afterEach cleanup for folks.
test('first test render a vue component', () => {
  render({
    template: `<h1>Hello World</h1>`,
  })

  expect(document.body.innerHTML).toMatchInlineSnapshot(`
        <div>
          <h1>Hello World</h1>
        </div>
    `)
})

test('no cleanup should have happened, renders the first component still', () => {
  expect(document.body.innerHTML).toMatchInlineSnapshot(`
    <div>
      <h1>Hello World</h1>
    </div>
  `)
})
