import { render } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'

const HelloWorldComponent = {
  template: `<h1>Hello World</h1>`
}
// This just verifies that by importing VTL in an
// environment which supports afterEach (like jest)
// we'll get automatic cleanup between tests.
test('render the first component', () => {
  const { container } = render(HelloWorldComponent)

  const h1 = container.querySelector('h1')
  expect(h1).toHaveTextContent('Hello World')
})

test('cleans up after each test by default', () => {
  expect(document.body.innerHTML).toEqual('')
})
