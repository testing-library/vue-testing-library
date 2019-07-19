import { render, cleanup, fireEvent } from '@testing-library/vue'
import Button from './components/Button'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('renders button with text', () => {
  const text = "Click me; I'm sick"

  // Set the prop value by using the second argument of `render()`
  const { getByRole } = render(Button, {
    props: { text }
  })

  expect(getByRole('button')).toHaveTextContent(text)
})

test('click event is emitted when button is clicked', async () => {
  const text = 'Click me'

  const { getByRole, emitted } = render(Button, {
    props: { text }
  })

  // Send a click event to the element with a 'button' role
  await fireEvent.click(getByRole('button'))

  expect(emitted().click).toHaveLength(1)
})
