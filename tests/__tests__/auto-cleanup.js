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
  expect(h1.textContent).toEqual('Hello World')
})

const NewComponent = {
  template: `<h1>Automatic clean after each test</h1>`
}

test('it should cleanup after each test and render NewComponent', () => {
  render(NewComponent)
  expect(document.body.innerHTML).toEqual(
    '<div><h1>Automatic clean after each test</h1></div>'
  )
})
