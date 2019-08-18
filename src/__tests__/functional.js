import {cleanup, render} from '@testing-library/vue'
import FunctionalSFC from './components/FunctionalSFC'

const Functional = {
  functional: true,
  render(createElement) {
    return createElement('p', null, 'Hi!')
  },
}

afterEach(cleanup)

it('renders functional comp', () => {
  const {getByText} = render(Functional)

  getByText('Hi!')
})

it('renders functional SFC comp', () => {
  const {getByText} = render(FunctionalSFC)

  getByText('Hi!')
})
