import {render} from '@testing-library/vue'
import FunctionalSFC from './components/FunctionalSFC'

const Functional = {
  functional: true,
  render(createElement) {
    return createElement('p', null, 'Hi!')
  },
}

test('renders functional component', () => {
  const {getByText} = render(Functional)

  getByText('Hi!')
})

test('renders functional SFC component', () => {
  const {getByText} = render(FunctionalSFC)

  getByText('Hi!')
})
