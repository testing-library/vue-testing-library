import { render, cleanup } from '@testing-library/vue'
import Stubs from './components/Stubs'

afterEach(cleanup)

test('Form contains search button', () => {
  const { getByText } = render(Stubs, {
    stubs: ['FontAwesomeIcon'],
  })
  getByText('Search now')
})
