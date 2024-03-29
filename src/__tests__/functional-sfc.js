import {h} from 'vue'
import {render} from '..'
import '@testing-library/jest-dom'

// From docs: Performance gains from 2.x for functional components are now
// negligible in 3.x, so we recommend just using stateful components.

// eslint-disable-next-line no-unused-vars
const Functional = (props, context) => {
  return h('div', {}, 'Hi!')
}

test('renders functional component', () => {
  const {getByText} = render(Functional)

  expect(getByText('Hi!')).toBeInTheDocument()
})
