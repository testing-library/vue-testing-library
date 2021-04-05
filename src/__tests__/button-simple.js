import {render, fireEvent} from '@testing-library/vue'
import Button from './components/Button'
import '@testing-library/jest-dom'

test('renders button with text', () => {
  const text = "Click me; I'm sick"

  // Set the prop value by using the second argument of `render()`.
  const {getByRole} = render(Button, {
    props: {text},
  })

  // Get the only element with a 'button' role.
  const button = getByRole('button')

  expect(button).toHaveTextContent(text)
})

test('emits click event when button is clicked', async () => {
  const text = 'Click me'

  const {getByRole, emitted} = render(Button, {
    props: {text},
  })

  // Send a click event.
  await fireEvent.click(getByRole('button'))

  // Expect that the event emitted a "click" event. We should test for emitted
  // events has they are part of the public API of the component.
  expect(emitted()).toHaveProperty('click')
})
