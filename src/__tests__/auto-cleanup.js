import {render} from '..'
import '@testing-library/jest-dom'

// This verifies that by importing VTL in an environment which supports
// afterEach (like jest) we'll get automatic cleanup between tests.
test('renders the component', () => {
  render({template: `<h1>Hello World</h1>`})

  expect(document.body.innerHTML).toMatchInlineSnapshot(`
    <div>
      <h1>Hello World</h1>
    </div>
  `)
})

test('cleans up after each test by default', () => {
  expect(document.body.innerHTML).toMatchInlineSnapshot(``)
})

test('renders multi-root component', () => {
  render({
    template: `
      <h1>Hello World</h1>
      <h2>Hello World</h2>
    `,
  })

  expect(document.body.innerHTML).toMatchInlineSnapshot(`
    <div>
      <h1>Hello World</h1>
      <h2>Hello World</h2>
    </div>
  `)
})

test('cleans up after rendering multi-root node', () => {
  expect(document.body.innerHTML).toMatchInlineSnapshot(``)
})

test('renders single slot component', () => {
  render({template: `<slot />`})

  expect(document.body.innerHTML).toMatchInlineSnapshot(`<div></div>`)
})

test('cleans up after rendering slot component', () => {
  expect(document.body.innerHTML).toMatchInlineSnapshot(``)
})
