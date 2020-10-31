import {render} from '@testing-library/vue'
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
  expect(document.body.innerHTML).toMatchInlineSnapshot(`""`)
})
