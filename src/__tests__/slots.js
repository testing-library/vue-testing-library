import '@testing-library/jest-dom'
import {render} from '@testing-library/vue'
import Card from './components/Card'

// Usage is the same as Vue Test Utils, since slots values are passed using the `slots`
// key from mount(). For more, see: https://vue-test-utils.vuejs.org/api/options.html#slots
test('Card component', () => {
  const {getByText} = render(Card, {
    slots: {
      header: '<h1>HEADER</h1>',
      footer: '<div>FOOTER</div>',
    },
  })

  expect(getByText('HEADER')).toBeInTheDocument()
  expect(getByText('FOOTER')).toBeInTheDocument()
})
