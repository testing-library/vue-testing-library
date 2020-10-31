import {render} from '@testing-library/vue'
import '@testing-library/jest-dom'
import Stubs from './components/Stubs'

test('Stubs out a component', () => {
  const CustomStub = {
    template: '<p>Search now</p>',
  }

  const {getByText} = render(Stubs, {
    global: {
      stubs: {
        // "Directive" is the stubbed out component
        Directive: CustomStub,
      },
    },
  })

  expect(getByText('Search now')).toBeInTheDocument()
})
