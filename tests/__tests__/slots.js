import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/vue'
import Card from './components/Card'

// In this test file we demo how to test a component with slots and a scoped slot.

// Usage is the same as Vue Test Utils, since slots and scopedSlots
// in the render options are directly passed through to the Utils mount().
// For more, see: https://vue-test-utils.vuejs.org/api/options.html#slots
test('Card component', () => {
  const { getByText, queryByText } = render(Card, {
    slots: {
      header: '<h1>HEADER</h1>',
      footer: '<div>FOOTER</div>'
    },
    scopedSlots: {
      default: '<p>Yay! {{props.content}}</p>'
    }
  })

  // The default slot should render the template above with the scoped prop "content".
  getByText('Yay! Scoped content!')

  // Instead of the default slot's fallback content.
  expect(
    queryByText('Nothing used the Scoped content!')
  ).not.toBeInTheDocument()

  // And the header and footer slots should be rendered with the given templates.
  getByText('HEADER')
  getByText('FOOTER')
})
