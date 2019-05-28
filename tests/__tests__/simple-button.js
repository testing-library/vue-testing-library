import { render, cleanup, fireEvent } from '../../src'
import SimpleButton from './components/Button'

afterEach(cleanup)

test('renders button with text', () => {
  const buttonText = "Click me; I'm sick"
  const { getByText } = render(SimpleButton, {
    props: { text: buttonText }
  })

  getByText(buttonText)
})

test('click event is emitted when button is clicked', () => {
  const text = 'Click me'
  const { getByText, emitted } = render(SimpleButton, {
    props: { text }
  })
  fireEvent.click(getByText(text))
  expect(emitted().click).toHaveLength(1)
})
